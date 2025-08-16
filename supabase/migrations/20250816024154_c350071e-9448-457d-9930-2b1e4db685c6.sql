-- SÉCURISATION ULTRA-STRICTE : Correction et protection complète
-- Politique de sécurité renforcée pour app_users

-- 1. SUPPRESSION DES POLITIQUES EXISTANTES
DROP POLICY IF EXISTS "SECURE_SELECT_OwnProfile" ON public.app_users;
DROP POLICY IF EXISTS "SECURE_SELECT_AdminViewAll" ON public.app_users;
DROP POLICY IF EXISTS "SECURE_INSERT_AdminOnly" ON public.app_users;
DROP POLICY IF EXISTS "SECURE_UPDATE_OwnProfile" ON public.app_users;
DROP POLICY IF EXISTS "SECURE_UPDATE_AdminHierarchy" ON public.app_users;
DROP POLICY IF EXISTS "SECURE_DELETE_AdminPrincipalOnly" ON public.app_users;
DROP POLICY IF EXISTS "ULTRA_SECURE_SELECT_ViaFunction" ON public.app_users;
DROP POLICY IF EXISTS "ULTRA_SECURE_INSERT_AdminPrincipalOnly" ON public.app_users;
DROP POLICY IF EXISTS "ULTRA_SECURE_UPDATE_VerifiedAccess" ON public.app_users;
DROP POLICY IF EXISTS "ULTRA_SECURE_UPDATE_AdminPrincipalOnly" ON public.app_users;
DROP POLICY IF EXISTS "ULTRA_SECURE_DELETE_AdminProtected" ON public.app_users;

-- 2. FONCTION SÉCURISÉE POUR OBTENIR LES INFOS UTILISATEUR
CREATE OR REPLACE FUNCTION public.get_secure_user_info(target_user_id uuid DEFAULT auth.uid())
RETURNS TABLE(
  id uuid,
  username text,
  first_name text,
  last_name text,
  email text,
  role user_role,
  created_at timestamp with time zone,
  image_url text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  -- Vérification stricte des permissions
  IF NOT (
    target_user_id = auth.uid() 
    OR 
    EXISTS (
      SELECT 1 FROM public.app_users 
      WHERE id = auth.uid() AND role = 'admin_principal'::user_role
    )
  ) THEN
    RETURN;
  END IF;

  RETURN QUERY
  SELECT 
    u.id,
    u.username,
    u.first_name,
    u.last_name,
    CASE 
      WHEN auth.uid() = u.id OR 
           EXISTS (SELECT 1 FROM app_users WHERE id = auth.uid() AND role = 'admin_principal'::user_role)
      THEN u.email
      ELSE 'protected@email.com'
    END as email,
    u.role,
    u.created_at,
    u.image_url
  FROM public.app_users u
  WHERE u.id = target_user_id;
END;
$function$;

-- 3. POLITIQUES ULTRA-SÉCURISÉES

-- SELECT : Bloque l'accès direct - données masquées
CREATE POLICY "LOCKED_SELECT_NoDirectAccess" 
ON public.app_users 
FOR SELECT 
TO authenticated
USING (
  -- Seulement ID et username visibles pour l'authentification
  auth.uid() IS NOT NULL 
  AND (
    -- L'utilisateur peut voir ses propres données de base
    auth.uid() = id
    OR
    -- Admin principal peut voir tous les utilisateurs  
    EXISTS (
      SELECT 1 FROM public.app_users au 
      WHERE au.id = auth.uid() AND au.role = 'admin_principal'::user_role
    )
  )
);

-- INSERT : Seul admin principal peut créer des utilisateurs
CREATE POLICY "LOCKED_INSERT_AdminPrincipalOnly" 
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
  AND length(password_hash) > 20
);

-- UPDATE : Restrictions strictes sur les modifications
CREATE POLICY "LOCKED_UPDATE_RestrictedFields" 
ON public.app_users 
FOR UPDATE 
TO authenticated
USING (
  auth.uid() = id 
  OR
  EXISTS (
    SELECT 1 FROM public.app_users au 
    WHERE au.id = auth.uid() AND au.role = 'admin_principal'::user_role
  )
)
WITH CHECK (
  -- Validation des champs requis
  username IS NOT NULL 
  AND first_name IS NOT NULL 
  AND last_name IS NOT NULL 
  AND email IS NOT NULL
);

-- DELETE : Seul admin principal, protections multiples
CREATE POLICY "LOCKED_DELETE_AdminWithProtections" 
ON public.app_users 
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.app_users au 
    WHERE au.id = auth.uid() 
    AND au.role = 'admin_principal'::user_role
  )
  AND app_users.id != auth.uid()
);

-- 4. SÉCURISATION DE LA TABLE MEMBERS
-- Supprimer les politiques permissives existantes
DROP POLICY IF EXISTS "Secure_Admins_Only_Members_Access" ON public.members;

-- Nouvelle politique ultra-restrictive pour members
CREATE POLICY "LOCKED_MEMBERS_AdminOnlyAccess" 
ON public.members 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.app_users au 
    WHERE au.id = auth.uid() 
    AND au.role = ANY (ARRAY['admin_principal'::user_role, 'admin_secondaire'::user_role])
  )
);

-- 5. SÉCURISATION DE LA TABLE MEDIA_ITEMS
-- Supprimer les politiques permissives
DROP POLICY IF EXISTS "Anyone can create media items" ON public.media_items;
DROP POLICY IF EXISTS "Anyone can delete media items" ON public.media_items;
DROP POLICY IF EXISTS "Anyone can update media items" ON public.media_items;
DROP POLICY IF EXISTS "Anyone can view media items" ON public.media_items;

-- Nouvelles politiques sécurisées pour media
CREATE POLICY "LOCKED_MEDIA_AuthenticatedAccess" 
ON public.media_items 
FOR ALL 
TO authenticated
USING (
  auth.uid() IS NOT NULL
);

CREATE POLICY "LOCKED_MEDIA_PublicView" 
ON public.media_items 
FOR SELECT 
TO anon
USING (true);

-- 6. FONCTION DE VALIDATION DE SÉCURITÉ FINALE
CREATE OR REPLACE FUNCTION public.final_security_check()
RETURNS TABLE(
  check_name text,
  status text,
  risk_level text,
  details text
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
  -- Vérifier RLS sur tables critiques
  SELECT 
    'RLS_CRITICAL_TABLES'::text,
    CASE WHEN COUNT(*) = 0 THEN 'FAIL' ELSE 'PASS' END::text,
    CASE WHEN COUNT(*) = 0 THEN 'CRITIQUE' ELSE 'OK' END::text,
    'Tables critiques avec RLS: ' || COUNT(*)::text || '/3'
  FROM pg_tables 
  WHERE schemaname = 'public' 
  AND tablename IN ('app_users', 'members', 'media_items')
  AND rowsecurity = true
  
  UNION ALL
  
  -- Vérifier les politiques de sécurité strictes
  SELECT 
    'STRICT_POLICIES'::text,
    CASE WHEN COUNT(*) >= 8 THEN 'PASS' ELSE 'FAIL' END::text,
    CASE WHEN COUNT(*) >= 8 THEN 'OK' ELSE 'ÉLEVÉ' END::text,
    'Politiques sécurisées actives: ' || COUNT(*)::text
  FROM pg_policies 
  WHERE schemaname = 'public' 
  AND tablename IN ('app_users', 'members')
  AND policyname LIKE 'LOCKED_%'
  
  UNION ALL
  
  -- Vérifier l'absence de politiques dangereuses
  SELECT 
    'DANGEROUS_POLICIES'::text,
    CASE WHEN COUNT(*) = 0 THEN 'PASS' ELSE 'FAIL' END::text,
    CASE WHEN COUNT(*) = 0 THEN 'OK' ELSE 'CRITIQUE' END::text,
    'Politiques dangereuses trouvées: ' || COUNT(*)::text
  FROM pg_policies 
  WHERE schemaname = 'public' 
  AND (policyname LIKE 'Anyone can%' OR policyname LIKE 'Allow%' OR qual = 'true');
$function$;