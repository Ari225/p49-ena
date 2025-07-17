-- Mettre à jour le mot de passe avec un hash base64 simple pour Aristide
-- Cela correspond à btoa("Reseau@2025") = "UmVzZWF1QDIwMjU="
UPDATE public.app_users 
SET password_hash = 'UmVzZWF1QDIwMjU='
WHERE username = 'ari_dale';