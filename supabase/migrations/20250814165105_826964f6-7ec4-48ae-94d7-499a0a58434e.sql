-- Corriger la fonction d'authentification sans utiliser digest
CREATE OR REPLACE FUNCTION public.authenticate_app_user(_username text, _password text)
RETURNS TABLE(id uuid, username text, first_name text, last_name text, email text, role user_role, image_url text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  user_record RECORD;
  password_base64 text;
BEGIN
  -- Encoder le mot de passe en base64
  password_base64 := encode(convert_to(_password, 'UTF8'), 'base64');
  
  -- Chercher l'utilisateur avec le nom d'utilisateur
  SELECT * INTO user_record
  FROM public.app_users u
  WHERE u.username = _username;
  
  -- Si l'utilisateur n'existe pas, retourner vide
  IF NOT FOUND THEN
    RETURN;
  END IF;
  
  -- Vérifier le mot de passe (base64 ou texte brut)
  IF (user_record.password_hash = password_base64 OR 
      user_record.password_hash = _password) THEN
    
    RETURN QUERY
    SELECT user_record.id, user_record.username, user_record.first_name, 
           user_record.last_name, user_record.email, user_record.role, user_record.image_url;
  END IF;
  
  RETURN;
END;
$function$;