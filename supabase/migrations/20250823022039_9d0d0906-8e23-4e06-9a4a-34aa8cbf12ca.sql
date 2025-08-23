-- Supprimer l'ancienne contrainte sur la catégorie
ALTER TABLE public.activities DROP CONSTRAINT IF EXISTS activities_category_check;

-- Ajouter la nouvelle contrainte incluant "Les Régionales"
ALTER TABLE public.activities ADD CONSTRAINT activities_category_check 
CHECK (category IN (
  'Conférence', 
  'Atelier', 
  'Formation', 
  'Réunion', 
  'Événement social', 
  'Les Régionales',
  'Autre'
));