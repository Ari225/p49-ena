-- Fonction pour mettre à jour le profil utilisateur de manière sécurisée
CREATE OR REPLACE FUNCTION public.update_user_profile(
  user_id uuid,
  new_first_name text,
  new_last_name text,
  new_username text,
  new_email text,
  new_password_hash text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  current_user_id uuid;
  result jsonb;
BEGIN
  -- Obtenir l'ID de l'utilisateur authentifié
  current_user_id := auth.uid();
  
  -- Vérifier que l'utilisateur modifie ses propres données
  IF current_user_id != user_id THEN
    RETURN jsonb_build_object('success', false, 'error', 'Non autorisé');
  END IF;
  
  -- Vérifier que l'utilisateur existe
  IF NOT EXISTS (SELECT 1 FROM app_users WHERE id = user_id) THEN
    RETURN jsonb_build_object('success', false, 'error', 'Utilisateur non trouvé');
  END IF;
  
  -- Vérifier l'unicité du nom d'utilisateur
  IF EXISTS (SELECT 1 FROM app_users WHERE username = new_username AND id != user_id) THEN
    RETURN jsonb_build_object('success', false, 'error', 'Ce nom d''utilisateur est déjà utilisé');
  END IF;
  
  -- Vérifier l'unicité de l'email
  IF EXISTS (SELECT 1 FROM app_users WHERE email = new_email AND id != user_id) THEN
    RETURN jsonb_build_object('success', false, 'error', 'Cet email est déjà utilisé');
  END IF;
  
  -- Mettre à jour les informations
  UPDATE app_users 
  SET 
    first_name = new_first_name,
    last_name = new_last_name,
    username = new_username,
    email = new_email,
    password_hash = COALESCE(new_password_hash, password_hash),
    updated_at = now()
  WHERE id = user_id;
  
  -- Logger l'événement de sécurité
  PERFORM public.log_security_event(
    'profile_updated',
    user_id,
    jsonb_build_object(
      'updated_fields', ARRAY['first_name', 'last_name', 'username', 'email'] ||
        CASE WHEN new_password_hash IS NOT NULL THEN ARRAY['password'] ELSE ARRAY[]::text[] END
    )
  );
  
  RETURN jsonb_build_object('success', true, 'message', 'Profil mis à jour avec succès');
END;
$$;