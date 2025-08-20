-- Drop the existing restrictive insert policy
DROP POLICY IF EXISTS "Authenticated users can insert popups" ON public.popups;

-- Create a new insert policy that allows admins to insert popups
CREATE POLICY "Admins can insert popups" 
ON public.popups 
FOR INSERT 
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal', 'admin_secondaire')
  )
);