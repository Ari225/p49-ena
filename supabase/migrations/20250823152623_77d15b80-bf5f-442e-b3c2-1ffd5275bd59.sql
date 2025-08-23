-- Supprimer l'ancienne contrainte de catégorie
ALTER TABLE public.activities DROP CONSTRAINT IF EXISTS activities_category_check;

-- Ajouter la nouvelle contrainte avec les nouvelles catégories
ALTER TABLE public.activities ADD CONSTRAINT activities_category_check 
CHECK (category IN ('Les Régionales', 'Assemblées Générales', 'Réunions de constitution', 'Conférence', 'Atelier', 'Réunion', 'Autre'));