-- Fix RLS policies for news table to allow admin users to insert/update
-- Drop existing policies
DROP POLICY IF EXISTS "Admins and editors can manage news" ON public.news;
DROP POLICY IF EXISTS "Public can view visible news" ON public.news;

-- Create new policies that properly handle admin and editor access
CREATE POLICY "Admin users can manage all news" 
ON public.news 
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal', 'admin_secondaire', 'editeur')
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal', 'admin_secondaire', 'editeur')
  )
);

-- Policy for public viewing of visible news
CREATE POLICY "Public can view visible news" 
ON public.news 
FOR SELECT 
USING (is_visible = true);

-- Create a simple function to check if current user can manage news
CREATE OR REPLACE FUNCTION public.can_manage_news()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal', 'admin_secondaire', 'editeur')
  );
END;
$$;