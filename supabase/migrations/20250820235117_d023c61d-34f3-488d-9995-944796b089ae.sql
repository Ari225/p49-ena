-- Drop the conflicting ALL policy
DROP POLICY IF EXISTS "Admins can manage all popups" ON public.popups;

-- Create separate policies for each operation
CREATE POLICY "Admins can select all popups" 
ON public.popups 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal', 'admin_secondaire')
  )
);

CREATE POLICY "Admins can update popups" 
ON public.popups 
FOR UPDATE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal', 'admin_secondaire')
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal', 'admin_secondaire')
  )
);

CREATE POLICY "Admins can delete popups" 
ON public.popups 
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal', 'admin_secondaire')
  )
);