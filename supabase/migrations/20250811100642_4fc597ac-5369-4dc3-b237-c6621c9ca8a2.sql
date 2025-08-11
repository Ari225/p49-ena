-- Secure app_users: remove public read, add server-side auth function, and refine admin policy

-- Ensure RLS is enabled (safety)
ALTER TABLE public.app_users ENABLE ROW LEVEL SECURITY;

-- 1) Remove public read policy exposing sensitive data
DROP POLICY IF EXISTS "Allow public read for authentication" ON public.app_users;

-- 2) Replace admin policy to avoid self-referential recursion by using security-definer function
DROP POLICY IF EXISTS "Admin principal can manage all users" ON public.app_users;

CREATE POLICY "Admin principal can manage all users"
ON public.app_users
FOR ALL
USING (public.get_user_role(auth.uid()) = 'admin_principal')
WITH CHECK (public.get_user_role(auth.uid()) = 'admin_principal');

-- Keep existing policy allowing users to view their own profile
-- Policy: "Users can view their own profile" remains unchanged

-- 3) Create a SECURITY DEFINER RPC for authentication that avoids exposing password hashes
CREATE OR REPLACE FUNCTION public.authenticate_app_user(_username text, _password text)
RETURNS TABLE (
  id uuid,
  username text,
  first_name text,
  last_name text,
  email text,
  role user_role,
  image_url text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT u.id, u.username, u.first_name, u.last_name, u.email, u.role, u.image_url
  FROM public.app_users u
  WHERE u.username = _username
    AND u.password_hash = encode(convert_to(_password, 'UTF8'), 'base64')
  LIMIT 1;
END;
$$;

-- Allow both anon (for login) and authenticated roles to execute the function
GRANT EXECUTE ON FUNCTION public.authenticate_app_user(text, text) TO anon, authenticated;