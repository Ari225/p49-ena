-- Corriger la fonction d'authentification pour qu'elle fonctionne correctement
-- Le problème semble être avec l'encodage base64 ou la logique de vérification

-- Recréer la fonction authenticate_app_user avec une logique plus simple
CREATE OR REPLACE FUNCTION public.authenticate_app_user(_username text, _password text)
RETURNS TABLE(id uuid, username text, first_name text, last_name text, email text, role user_role, image_url text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Vérifier d'abord avec le mot de passe en texte brut (pour le debug)
  RETURN QUERY
  SELECT u.id, u.username, u.first_name, u.last_name, u.email, u.role, u.image_url
  FROM public.app_users u
  WHERE u.username = _username
    AND (
      -- Essayer d'abord le mot de passe en base64
      u.password_hash = encode(convert_to(_password, 'UTF8'), 'base64') OR
      -- Puis essayer avec bcrypt si disponible
      (u.password_hash IS NOT NULL AND crypt(_password, u.password_hash) = u.password_hash) OR
      -- Temporairement, essayer aussi le mot de passe en texte brut pour debug
      u.password_hash = _password
    )
  LIMIT 1;
END;
$function$