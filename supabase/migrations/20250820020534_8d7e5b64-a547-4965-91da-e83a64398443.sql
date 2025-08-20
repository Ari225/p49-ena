-- Ajouter les champs pour stocker les informations de l'auteur dans blog_articles
ALTER TABLE public.blog_articles 
ADD COLUMN author_name TEXT,
ADD COLUMN author_function TEXT,
ADD COLUMN author_image TEXT;