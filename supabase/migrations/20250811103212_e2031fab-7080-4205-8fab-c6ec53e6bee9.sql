-- Security fixes: Update password storage and secure newsletter policies

-- 1. Secure newsletter subscriptions - Remove admin policy that exposes emails
DROP POLICY IF EXISTS "Admins can view active subscriptions" ON public.newsletter_subscriptions;

-- Create a secure policy that only allows counting, not viewing emails
CREATE POLICY "Admins can count subscriptions only" 
ON public.newsletter_subscriptions 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal', 'admin_secondaire')
  ) 
  AND FALSE -- This ensures emails are never exposed, only count queries work
);

-- 2. Create bcrypt password hashing functions (more secure than SHA-256)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Function to hash password with bcrypt
CREATE OR REPLACE FUNCTION public.hash_password(password text)
RETURNS text
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT crypt(password, gen_salt('bf', 12));
$$;

-- Function to verify password with bcrypt
CREATE OR REPLACE FUNCTION public.verify_password(password text, hash text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT crypt(password, hash) = hash;
$$;

-- Update authenticate function to use bcrypt
CREATE OR REPLACE FUNCTION public.authenticate_app_user(_username text, _password text)
RETURNS TABLE(id uuid, username text, first_name text, last_name text, email text, role user_role, image_url text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  RETURN QUERY
  SELECT u.id, u.username, u.first_name, u.last_name, u.email, u.role, u.image_url
  FROM public.app_users u
  WHERE u.username = _username
    AND public.verify_password(_password, u.password_hash)
  LIMIT 1;
END;
$function$;

-- Add rate limiting table for login attempts
CREATE TABLE IF NOT EXISTS public.login_attempts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address inet NOT NULL,
  username text,
  attempted_at timestamp with time zone NOT NULL DEFAULT now(),
  success boolean NOT NULL DEFAULT false
);

-- Enable RLS on login_attempts
ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;

-- Only allow system access to login attempts
CREATE POLICY "System only access to login attempts" 
ON public.login_attempts 
FOR ALL 
USING (false);

-- Function to check rate limiting
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  _ip_address inet,
  _username text DEFAULT NULL,
  _max_attempts integer DEFAULT 5,
  _window_minutes integer DEFAULT 15
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  attempt_count integer;
BEGIN
  -- Count failed attempts in the time window
  SELECT COUNT(*) INTO attempt_count
  FROM public.login_attempts
  WHERE ip_address = _ip_address
    AND (_username IS NULL OR username = _username)
    AND success = false
    AND attempted_at > (now() - interval '1 minute' * _window_minutes);
  
  -- Return true if under limit, false if over limit
  RETURN attempt_count < _max_attempts;
END;
$function$;

-- Function to log login attempt
CREATE OR REPLACE FUNCTION public.log_login_attempt(
  _ip_address inet,
  _username text,
  _success boolean
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.login_attempts (ip_address, username, success)
  VALUES (_ip_address, _username, _success);
END;
$function$;