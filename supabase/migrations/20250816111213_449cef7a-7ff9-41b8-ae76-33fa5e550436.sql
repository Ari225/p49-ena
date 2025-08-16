-- Migration simplifiée sans insérer directement dans auth.users
-- Créer seulement la table profiles et les outils nécessaires

-- Créer la table profiles pour les données étendues
CREATE TABLE IF NOT EXISTS public.profiles (
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

-- Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;

-- Créer la fonction pour éviter la récursion dans RLS
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS user_role
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- Politiques RLS pour profiles (utilisant la fonction)
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (public.get_current_user_role() IN ('admin_principal', 'admin_secondaire'));

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can manage all profiles" 
ON public.profiles 
FOR ALL 
USING (public.get_current_user_role() = 'admin_principal');

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
EXCEPTION WHEN unique_violation THEN
  -- Ignorer si le profil existe déjà
  RETURN NEW;
END;
$$;

-- Supprimer l'ancien trigger s'il existe
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Créer le trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Fonction pour migrer manuellement les données (les utilisateurs devront se réinscrire)
CREATE OR REPLACE FUNCTION public.create_profiles_from_app_users()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_record RECORD;
BEGIN
  -- Note: Cette fonction copie seulement les profils, pas les comptes Supabase Auth
  -- Les utilisateurs devront se réinscrire avec Supabase Auth
  
  FOR user_record IN SELECT * FROM public.app_users LOOP
    RAISE LOG 'User will need to re-register: % (email: %)', user_record.username, user_record.email;
  END LOOP;
  
  RAISE LOG 'Migration prepared. Users will need to re-register with Supabase Auth.';
END;
$$;

-- Mettre à jour les fonctions existantes pour utiliser profiles au lieu de app_users
CREATE OR REPLACE FUNCTION public.get_users_list()
RETURNS TABLE(id uuid, username text, first_name text, last_name text, email text, role user_role, created_at timestamp with time zone, image_url text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Vérifier que l'utilisateur est admin principal
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin_principal'::user_role
  ) THEN
    RETURN;
  END IF;

  -- Logger l'accès
  PERFORM public.log_security_event(
    'admin_users_list_access',
    auth.uid(),
    '{"action": "viewed_users_list"}'::jsonb
  );

  RETURN QUERY
  SELECT 
    p.id,
    p.username,
    p.first_name,
    p.last_name,
    au.email,
    p.role,
    p.created_at,
    p.image_url
  FROM public.profiles p
  JOIN auth.users au ON au.id = p.id
  ORDER BY p.created_at DESC;
END;
$$;

-- Exécuter la préparation de migration
SELECT public.create_profiles_from_app_users();