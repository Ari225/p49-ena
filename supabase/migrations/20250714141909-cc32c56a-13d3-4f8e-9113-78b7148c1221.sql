
-- Ajouter la colonne image_url à la table app_users si elle n'existe pas déjà
ALTER TABLE public.app_users ADD COLUMN IF NOT EXISTS image_url TEXT;
