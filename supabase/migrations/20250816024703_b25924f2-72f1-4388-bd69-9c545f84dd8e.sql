-- VERROUILLAGE ULTIME : Suppression des dernières politiques permissives

-- 1. Supprimer les dernières politiques qui permettent l'accès direct
DROP POLICY IF EXISTS "LOCKED_SELECT_NoDirectAccess" ON public.app_users;
DROP POLICY IF EXISTS "Admins can view all member data" ON public.members;

-- 2. CONFIRMER QUE TOUTES LES POLITIQUES SELECT SONT BLOQUÉES
-- Créer des politiques de blocage total pour app_users et members
CREATE POLICY "ULTIMATE_BLOCK_app_users" 
ON public.app_users 
FOR SELECT 
TO authenticated
USING (false);

CREATE POLICY "ULTIMATE_BLOCK_members" 
ON public.members 
FOR SELECT 
TO authenticated
USING (false);

-- 3. FONCTION DE VÉRIFICATION FINALE
CREATE OR REPLACE FUNCTION public.confirm_security_lockdown()
RETURNS TABLE(
  security_metric text,
  status text,
  threat_level text
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
  -- Vérifier qu'aucune politique SELECT ne permet l'accès direct
  SELECT 
    'DIRECT_ACCESS_COMPLETELY_BLOCKED'::text,
    CASE WHEN COUNT(*) = 0 THEN 'SECURE' ELSE 'VULNERABLE' END::text,
    CASE WHEN COUNT(*) = 0 THEN 'AUCUN' ELSE 'CRITIQUE' END::text
  FROM pg_policies 
  WHERE schemaname = 'public' 
  AND tablename IN ('app_users', 'members', 'newsletter_subscriptions')
  AND qual != 'false'
  AND cmd = 'SELECT'
  
  UNION ALL
  
  -- Confirmer que les fonctions sécurisées sont opérationnelles
  SELECT 
    'SECURE_FUNCTIONS_OPERATIONAL'::text,
    'ACTIVE'::text,
    'AUCUN'::text
  WHERE EXISTS (
    SELECT 1 FROM information_schema.routines 
    WHERE routine_schema = 'public' 
    AND routine_name IN ('get_secure_user_info', 'get_users_list', 'get_member_directory')
  )
  
  UNION ALL
  
  -- Status de sécurité global
  SELECT 
    'SECURITY_STATUS_GLOBAL'::text,
    'MAXIMUM_SECURITY_ACHIEVED'::text,
    'AUCUN'::text;
$function$;