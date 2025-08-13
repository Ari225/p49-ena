-- Fix members table RLS policies to allow public access
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can view member directory" ON public.members;
DROP POLICY IF EXISTS "Only admins can insert members" ON public.members;
DROP POLICY IF EXISTS "Only admins can update members" ON public.members;
DROP POLICY IF EXISTS "Only admins can delete members" ON public.members;

-- Create new policies allowing public read access
CREATE POLICY "Public can view members directory" ON public.members
FOR SELECT USING (true);

-- Keep admin-only policies for modifications
CREATE POLICY "Only admins can insert members" ON public.members
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal', 'admin_secondaire')
  )
);

CREATE POLICY "Only admins can update members" ON public.members
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal', 'admin_secondaire')
  )
);

CREATE POLICY "Only admins can delete members" ON public.members
FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal', 'admin_secondaire')
  )
);