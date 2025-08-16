-- CORRECTION CRITIQUE DE SÉCURITÉ : Table app_users
-- Suppression des politiques conflictuelles et dangereuses

-- 1. SUPPRESSION DE TOUTES LES POLITIQUES EXISTANTES SUR APP_USERS
DROP POLICY IF EXISTS "Allow user creation from app" ON public.app_users;
DROP POLICY IF EXISTS "Only admin principal can delete users" ON public.app_users;
DROP POLICY IF EXISTS "Only admin principal can insert users" ON public.app_users;
DROP POLICY IF EXISTS "Secure_Admin_Principal_Create_Users" ON public.app_users;
DROP POLICY IF EXISTS "Secure_Admin_Principal_Delete_Users" ON public.app_users;
DROP POLICY IF EXISTS "Secure_Admin_Principal_View_All" ON public.app_users;
DROP POLICY IF EXISTS "Secure_Users_Update_Profile" ON public.app_users;
DROP POLICY IF EXISTS "Secure_Users_View_Own_Profile" ON public.app_users;
DROP POLICY IF EXISTS "Users can update own profile, admins can update any" ON public.app_users;

-- 2. CRÉATION DE POLITIQUES RLS SÉCURISÉES ET COHÉRENTES

-- Politique SELECT : Les utilisateurs ne peuvent voir que leur propre profil
CREATE POLICY "SECURE_SELECT_OwnProfile" 
ON public.app_users 
FOR SELECT 
TO authenticated
USING (auth.uid() = id);

-- Politique SELECT : Admin principal peut voir tous les profils
CREATE POLICY "SECURE_SELECT_AdminViewAll" 
ON public.app_users 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.app_users au 
    WHERE au.id = auth.uid() 
    AND au.role = 'admin_principal'::user_role
  )
);

-- Politique INSERT : Seul admin principal peut créer des utilisateurs
CREATE POLICY "SECURE_INSERT_AdminOnly" 
ON public.app_users 
FOR INSERT 
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.app_users au 
    WHERE au.id = auth.uid() 
    AND au.role = 'admin_principal'::user_role
  )
  AND username IS NOT NULL 
  AND first_name IS NOT NULL 
  AND last_name IS NOT NULL 
  AND email IS NOT NULL
  AND password_hash IS NOT NULL
);

-- Politique UPDATE : Les utilisateurs peuvent modifier leur propre profil
CREATE POLICY "SECURE_UPDATE_OwnProfile" 
ON public.app_users 
FOR UPDATE 
TO authenticated
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id 
  AND username IS NOT NULL 
  AND first_name IS NOT NULL 
  AND last_name IS NOT NULL 
  AND email IS NOT NULL
);

-- Politique UPDATE : Les admins peuvent modifier les profils selon la hiérarchie
CREATE POLICY "SECURE_UPDATE_AdminHierarchy" 
ON public.app_users 
FOR UPDATE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.app_users au 
    WHERE au.id = auth.uid() 
    AND (
      -- Admin principal peut tout modifier
      au.role = 'admin_principal'::user_role
      OR 
      -- Admin secondaire peut modifier ses propres infos et celles des rédacteurs
      (au.role = 'admin_secondaire'::user_role AND 
       (app_users.role = 'redacteur'::user_role OR app_users.id = auth.uid()))
    )
  )
)
WITH CHECK (
  username IS NOT NULL 
  AND first_name IS NOT NULL 
  AND last_name IS NOT NULL 
  AND email IS NOT NULL
);

-- Politique DELETE : Seul admin principal peut supprimer des utilisateurs
CREATE POLICY "SECURE_DELETE_AdminPrincipalOnly" 
ON public.app_users 
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.app_users au 
    WHERE au.id = auth.uid() 
    AND au.role = 'admin_principal'::user_role
  )
  -- Empêcher la suppression de son propre compte
  AND app_users.id != auth.uid()
);

-- 3. FONCTION DE VALIDATION DE LA SÉCURITÉ DES UTILISATEURS
CREATE OR REPLACE FUNCTION public.validate_user_security()
RETURNS TABLE(
  security_check text,
  status text,
  details text,
  recommendation text
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
  -- Vérifier les utilisateurs sans mot de passe
  SELECT 
    'PASSWORD_SECURITY'::text,
    CASE WHEN COUNT(*) = 0 THEN 'OK' ELSE 'DANGER' END::text,
    'Utilisateurs sans mot de passe: ' || COUNT(*)::text,
    'Forcer la réinitialisation des mots de passe manquants'::text
  FROM public.app_users 
  WHERE password_hash IS NULL OR password_hash = ''
  
  UNION ALL
  
  -- Vérifier les utilisateurs avec des données incomplètes
  SELECT 
    'DATA_INTEGRITY'::text,
    CASE WHEN COUNT(*) = 0 THEN 'OK' ELSE 'WARNING' END::text,
    'Utilisateurs avec données incomplètes: ' || COUNT(*)::text,
    'Compléter les informations utilisateur manquantes'::text
  FROM public.app_users 
  WHERE first_name IS NULL OR last_name IS NULL OR email IS NULL
  
  UNION ALL
  
  -- Vérifier le nombre d'admins principaux
  SELECT 
    'ADMIN_COUNT'::text,
    CASE 
      WHEN COUNT(*) = 0 THEN 'DANGER'
      WHEN COUNT(*) = 1 THEN 'OK'
      WHEN COUNT(*) <= 3 THEN 'WARNING'
      ELSE 'DANGER'
    END::text,
    'Nombre d''admins principaux: ' || COUNT(*)::text,
    CASE 
      WHEN COUNT(*) = 0 THEN 'Créer au moins un admin principal'
      WHEN COUNT(*) > 3 THEN 'Limiter le nombre d''admins principaux'
      ELSE 'Nombre d''admins approprié'
    END::text
  FROM public.app_users 
  WHERE role = 'admin_principal'::user_role;
$function$;

-- 4. FONCTION DE TEST DES POLITIQUES RLS
CREATE OR REPLACE FUNCTION public.test_user_rls_policies()
RETURNS TABLE(
  test_name text,
  result text,
  message text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  -- Test : Vérifier que RLS est activé
  RETURN QUERY
  SELECT 
    'RLS_ENABLED'::text,
    CASE WHEN rowsecurity THEN 'PASS' ELSE 'FAIL' END::text,
    CASE WHEN rowsecurity THEN 'RLS activé correctement' ELSE 'RLS NON ACTIVÉ - CRITIQUE!' END::text
  FROM pg_tables 
  WHERE schemaname = 'public' AND tablename = 'app_users';
  
  -- Test : Compter les politiques actives
  RETURN QUERY
  SELECT 
    'POLICY_COUNT'::text,
    CASE WHEN COUNT(*) >= 6 THEN 'PASS' ELSE 'FAIL' END::text,
    'Nombre de politiques RLS: ' || COUNT(*)::text || ' (minimum requis: 6)'
  FROM pg_policies 
  WHERE schemaname = 'public' AND tablename = 'app_users';
  
  RETURN;
END;
$function$;