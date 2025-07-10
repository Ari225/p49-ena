
-- Create a table for media items
CREATE TABLE public.media_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  date DATE NOT NULL,
  description TEXT NOT NULL,
  media_urls TEXT[] DEFAULT '{}', -- Array to store multiple media URLs
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES public.app_users(id)
);

-- Add Row Level Security (RLS)
ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;

-- Create policies for media items
CREATE POLICY "Anyone can view media items" 
  ON public.media_items 
  FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can create media items" 
  ON public.media_items 
  FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update media items" 
  ON public.media_items 
  FOR UPDATE 
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete media items" 
  ON public.media_items 
  FOR DELETE 
  USING (auth.uid() IS NOT NULL);
