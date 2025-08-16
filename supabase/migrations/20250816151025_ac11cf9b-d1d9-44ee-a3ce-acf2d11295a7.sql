-- Supprimer l'ancienne contrainte
ALTER TABLE public.social_events DROP CONSTRAINT social_events_category_check;

-- Ajouter la nouvelle contrainte avec toutes les catégories
ALTER TABLE public.social_events ADD CONSTRAINT social_events_category_check 
CHECK (category = ANY (ARRAY[
  'mariage'::text, 
  'anniversaire'::text, 
  'promotion'::text, 
  'bapteme'::text, 
  'naissance'::text, 
  'autre_heureux'::text,
  'retraite'::text,
  'deces'::text,
  'maladie'::text,
  'accident'::text
]));