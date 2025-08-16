-- CORRECTION FINALE : Trigger corrigé et sécurisation complète

-- 1. CORRIGER LE TRIGGER (Enlever SELECT qui n'est pas supporté)
DROP TRIGGER IF EXISTS member_access_log ON public.members;
CREATE TRIGGER member_access_log
  AFTER INSERT OR UPDATE OR DELETE ON public.members
  FOR EACH ROW EXECUTE FUNCTION public.log_sensitive_access();

-- 2. FONCTION DE NEWSLETTER SÉCURISÉE (Pour remplacer l'inscription publique)
CREATE OR REPLACE FUNCTION public.secure_newsletter_subscribe(
  subscriber_email text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
  result jsonb;
BEGIN
  -- Validation de l'email
  IF subscriber_email IS NULL OR subscriber_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RETURN jsonb_build_object('success', false, 'error', 'Email invalide');
  END IF;
  
  -- Vérifier si l'email existe déjà
  IF EXISTS (SELECT 1 FROM newsletter_subscriptions WHERE email = subscriber_email) THEN
    RETURN jsonb_build_object('success', false, 'error', 'Email déjà inscrit');
  END IF;
  
  -- Insérer l'inscription
  INSERT INTO newsletter_subscriptions (email, is_active) 
  VALUES (subscriber_email, true);
  
  -- Logger l'événement
  PERFORM public.log_security_event(
    'newsletter_subscription',
    NULL,
    jsonb_build_object('email_domain', split_part(subscriber_email, '@', 2))
  );
  
  RETURN jsonb_build_object('success', true, 'message', 'Inscription réussie');
END;
$function$;

-- 3. DERNIÈRE VÉRIFICATION DE SÉCURITÉ
CREATE OR REPLACE FUNCTION public.security_status_report()
RETURNS TABLE(
  security_metric text,
  current_value text,
  target_value text,
  status text,
  priority text
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
  -- RLS sur tables critiques
  SELECT 
    'RLS_ACTIVATION'::text,
    'Tables with RLS: ' || COUNT(*)::text,
    '3 tables minimum'::text,
    CASE WHEN COUNT(*) >= 3 THEN 'SECURE' ELSE 'VULNERABLE' END::text,
    CASE WHEN COUNT(*) >= 3 THEN 'LOW' ELSE 'CRITICAL' END::text
  FROM pg_tables 
  WHERE schemaname = 'public' 
  AND tablename IN ('app_users', 'members', 'newsletter_subscriptions')
  AND rowsecurity = true
  
  UNION ALL
  
  -- Politiques de sécurité strictes
  SELECT 
    'STRICT_POLICIES'::text,
    'Locked policies: ' || COUNT(*)::text,
    '5+ policies minimum'::text,
    CASE WHEN COUNT(*) >= 5 THEN 'SECURE' ELSE 'NEEDS_IMPROVEMENT' END::text,
    CASE WHEN COUNT(*) >= 5 THEN 'LOW' ELSE 'HIGH' END::text
  FROM pg_policies 
  WHERE schemaname = 'public' 
  AND (policyname LIKE 'LOCKED_%' OR policyname LIKE 'ZERO_TRUST_%')
  
  UNION ALL
  
  -- Fonctions de sécurité
  SELECT 
    'SECURITY_FUNCTIONS'::text,
    'Security functions: ' || COUNT(*)::text,
    '5+ functions'::text,
    CASE WHEN COUNT(*) >= 5 THEN 'SECURE' ELSE 'INCOMPLETE' END::text,
    'MEDIUM'::text
  FROM information_schema.routines 
  WHERE routine_schema = 'public' 
  AND routine_name LIKE '%security%'
  
  UNION ALL
  
  -- Masquage des données
  SELECT 
    'DATA_MASKING'::text,
    'Masking functions: ' || COUNT(*)::text,
    '1+ functions'::text,
    CASE WHEN COUNT(*) >= 1 THEN 'ACTIVE' ELSE 'MISSING' END::text,
    CASE WHEN COUNT(*) >= 1 THEN 'LOW' ELSE 'HIGH' END::text
  FROM information_schema.routines 
  WHERE routine_schema = 'public' 
  AND routine_name LIKE '%mask%';
$function$;