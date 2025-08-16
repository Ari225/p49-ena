-- Add missing columns to news table for complete news functionality
ALTER TABLE public.news 
ADD COLUMN IF NOT EXISTS details text,
ADD COLUMN IF NOT EXISTS reading_time integer DEFAULT 3,
ADD COLUMN IF NOT EXISTS published_by text,
ADD COLUMN IF NOT EXISTS is_visible boolean DEFAULT true;

-- Update RLS policies for news table
DROP POLICY IF EXISTS "Admins and editors can manage news" ON public.news;
DROP POLICY IF EXISTS "Public can view news" ON public.news;

-- Create comprehensive RLS policies for news management
CREATE POLICY "Admins and editors can manage all news" 
ON public.news 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE app_users.id = auth.uid() 
    AND app_users.role IN ('admin_principal', 'admin_secondaire', 'redacteur')
  )
);

CREATE POLICY "Public can view visible news" 
ON public.news 
FOR SELECT 
USING (is_visible = true);

-- Create index for better performance on visible news
CREATE INDEX IF NOT EXISTS idx_news_visible ON public.news(is_visible);
CREATE INDEX IF NOT EXISTS idx_news_published_date ON public.news(published_date DESC);