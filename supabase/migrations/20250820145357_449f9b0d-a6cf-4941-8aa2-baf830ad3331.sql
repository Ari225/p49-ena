-- Drop the existing incorrect policies
DROP POLICY IF EXISTS "Admins can view all popups" ON public.popups;
DROP POLICY IF EXISTS "Admins can create popups" ON public.popups;
DROP POLICY IF EXISTS "Admins can update popups" ON public.popups;
DROP POLICY IF EXISTS "Admins can delete popups" ON public.popups;
DROP POLICY IF EXISTS "Everyone can view active popups" ON public.popups;

-- Create correct policies using app_users table for role verification
CREATE POLICY "Admins can view all popups" 
ON public.popups 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE public.app_users.id = auth.uid() 
    AND public.app_users.role IN ('admin_principal', 'admin_secondaire')
  )
);

CREATE POLICY "Admins can create popups" 
ON public.popups 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE public.app_users.id = auth.uid() 
    AND public.app_users.role IN ('admin_principal', 'admin_secondaire')
  ) AND created_by = auth.uid()
);

CREATE POLICY "Admins can update popups" 
ON public.popups 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE public.app_users.id = auth.uid() 
    AND public.app_users.role IN ('admin_principal', 'admin_secondaire')
  )
);

CREATE POLICY "Admins can delete popups" 
ON public.popups 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE public.app_users.id = auth.uid() 
    AND public.app_users.role IN ('admin_principal', 'admin_secondaire')
  )
);

-- Policy for public viewing of active popups (for frontend display)
CREATE POLICY "Everyone can view active popups" 
ON public.popups 
FOR SELECT 
USING (is_active = true);