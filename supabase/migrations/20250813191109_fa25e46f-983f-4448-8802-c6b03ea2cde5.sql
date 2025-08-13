-- Fix critical security vulnerability: Restrict access to app_users table
-- Remove the overly permissive policy that allows public read access
DROP POLICY IF EXISTS "Allow read access to app users" ON public.app_users;

-- Create secure policies for app_users table
-- Users can only view their own profile data
CREATE POLICY "Users can view their own profile"
ON public.app_users
FOR SELECT
TO authenticated
USING (id = auth.uid());

-- Admins can view all user profiles (for user management)
CREATE POLICY "Admins can view all profiles"
ON public.app_users  
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.app_users au
    WHERE au.id = auth.uid() 
    AND au.role IN ('admin_principal', 'admin_secondaire')
  )
);

-- Users can only update their own profile (except role and sensitive fields)
DROP POLICY IF EXISTS "Allow updates to app users" ON public.app_users;
CREATE POLICY "Users can update their own profile"
ON public.app_users
FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (
  id = auth.uid() 
  AND role = OLD.role  -- Cannot change their own role
  AND username = OLD.username  -- Cannot change username
);

-- Only admins can update user roles and sensitive data
CREATE POLICY "Admins can update any user"
ON public.app_users
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.app_users au
    WHERE au.id = auth.uid() 
    AND au.role IN ('admin_principal', 'admin_secondaire')
  )
);

-- Restrict delete operations to admins only
DROP POLICY IF EXISTS "Allow deletes to app users" ON public.app_users;
CREATE POLICY "Only admins can delete users"
ON public.app_users
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.app_users au
    WHERE au.id = auth.uid() 
    AND au.role IN ('admin_principal', 'admin_secondaire')
  )
);

-- Restrict user creation - only admins can create new users
DROP POLICY IF EXISTS "Allow user creation from app" ON public.app_users;
CREATE POLICY "Only admins can create users"
ON public.app_users
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.app_users au
    WHERE au.id = auth.uid() 
    AND au.role IN ('admin_principal', 'admin_secondaire')
  )
);