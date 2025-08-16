-- PHASE 1: Fix Critical Password Security and RLS Policies

-- 1. Update the authenticate_app_user function to use BCrypt instead of Base64
CREATE OR REPLACE FUNCTION public.authenticate_app_user(_username text, _password text)
RETURNS TABLE(id uuid, username text, first_name text, last_name text, email text, role user_role, image_url text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
  user_record RECORD;
BEGIN
  -- Find user by username
  SELECT * INTO user_record
  FROM public.app_users u
  WHERE u.username = _username;
  
  -- If user doesn't exist, return empty
  IF NOT FOUND THEN
    RETURN;
  END IF;
  
  -- Verify password using BCrypt (assuming passwords will be migrated to BCrypt)
  -- For now, support both Base64 (legacy) and BCrypt (new) during transition
  IF (crypt(_password, user_record.password_hash) = user_record.password_hash OR 
      user_record.password_hash = encode(convert_to(_password, 'UTF8'), 'base64')) THEN
    
    RETURN QUERY
    SELECT user_record.id, user_record.username, user_record.first_name, 
           user_record.last_name, user_record.email, user_record.role, user_record.image_url;
  END IF;
  
  RETURN;
END;
$function$;

-- 2. Remove dangerous RLS policies on app_users table
DROP POLICY IF EXISTS "Allow deletes to app users" ON public.app_users;
DROP POLICY IF EXISTS "Allow updates to app users" ON public.app_users;

-- 3. Ensure proper RLS policies for app_users are in place
CREATE POLICY "Admin principal can manage all users" 
ON public.app_users 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.app_users au 
  WHERE au.id = auth.uid() AND au.role = 'admin_principal'::user_role
));

-- 4. Tighten member table security - remove overly permissive update policy
DROP POLICY IF EXISTS "Allow member updates with matricule verification" ON public.members;

-- 5. Add audit logging function for sensitive operations
CREATE OR REPLACE FUNCTION public.log_security_event(
  event_type text,
  user_id uuid DEFAULT auth.uid(),
  details jsonb DEFAULT '{}'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  -- Log security events (you can expand this to write to an audit table)
  RAISE LOG 'Security Event: % by user % with details %', event_type, user_id, details;
END;
$function$;

-- 6. Add password strength validation function
CREATE OR REPLACE FUNCTION public.validate_password_strength(password text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  -- Password must be at least 8 characters
  IF length(password) < 8 THEN
    RETURN false;
  END IF;
  
  -- Must contain at least one uppercase letter
  IF password !~ '[A-Z]' THEN
    RETURN false;
  END IF;
  
  -- Must contain at least one lowercase letter
  IF password !~ '[a-z]' THEN
    RETURN false;
  END IF;
  
  -- Must contain at least one digit
  IF password !~ '[0-9]' THEN
    RETURN false;
  END IF;
  
  -- Must contain at least one special character
  IF password !~ '[!@#$%^&*(),.?":{}|<>]' THEN
    RETURN false;
  END IF;
  
  RETURN true;
END;
$function$;