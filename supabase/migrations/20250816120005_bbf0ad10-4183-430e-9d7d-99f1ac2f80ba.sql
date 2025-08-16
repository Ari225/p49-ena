-- Créer l'utilisateur manquant manuellement pour débloquer la situation
INSERT INTO app_users (
  id,
  username,
  first_name,
  last_name,
  email,
  role,
  password_hash
) 
SELECT 
  '574cf842-bb6e-4206-916b-e43427adc655'::uuid,
  'a',
  'A',
  'A', 
  'aristideakpaki6@gmail.com',
  'admin_secondaire'::user_role,
  'imported_from_auth'
WHERE NOT EXISTS (
  SELECT 1 FROM app_users WHERE id = '574cf842-bb6e-4206-916b-e43427adc655'
);