-- Insérer l'utilisateur administrateur principal
INSERT INTO public.app_users (
  username,
  email, 
  password_hash,
  first_name,
  last_name,
  role
) VALUES (
  'ari_dale',
  'aristideakpaki6@gmail.com',
  encode(convert_to('Reseau@2025', 'UTF8'), 'base64'),
  'Aristide',
  'Dalé', 
  'admin_principal'
);