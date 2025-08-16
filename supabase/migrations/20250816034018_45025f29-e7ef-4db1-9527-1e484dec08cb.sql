-- Migration complète vers Supabase Auth natif
-- Étape 1: Créer le type enum pour les rôles
CREATE TYPE public.user_role AS ENUM ('admin_principal', 'admin_secondaire', 'redacteur');

-- Étape 2: Créer la table profiles pour les données étendues
CREATE TABLE public.profiles (
  id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  username text NOT NULL UNIQUE,
  first_name text,
  last_name text,
  role user_role NOT NULL DEFAULT 'redacteur'::user_role,
  image_url text,
  address text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  
  PRIMARY KEY (id)
);

-- Activer RLS sur la table profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal', 'admin_secondaire')
  )
);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can manage all profiles" 
ON public.profiles 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin_principal'
  )
);

-- Fonction pour éviter la récursion dans RLS
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS user_role
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- Fonction de migration des utilisateurs existants
CREATE OR REPLACE FUNCTION public.migrate_app_users_to_supabase()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  user_record RECORD;
  supabase_user_id uuid;
  temp_password text;
BEGIN
  -- Migrer chaque utilisateur de app_users vers auth.users + profiles
  FOR user_record IN SELECT * FROM public.app_users LOOP
    -- Générer un mot de passe temporaire
    temp_password := 'temp_' || user_record.id::text;
    
    -- Créer l'utilisateur dans auth.users
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
      user_record.id,
      'authenticated',
      'authenticated',
      user_record.email,
      crypt(temp_password, gen_salt('bf')),
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
      jsonb_build_object(
        'provider', 'email',
        'providers', ARRAY['email']
      ),
      jsonb_build_object(
        'username', user_record.username,
        'first_name', user_record.first_name,
        'last_name', user_record.last_name
      ),
      false,
      user_record.created_at,
      user_record.updated_at,
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
    ) ON CONFLICT (id) DO NOTHING;
    
    -- Créer le profil correspondant
    INSERT INTO public.profiles (
      id,
      username,
      first_name,
      last_name,
      role,
      image_url,
      address,
      created_at,
      updated_at
    ) VALUES (
      user_record.id,
      user_record.username,
      user_record.first_name,
      user_record.last_name,
      user_record.role::user_role,
      user_record.image_url,
      user_record.address,
      user_record.created_at,
      user_record.updated_at
    ) ON CONFLICT (id) DO NOTHING;
    
    RAISE LOG 'Migrated user: % (ID: %)', user_record.username, user_record.id;
  END LOOP;
  
  RAISE LOG 'Migration completed successfully';
END;
$$;

-- Trigger pour créer automatiquement un profil lors de l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    username,
    first_name,
    last_name,
    role
  ) VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'redacteur'::user_role)
  );
  RETURN NEW;
END;
$$;

-- Créer le trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Fonction de nettoyage pour supprimer l'ancienne table app_users après migration
CREATE OR REPLACE FUNCTION public.cleanup_old_app_users()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Renommer l'ancienne table pour sauvegarde
  ALTER TABLE IF EXISTS public.app_users RENAME TO app_users_backup;
  RAISE LOG 'Old app_users table renamed to app_users_backup';
END;
$$;

-- Exécuter la migration
SELECT public.migrate_app_users_to_supabase();