-- Supprimer l'ancien administrateur principal
DELETE FROM public.app_users WHERE email = 'admin@p49-ena.ci' AND username = 'admin_principal';

-- Vérifier que le mot de passe est correctement hashé pour Aristide Dalé
UPDATE public.app_users 
SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
WHERE username = 'ari_dale' AND email = 'aristidedale1@gmail.com';