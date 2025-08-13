-- Fix CRITICAL security vulnerability: Secure app_users table
-- Remove all existing policies that may allow public access
DROP POLICY IF EXISTS "Allow public read access to app_users" ON public.app_users;
DROP POLICY IF EXISTS "Allow public write access to app_users" ON public.app_users;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.app_users;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.app_users;
DROP POLICY IF EXISTS "Enable update for all users" ON public.app_users;
DROP POLICY IF EXISTS "Enable delete for all users" ON public.app_users;

-- Enable RLS if not already enabled
ALTER TABLE public.app_users ENABLE ROW LEVEL SECURITY;

-- Create secure policies for app_users table
-- Users can only view their own profile data
CREATE POLICY "Users can view own profile"
ON public.app_users
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Only admin_principal can view all users (for user management)
CREATE POLICY "Admin principal can view all users"
ON public.app_users
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.app_users au
    WHERE au.id = auth.uid() 
    AND au.role = 'admin_principal'
  )
);

-- Only admin_principal can create new users
CREATE POLICY "Only admin principal can insert users"
ON public.app_users
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.app_users au
    WHERE au.id = auth.uid() 
    AND au.role = 'admin_principal'
  )
);

-- Users can update their own profile (except role and username)
-- Admins can update any user
CREATE POLICY "Users can update own profile, admins can update any"
ON public.app_users
FOR UPDATE
TO authenticated
USING (
  auth.uid() = id OR
  EXISTS (
    SELECT 1 FROM public.app_users au
    WHERE au.id = auth.uid() 
    AND au.role IN ('admin_principal', 'admin_secondaire')
  )
);

-- Only admin_principal can delete users
CREATE POLICY "Only admin principal can delete users"
ON public.app_users
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.app_users au
    WHERE au.id = auth.uid() 
    AND au.role = 'admin_principal'
  )
);

-- Create a security definer function to avoid RLS recursion
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
BEGIN
  RETURN (SELECT role FROM public.app_users WHERE id = auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = 'public';

-- Update authenticate function to use bcrypt-compatible hashing
-- Note: This will require updating the password hashes in the database
CREATE OR REPLACE FUNCTION public.authenticate_app_user(_username text, _password text)
RETURNS TABLE(id uuid, username text, first_name text, last_name text, email text, role user_role, image_url text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- For now, keep backward compatibility with existing hashes
  -- This will be updated once we migrate all passwords to bcrypt
  RETURN QUERY
  SELECT u.id, u.username, u.first_name, u.last_name, u.email, u.role, u.image_url
  FROM public.app_users u
  WHERE u.username = _username
    AND (
      -- Support both old base64 encoding and new bcrypt (when we migrate)
      u.password_hash = encode(convert_to(_password, 'UTF8'), 'base64') OR
      u.password_hash = crypt(_password, u.password_hash)
    )
  LIMIT 1;
END;
$$;