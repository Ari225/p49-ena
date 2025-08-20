-- Enable RLS on popups table if not already enabled
ALTER TABLE public.popups ENABLE ROW LEVEL SECURITY;

-- Create policies for popups table
CREATE POLICY "Admins can view all popups" 
ON public.popups 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.raw_user_meta_data->>'role' IN ('admin_principal', 'admin_secondaire')
  )
);

CREATE POLICY "Admins can create popups" 
ON public.popups 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.raw_user_meta_data->>'role' IN ('admin_principal', 'admin_secondaire')
  )
);

CREATE POLICY "Admins can update popups" 
ON public.popups 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.raw_user_meta_data->>'role' IN ('admin_principal', 'admin_secondaire')
  )
);

CREATE POLICY "Admins can delete popups" 
ON public.popups 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.raw_user_meta_data->>'role' IN ('admin_principal', 'admin_secondaire')
  )
);

-- Policy for public viewing of active popups (for frontend display)
CREATE POLICY "Everyone can view active popups" 
ON public.popups 
FOR SELECT 
USING (is_active = true);