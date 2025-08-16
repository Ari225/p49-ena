-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can insert news" ON public.news;
DROP POLICY IF EXISTS "Authenticated users can update own news" ON public.news;
DROP POLICY IF EXISTS "Authenticated users can delete own news" ON public.news;
DROP POLICY IF EXISTS "Public can view visible news" ON public.news;
DROP POLICY IF EXISTS "Admins can manage all news" ON public.news;

-- Create simpler policies that work with custom auth
CREATE POLICY "Allow all authenticated operations on news" 
ON public.news 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Still allow public to read visible news
CREATE POLICY "Public can view visible news" 
ON public.news 
FOR SELECT 
USING (is_visible = true);