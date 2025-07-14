
-- Modifier la table app_users pour ajouter une colonne image_url
ALTER TABLE public.app_users ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Insérer l'administrateur principal (Aristide Dalé)
INSERT INTO public.app_users (
  id,
  username,
  first_name,
  last_name,
  email,
  password_hash,
  role,
  image_url,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'ari_dale',
  'Aristide',
  'Dalé',
  'aristide.dale@p49.com',
  '$2b$10$rK8qP0YvE1YvE1YvE1YvE1YvE1YvE1YvE1YvE1YvE1YvE1YvE1Yv',
  'admin_principal',
  '/lovable-uploads/2cd61362-ab99-4adc-901a-5bef1c338e97.png',
  now(),
  now()
);

-- Insérer le rédacteur (Kouamé)
INSERT INTO public.app_users (
  id,
  username,
  first_name,
  last_name,
  email,
  password_hash,
  role,
  image_url,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'kouam_p49',
  'Kouamé',
  '',
  'kouame@p49.com',
  '$2b$10$rK8qP0YvE1YvE1YvE1YvE1YvE1YvE1YvE1YvE1YvE1YvE1YvE1Yv',
  'redacteur',
  '/lovable-uploads/e479be1a-3b50-400f-ab57-37aecdd654ed.png',
  now(),
  now()
);
