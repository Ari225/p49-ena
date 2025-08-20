-- Add matricule column to blog_articles table
ALTER TABLE public.blog_articles 
ADD COLUMN matricule TEXT;

-- Add constraint to make matricule required for new articles
ALTER TABLE public.blog_articles 
ADD CONSTRAINT blog_articles_matricule_check 
CHECK (matricule IS NOT NULL AND matricule != '');