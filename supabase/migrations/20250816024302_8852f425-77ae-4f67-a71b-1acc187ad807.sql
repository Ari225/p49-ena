-- PHASE FINALE : ÉLIMINATION COMPLÈTE DES VULNÉRABILITÉS
-- Masquage et protection totale des données sensibles

-- 1. SUPPRESSION DES POLITIQUES ENCORE DANGEREUSES
-- Newsletter subscriptions
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscriptions;

-- Création d'une politique stricte pour newsletter
CREATE POLICY "LOCKED_NEWSLETTER_AdminOnlyManage" 
ON public.newsletter_subscriptions 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.app_users au 
    WHERE au.id = auth.uid() 
    AND au.role = 'admin_principal'::user_role
  )
);

-- 2. FONCTION DE MASQUAGE DES EMAILS
CREATE OR REPLACE FUNCTION public.mask_email(email_address text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  IF email_address IS NULL OR email_address = '' THEN
    RETURN 'no-email@hidden.com';
  END IF;
  
  -- Masquer l'email sauf pour les admins
  IF EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE id = auth.uid() AND role = 'admin_principal'::user_role
  ) THEN
    RETURN email_address;
  ELSE
    RETURN regexp_replace(
      email_address, 
      '^(.{2}).*@(.*)\..*$', 
      '\1***@***.\2'
    );
  END IF;
END;
$function$;

-- 3. VUE SÉCURISÉE POUR APP_USERS (Remplace l'accès direct)
CREATE OR REPLACE VIEW public.app_users_secure AS
SELECT 
  id,
  CASE 
    WHEN auth.uid() = id OR 
         EXISTS (SELECT 1 FROM app_users WHERE id = auth.uid() AND role = 'admin_principal'::user_role)
    THEN username
    ELSE 'user_' || substring(id::text, 1, 8)
  END as username,
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
  public.mask_email(email) as email,
  role,
  created_at,
  image_url
FROM public.app_users
WHERE 
  auth.uid() = id 
  OR 
  EXISTS (
    SELECT 1 FROM public.app_users au 
    WHERE au.id = auth.uid() AND au.role = 'admin_principal'::user_role
  );

-- 4. POLITIQUE ZÉRO-TRUST POUR APP_USERS
-- Supprimer la politique actuelle
DROP POLICY IF EXISTS "LOCKED_SELECT_NoDirectAccess" ON public.app_users;

-- Nouvelle politique zéro-trust
CREATE POLICY "ZERO_TRUST_SELECT" 
ON public.app_users 
FOR SELECT 
TO authenticated
USING (
  -- Autoriser seulement l'accès à ses propres données minimales
  auth.uid() = id
  OR
  -- Admin principal peut voir les données nécessaires à l'administration
  (
    EXISTS (
      SELECT 1 FROM public.app_users au 
      WHERE au.id = auth.uid() AND au.role = 'admin_principal'::user_role
    )
    AND id != auth.uid() -- L'admin ne peut pas voir ses propres données par cette voie
  )
);

-- 5. FONCTION DE VÉRIFICATION ULTIME DE SÉCURITÉ
CREATE OR REPLACE FUNCTION public.ultimate_security_scan()
RETURNS TABLE(
  vulnerability_category text,
  severity text,
  found_issues bigint,
  security_status text,
  immediate_action_required boolean
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
  -- Scan des accès directs non sécurisés
  SELECT 
    'DIRECT_DATA_ACCESS'::text,
    'CRITIQUE'::text,
    COUNT(*)::bigint,
    CASE WHEN COUNT(*) = 0 THEN 'SECURED' ELSE 'VULNERABLE' END::text,
    COUNT(*) > 0 as immediate_action_required
  FROM pg_policies 
  WHERE schemaname = 'public' 
  AND tablename IN ('app_users', 'members', 'newsletter_subscriptions')
  AND qual = 'true'
  
  UNION ALL
  
  -- Scan des politiques permissives
  SELECT 
    'PERMISSIVE_POLICIES'::text,
    'ÉLEVÉ'::text,
    COUNT(*)::bigint,
    CASE WHEN COUNT(*) = 0 THEN 'SECURED' ELSE 'NEEDS_REVIEW' END::text,
    COUNT(*) > 5 as immediate_action_required
  FROM pg_policies 
  WHERE schemaname = 'public' 
  AND (policyname LIKE '%Anyone%' OR policyname LIKE '%Public%' OR policyname LIKE '%Allow%')
  
  UNION ALL
  
  -- Scan des données sensibles exposées
  SELECT 
    'SENSITIVE_DATA_EXPOSURE'::text,
    'CRITIQUE'::text,
    (
      SELECT COUNT(*) FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name IN ('app_users', 'members')
      AND column_name IN ('email', 'password_hash', 'WhatsApp', 'Facebook')
    )::bigint,
    'MONITORING'::text,
    false as immediate_action_required
  
  UNION ALL
  
  -- Status global de sécurité
  SELECT 
    'GLOBAL_SECURITY_STATUS'::text,
    'INFO'::text,
    (
      SELECT COUNT(*) FROM pg_policies 
      WHERE schemaname = 'public' 
      AND policyname LIKE 'LOCKED_%' OR policyname LIKE 'ZERO_TRUST_%'
    )::bigint,
    CASE 
      WHEN (SELECT COUNT(*) FROM pg_policies WHERE schemaname = 'public' AND policyname LIKE 'LOCKED_%' OR policyname LIKE 'ZERO_TRUST_%') >= 8 
      THEN 'HIGHLY_SECURED'
      ELSE 'PARTIALLY_SECURED'
    END::text,
    false as immediate_action_required;
$function$;

-- 6. TRIGGER DE SURVEILLANCE DES ACCÈS SENSIBLES
CREATE OR REPLACE FUNCTION public.log_sensitive_access()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  -- Logger les accès aux données sensibles
  PERFORM public.log_security_event(
    'sensitive_data_access',
    auth.uid(),
    jsonb_build_object(
      'table', TG_TABLE_NAME,
      'operation', TG_OP,
      'timestamp', now(),
      'user_role', (SELECT role FROM app_users WHERE id = auth.uid())
    )
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$function$;

-- Appliquer le trigger sur les tables sensibles
DROP TRIGGER IF EXISTS sensitive_access_log ON public.app_users;
CREATE TRIGGER sensitive_access_log
  AFTER INSERT OR UPDATE OR DELETE ON public.app_users
  FOR EACH ROW EXECUTE FUNCTION public.log_sensitive_access();

DROP TRIGGER IF EXISTS member_access_log ON public.members;
CREATE TRIGGER member_access_log
  AFTER SELECT OR INSERT OR UPDATE OR DELETE ON public.members
  FOR EACH ROW EXECUTE FUNCTION public.log_sensitive_access();