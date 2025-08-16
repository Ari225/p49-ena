-- Créer une fonction pour gérer l'authentification côté client avec Supabase
-- Cette fonction créera automatiquement un utilisateur Supabase Auth si nécessaire

CREATE OR REPLACE FUNCTION public.create_supabase_user_if_needed(
  app_user_id uuid,
  user_email text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  supabase_user_id uuid;
BEGIN
  -- Vérifier si l'utilisateur existe déjà dans auth.users
  SELECT id INTO supabase_user_id 
  FROM auth.users 
  WHERE email = user_email;
  
  -- Si l'utilisateur n'existe pas, le créer
  IF supabase_user_id IS NULL THEN
    -- Créer un utilisateur Supabase avec un mot de passe temporaire
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      invited_at,
      confirmation_token,
      confirmation_sent_at,
      recovery_token,
      recovery_sent_at,
      email_change_token_new,
      email_change,
      email_change_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      created_at,
      updated_at,
      phone,
      phone_confirmed_at,
      phone_change,
      phone_change_token,
      phone_change_sent_at,
      email_change_token_current,
      email_change_confirm_status,
      banned_until,
      reauthentication_token,
      reauthentication_sent_at,
      is_sso_user,
      deleted_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      app_user_id,
      'authenticated',
      'authenticated',
      user_email,
      crypt('temporary_password_' || app_user_id::text, gen_salt('bf')),
      now(),
      now(),
      '',
      now(),
      '',
      null,
      '',
      '',
      null,
      now(),
      '{"provider": "email", "providers": ["email"]}',
      '{}',
      false,
      now(),
      now(),
      null,
      null,
      '',
      '',
      null,
      '',
      0,
      null,
      '',
      null,
      false,
      null
    );
    
    supabase_user_id := app_user_id;
  END IF;
  
  RETURN supabase_user_id;
END;
$function$