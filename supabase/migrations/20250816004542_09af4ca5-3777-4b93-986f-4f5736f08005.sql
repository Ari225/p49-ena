-- Fix RLS policies for news table using correct user roles
-- Drop existing policies first
DROP POLICY IF EXISTS "Admins and editors can manage all news" ON public.news;
DROP POLICY IF EXISTS "Public can view visible news" ON public.news;

-- Create policy for admins and redacteurs
CREATE POLICY "Admins and redacteurs can manage all news" 
ON public.news 
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal', 'admin_secondaire', 'redacteur')
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal', 'admin_secondaire', 'redacteur')
  )
);

-- Policy for public viewing of visible news
CREATE POLICY "Public can view visible news" 
ON public.news 
FOR SELECT 
USING (is_visible = true);