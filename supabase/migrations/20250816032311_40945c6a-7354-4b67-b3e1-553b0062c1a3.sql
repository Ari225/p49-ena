-- Corriger la fonction d'authentification pour gérer l'authentification Supabase
-- La fonction actuelle ne gère que BCrypt et Base64, mais nous devons nous assurer qu'elle fonctionne correctement

-- Mettre à jour la fonction authenticate_app_user pour mieux gérer les mots de passe Base64
CREATE OR REPLACE FUNCTION public.authenticate_app_user(_username text, _password text)
RETURNS TABLE(id uuid, username text, first_name text, last_name text, email text, role user_role, image_url text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  user_record RECORD;
BEGIN
  -- Find user by username
  SELECT * INTO user_record
  FROM public.app_users u
  WHERE u.username = _username;
  
  -- If user doesn't exist, return empty
  IF NOT FOUND THEN
    RAISE LOG 'User not found: %', _username;
    RETURN;
  END IF;
  
  -- Debug logging
  RAISE LOG 'Checking password for user: %, stored hash length: %', _username, length(user_record.password_hash);
  
  -- Verify password - support Base64 encoded passwords
  -- Check if password matches Base64 encoded version (legacy)
  IF user_record.password_hash = encode(convert_to(_password, 'UTF8'), 'base64') THEN
    RAISE LOG 'Password matched using Base64 encoding for user: %', _username;
    
    RETURN QUERY
    SELECT user_record.id, user_record.username, user_record.first_name, 
           user_record.last_name, user_record.email, user_record.role, user_record.image_url;
  END IF;
  
  -- Also try BCrypt if Base64 doesn't match (for future password migrations)
  IF crypt(_password, user_record.password_hash) = user_record.password_hash THEN
    RAISE LOG 'Password matched using BCrypt for user: %', _username;
    
    RETURN QUERY
    SELECT user_record.id, user_record.username, user_record.first_name, 
           user_record.last_name, user_record.email, user_record.role, user_record.image_url;
  END IF;
  
  RAISE LOG 'Password verification failed for user: %', _username;
  RETURN;
END;
$function$