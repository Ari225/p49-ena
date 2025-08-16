-- Créer un trigger pour automatiquement créer un profil dans app_users lors de la connexion
CREATE OR REPLACE FUNCTION handle_auth_user_login()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Vérifier si l'utilisateur existe déjà dans app_users
  IF NOT EXISTS (SELECT 1 FROM app_users WHERE id = NEW.id) THEN
    -- Créer le profil utilisateur avec les métadonnées
    INSERT INTO app_users (
      id,
      username,
      first_name,
      last_name,
      email,
      role,
      password_hash
    ) VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
      COALESCE(NEW.raw_user_meta_data->>'first_name', 'Utilisateur'),
      COALESCE(NEW.raw_user_meta_data->>'last_name', 'Anonyme'),
      NEW.email,
      COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'redacteur'),
      'imported_from_auth'
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Créer le trigger sur auth.users pour les connexions
DROP TRIGGER IF EXISTS on_auth_user_login ON auth.users;
CREATE TRIGGER on_auth_user_login
  AFTER UPDATE ON auth.users
  FOR EACH ROW 
  WHEN (OLD.last_sign_in_at IS DISTINCT FROM NEW.last_sign_in_at)
  EXECUTE FUNCTION handle_auth_user_login();