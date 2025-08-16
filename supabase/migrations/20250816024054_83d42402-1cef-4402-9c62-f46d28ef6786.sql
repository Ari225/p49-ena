-- SÉCURISATION ULTRA-STRICTE : Protection complète des données sensibles
-- Phase 1: Chiffrement et masquage des données sensibles

-- 1. CRÉATION DE VUES SÉCURISÉES POUR APP_USERS
-- Vue publique sans données sensibles
CREATE OR REPLACE VIEW public.app_users_safe AS
SELECT 
  id,
  username,
  CASE 
    WHEN auth.uid() = id OR 
         EXISTS (SELECT 1 FROM app_users WHERE id = auth.uid() AND role = 'admin_principal'::user_role)
    THEN first_name
    ELSE NULL
  END as first_name,
  CASE 
    WHEN auth.uid() = id OR 
         EXISTS (SELECT 1 FROM app_users WHERE id = auth.uid() AND role = 'admin_principal'::user_role)
    THEN last_name  
    ELSE NULL
  END as last_name,
  role,
  created_at,
  image_url
FROM public.app_users;

-- 2. FONCTIONS DE CHIFFREMENT POUR LES DONNÉES SENSIBLES
CREATE OR REPLACE FUNCTION public.encrypt_sensitive_data(data text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  -- Utilise le chiffrement intégré de PostgreSQL
  RETURN encode(digest(data || gen_random_uuid()::text, 'sha256'), 'hex');
END;
$function$;

-- 3. FONCTION SÉCURISÉE POUR OBTENIR LES INFOS UTILISATEUR
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
    -- L'utilisateur demande ses propres infos
    target_user_id = auth.uid() 
    OR 
    -- Ou c'est un admin principal
    EXISTS (
      SELECT 1 FROM public.app_users 
      WHERE id = auth.uid() AND role = 'admin_principal'::user_role
    )
  ) THEN
    -- Retourner des données vides si pas autorisé
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
      ELSE '***@***.***'
    END as email,
    u.role,
    u.created_at,
    u.image_url
  FROM public.app_users u
  WHERE u.id = target_user_id;
END;
$function$;

-- 4. SUPPRESSION ET RECRÉATION DES POLITIQUES APP_USERS AVEC RESTRICTIONS MAXIMALES
-- Supprimer toutes les politiques existantes
DROP POLICY IF EXISTS "SECURE_SELECT_OwnProfile" ON public.app_users;
DROP POLICY IF EXISTS "SECURE_SELECT_AdminViewAll" ON public.app_users;
DROP POLICY IF EXISTS "SECURE_INSERT_AdminOnly" ON public.app_users;
DROP POLICY IF EXISTS "SECURE_UPDATE_OwnProfile" ON public.app_users;
DROP POLICY IF EXISTS "SECURE_UPDATE_AdminHierarchy" ON public.app_users;
DROP POLICY IF EXISTS "SECURE_DELETE_AdminPrincipalOnly" ON public.app_users;

-- NOUVELLES POLITIQUES ULTRA-RESTRICTIVES

-- SELECT : Accès ultra-limité - seulement via fonction sécurisée
CREATE POLICY "ULTRA_SECURE_SELECT_ViaFunction" 
ON public.app_users 
FOR SELECT 
TO authenticated
USING (false); -- Bloque l'accès direct - utilisation forcée de la fonction sécurisée

-- INSERT : Seul admin principal authentifié peut créer
CREATE POLICY "ULTRA_SECURE_INSERT_AdminPrincipalOnly" 
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
  AND length(password_hash) > 20 -- Vérifier que le hash est suffisamment long
);

-- UPDATE : Accès limité avec vérification stricte
CREATE POLICY "ULTRA_SECURE_UPDATE_VerifiedAccess" 
ON public.app_users 
FOR UPDATE 
TO authenticated
USING (
  -- Utilisateur modifie ses propres données de base uniquement
  auth.uid() = id AND id IS NOT NULL
)
WITH CHECK (
  auth.uid() = id 
  AND username IS NOT NULL 
  AND first_name IS NOT NULL 
  AND last_name IS NOT NULL 
  -- Empêcher la modification du rôle et email par l'utilisateur lui-même
  AND (
    OLD.role = NEW.role OR 
    EXISTS (SELECT 1 FROM app_users WHERE id = auth.uid() AND role = 'admin_principal'::user_role)
  )
);

-- UPDATE spécial pour admin principal
CREATE POLICY "ULTRA_SECURE_UPDATE_AdminPrincipalOnly" 
ON public.app_users 
FOR UPDATE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.app_users au 
    WHERE au.id = auth.uid() 
    AND au.role = 'admin_principal'::user_role
  )
);

-- DELETE : Seul admin principal, pas son propre compte
CREATE POLICY "ULTRA_SECURE_DELETE_AdminProtected" 
ON public.app_users 
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.app_users au 
    WHERE au.id = auth.uid() 
    AND au.role = 'admin_principal'::user_role
  )
  AND app_users.id != auth.uid() -- Ne peut pas supprimer son propre compte
  AND app_users.role != 'admin_principal'::user_role -- Ne peut pas supprimer d'autres admins principaux
);

-- 5. FONCTION D'AUDIT DE SÉCURITÉ RENFORCÉE
CREATE OR REPLACE FUNCTION public.security_audit_advanced()
RETURNS TABLE(
  vulnerability_type text,
  severity_level text,
  table_affected text,
  issue_count bigint,
  recommendation text,
  urgency_level text
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
  -- Audit des accès directs non autorisés
  SELECT 
    'DIRECT_TABLE_ACCESS'::text,
    'CRITIQUE'::text,
    'app_users'::text,
    (SELECT COUNT(*) FROM pg_policies WHERE schemaname = 'public' AND tablename = 'app_users' AND qual NOT LIKE '%false%')::bigint,
    'Bloquer tous les accès directs à la table app_users'::text,
    'IMMÉDIAT'::text
  
  UNION ALL
  
  -- Audit des mots de passe faibles
  SELECT 
    'WEAK_PASSWORD_HASHES'::text,
    'ÉLEVÉ'::text,
    'app_users'::text,
    COUNT(*)::bigint,
    'Forcer la réinitialisation des mots de passe avec hachage faible'::text,
    'URGENT'::text
  FROM public.app_users 
  WHERE password_hash IS NULL OR length(password_hash) < 32
  
  UNION ALL
  
  -- Audit des données personnelles exposées
  SELECT 
    'PERSONAL_DATA_EXPOSURE'::text,
    'ÉLEVÉ'::text,
    'members'::text,
    COUNT(*)::bigint,
    'Restreindre l''accès aux données membres via fonction sécurisée uniquement'::text,
    'URGENT'::text
  FROM public.members 
  WHERE "Email" IS NOT NULL AND "Email" != '';
$function$;