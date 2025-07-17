-- Créer le profil utilisateur administrateur principal
INSERT INTO public.app_users (
  first_name,
  last_name,
  username,
  email,
  password_hash,
  role,
  image_url
) VALUES (
  'Aristide',
  'Dalé',
  'ari_dale',
  'aristidedale1@gmail.com',
  '$2b$10$8K1p0LQCyVWGOhyq7VKQDe3mX9fG2LzTjB4Rr5kYNWcxkVpE2zC8W',
  'admin_principal',
  '/lovable-uploads/aristide-profile.png'
);