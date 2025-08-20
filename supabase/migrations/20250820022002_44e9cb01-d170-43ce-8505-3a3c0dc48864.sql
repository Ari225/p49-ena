-- Ajouter les colonnes manquantes à la table blog_articles
ALTER TABLE public.blog_articles 
ADD COLUMN IF NOT EXISTS category TEXT,
ADD COLUMN IF NOT EXISTS reading_time INTEGER DEFAULT 5;