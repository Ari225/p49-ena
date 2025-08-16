-- Fix RLS policies for news table to allow authenticated users to insert
DROP POLICY IF EXISTS "Admins and redacteurs can manage all news" ON public.news;
DROP POLICY IF EXISTS "Public can view visible news" ON public.news;

-- Create new policies
CREATE POLICY "Authenticated users can insert news" 
ON public.news 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid());

CREATE POLICY "Authenticated users can update own news" 
ON public.news 
FOR UPDATE 
USING (created_by = auth.uid())
WITH CHECK (created_by = auth.uid());

CREATE POLICY "Authenticated users can delete own news" 
ON public.news 
FOR DELETE 
USING (created_by = auth.uid());

CREATE POLICY "Public can view visible news" 
ON public.news 
FOR SELECT 
USING (is_visible = true);

CREATE POLICY "Admins can manage all news" 
ON public.news 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal', 'admin_secondaire')
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal', 'admin_secondaire')
  )
);