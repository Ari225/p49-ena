-- VERROUILLAGE FINAL : Blocage complet de l'accès direct aux données sensibles

-- 1. SUPPRIMER LA POLITIQUE ZERO_TRUST QUI PERMET ENCORE L'ACCÈS
DROP POLICY IF EXISTS "ZERO_TRUST_SELECT" ON public.app_users;

-- 2. POLITIQUE ULTRA-RESTRICTIVE : AUCUN ACCÈS DIRECT
CREATE POLICY "COMPLETELY_LOCKED_SELECT" 
ON public.app_users 
FOR SELECT 
TO authenticated
USING (false); -- Bloque complètement l'accès direct

-- 3. POLITIQUE SIMILAIRE POUR MEMBERS
DROP POLICY IF EXISTS "LOCKED_MEMBERS_AdminOnlyAccess" ON public.members;

CREATE POLICY "COMPLETELY_LOCKED_MEMBERS" 
ON public.members 
FOR SELECT 
TO authenticated
USING (false); -- Bloque complètement l'accès direct

-- 4. POLITIQUE POUR NEWSLETTER
DROP POLICY IF EXISTS "Only admins can view newsletter subscriptions" ON public.newsletter_subscriptions;

CREATE POLICY "LOCKED_NEWSLETTER_NoDirectAccess" 
ON public.newsletter_subscriptions 
FOR SELECT 
TO authenticated
USING (false); -- Bloque complètement l'accès direct

-- 5. FONCTION SÉCURISÉE POUR OBTENIR LA LISTE DES UTILISATEURS (Pour l'admin)
CREATE OR REPLACE FUNCTION public.get_users_list()
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
  -- Vérifier que l'utilisateur est admin principal
  IF NOT EXISTS (
    SELECT 1 FROM public.app_users 
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
    u.id,
    u.username,
    u.first_name,
    u.last_name,
    u.email,
    u.role,
    u.created_at,
    u.image_url
  FROM public.app_users u
  ORDER BY u.created_at DESC;
END;
$function$;

-- 6. FONCTION SÉCURISÉE POUR NEWSLETTER (Lecture admin uniquement)
CREATE OR REPLACE FUNCTION public.get_newsletter_subscribers()
RETURNS TABLE(
  id uuid,
  email text,
  subscribed_at timestamp with time zone,
  is_active boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  -- Vérifier que l'utilisateur est admin
  IF NOT EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE id = auth.uid() AND role IN ('admin_principal'::user_role, 'admin_secondaire'::user_role)
  ) THEN
    RETURN;
  END IF;

  RETURN QUERY
  SELECT 
    n.id,
    n.email,
    n.subscribed_at,
    n.is_active
  FROM public.newsletter_subscriptions n
  ORDER BY n.subscribed_at DESC;
END;
$function$;

-- 7. TEST FINAL DE SÉCURITÉ
CREATE OR REPLACE FUNCTION public.final_vulnerability_test()
RETURNS TABLE(
  test_name text,
  result text,
  severity text,
  details text
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
  -- Test : Aucune politique permissive sur données sensibles
  SELECT 
    'DIRECT_ACCESS_BLOCKED'::text,
    CASE WHEN COUNT(*) = 0 THEN 'PASS' ELSE 'FAIL' END::text,
    CASE WHEN COUNT(*) = 0 THEN 'SECURED' ELSE 'CRITICAL' END::text,
    'Policies allowing direct access: ' || COUNT(*)::text
  FROM pg_policies 
  WHERE schemaname = 'public' 
  AND tablename IN ('app_users', 'members', 'newsletter_subscriptions')
  AND qual != 'false'
  AND cmd = 'SELECT'
  
  UNION ALL
  
  -- Test : Fonctions sécurisées disponibles
  SELECT 
    'SECURE_FUNCTIONS_AVAILABLE'::text,
    CASE WHEN COUNT(*) >= 3 THEN 'PASS' ELSE 'FAIL' END::text,
    'OPERATIONAL'::text,
    'Secure functions available: ' || COUNT(*)::text
  FROM information_schema.routines 
  WHERE routine_schema = 'public' 
  AND routine_name IN ('get_secure_user_info', 'get_users_list', 'secure_newsletter_subscribe')
  
  UNION ALL
  
  -- Test : Surveillance active
  SELECT 
    'MONITORING_ACTIVE'::text,
    CASE WHEN COUNT(*) >= 2 THEN 'PASS' ELSE 'FAIL' END::text,
    'ACTIVE'::text,
    'Security triggers active: ' || COUNT(*)::text
  FROM information_schema.triggers 
  WHERE trigger_schema = 'public' 
  AND trigger_name LIKE '%access_log%';
$function$;