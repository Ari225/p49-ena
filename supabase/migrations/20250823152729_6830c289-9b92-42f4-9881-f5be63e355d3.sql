-- Supprimer l'ancienne contrainte de catégorie  
ALTER TABLE public.activities DROP CONSTRAINT IF EXISTS activities_category_check;

-- Ajouter la nouvelle contrainte avec toutes les catégories (anciennes + nouvelles)
ALTER TABLE public.activities ADD CONSTRAINT activities_category_check 
CHECK (category IN ('Les Régionales', 'Assemblées Générales', 'Réunions de constitution', 'Conférence', 'Atelier', 'Formation', 'Réunion', 'Autre'));