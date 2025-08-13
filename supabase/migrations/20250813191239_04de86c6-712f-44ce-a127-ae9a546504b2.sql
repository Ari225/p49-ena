-- Fix critical privacy vulnerability: Restrict access to members table
-- Remove the overly permissive policy that allows public read access to sensitive member data
DROP POLICY IF EXISTS "Allow public read access to members" ON public.members;

-- Create secure policy: Only authenticated users can view member directory
-- This maintains the member directory functionality while protecting from public data harvesting
CREATE POLICY "Authenticated users can view member directory"
ON public.members
FOR SELECT
TO authenticated
USING (true);

-- Ensure only authenticated users with proper roles can modify member data
CREATE POLICY "Only admins can insert members"
ON public.members
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.app_users au
    WHERE au.id = auth.uid() 
    AND au.role IN ('admin_principal', 'admin_secondaire')
  )
);

CREATE POLICY "Only admins can update members"
ON public.members
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.app_users au
    WHERE au.id = auth.uid() 
    AND au.role IN ('admin_principal', 'admin_secondaire')
  )
);

CREATE POLICY "Only admins can delete members"
ON public.members
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.app_users au
    WHERE au.id = auth.uid() 
    AND au.role IN ('admin_principal', 'admin_secondaire')
  )
);