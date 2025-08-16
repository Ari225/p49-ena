-- Create news table for managing news articles
CREATE TABLE public.news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT,
  details TEXT,
  category TEXT NOT NULL,
  reading_time INTEGER DEFAULT 3,
  published_date DATE NOT NULL,
  image_url TEXT,
  is_visible BOOLEAN DEFAULT true,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Create policies for news management
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

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_news_updated_at
BEFORE UPDATE ON public.news
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_news_visible ON public.news(is_visible);
CREATE INDEX idx_news_published_date ON public.news(published_date DESC);