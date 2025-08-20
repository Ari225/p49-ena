-- Drop all existing policies for popups
DROP POLICY IF EXISTS "Admins can insert popups" ON public.popups;
DROP POLICY IF EXISTS "Admins can select all popups" ON public.popups;
DROP POLICY IF EXISTS "Admins can update popups" ON public.popups;
DROP POLICY IF EXISTS "Admins can delete popups" ON public.popups;
DROP POLICY IF EXISTS "Public can view active popups" ON public.popups;

-- Create simple policies that work with your authentication system
CREATE POLICY "Allow all operations for authenticated users" 
ON public.popups 
FOR ALL 
TO authenticated
USING (true)
WITH CHECK (true);

-- Keep the public view policy for active popups
CREATE POLICY "Public can view active popups" 
ON public.popups 
FOR SELECT 
TO anon
USING (is_active = true);