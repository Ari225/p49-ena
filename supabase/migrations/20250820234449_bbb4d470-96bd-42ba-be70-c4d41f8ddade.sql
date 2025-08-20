-- Add policy to allow public to view active popups
CREATE POLICY "Public can view active popups" 
ON public.popups 
FOR SELECT 
USING (is_active = true);

-- Add policy to allow authenticated users to insert popups
CREATE POLICY "Authenticated users can insert popups" 
ON public.popups 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid());