-- Ajouter la colonne end_date à la table activities
ALTER TABLE public.activities 
ADD COLUMN end_date date;