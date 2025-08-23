-- Ajouter les colonnes target_audience et objectives à la table activities
ALTER TABLE public.activities 
ADD COLUMN target_audience TEXT,
ADD COLUMN objectives JSONB DEFAULT '[]'::jsonb;