-- SCRIPT DE SÉCURISATION COMPLÈTE DE LA BASE DE DONNÉES
-- Ce script sécurise toutes les tables et données contre les accès non autorisés

-- 1. SÉCURISATION DE LA TABLE APP_USERS
-- Supprimer toutes les politiques trop permissives
DROP POLICY IF EXISTS "Allow user creation from app" ON public.app_users;
DROP POLICY IF EXISTS "Allow all authenticated operations on news" ON public.news;

-- Politiques strictes pour app_users
CREATE POLICY "Users can view own profile only" 
ON public.app_users 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Admin principal can view all users" 
ON public.app_users 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.app_users au 
  WHERE au.id = auth.uid() AND au.role = 'admin_principal'::user_role
));

CREATE POLICY "Only admin principal can create users" 
ON public.app_users 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.app_users au 
  WHERE au.id = auth.uid() AND au.role = 'admin_principal'::user_role
));

CREATE POLICY "Users can update own profile, admins can update any" 
ON public.app_users 
FOR UPDATE 
USING ((auth.uid() = id) OR (EXISTS (
  SELECT 1 FROM public.app_users au 
  WHERE au.id = auth.uid() AND au.role = ANY (ARRAY['admin_principal'::user_role, 'admin_secondaire'::user_role])
)));

CREATE POLICY "Only admin principal can delete users" 
ON public.app_users 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM public.app_users au 
  WHERE au.id = auth.uid() AND au.role = 'admin_principal'::user_role
));

-- 2. SÉCURISATION DE LA TABLE NEWS
CREATE POLICY "Admins can manage all news" 
ON public.news 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.app_users au 
  WHERE au.id = auth.uid() AND au.role = ANY (ARRAY['admin_principal'::user_role, 'admin_secondaire'::user_role])
));

CREATE POLICY "Editors can manage their own news" 
ON public.news 
FOR ALL 
USING (auth.uid() = created_by);

CREATE POLICY "Public can view visible news only" 
ON public.news 
FOR SELECT 
USING (is_visible = true);

-- 3. SÉCURISATION DE LA TABLE MEMBERS - ACCÈS ULTRA RESTREINT
-- Supprimer la politique trop permissive
DROP POLICY IF EXISTS "Public can view via secure function only" ON public.members;

-- Nouvelle politique très stricte pour members
CREATE POLICY "Only authenticated admins can access members directly" 
ON public.members 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.app_users au 
  WHERE au.id = auth.uid() AND au.role = ANY (ARRAY['admin_principal'::user_role, 'admin_secondaire'::user_role])
));

-- 4. SÉCURISATION DES TABLES D'ÉVÉNEMENTS
-- Activities
CREATE POLICY "Admins can manage all activities" 
ON public.activities 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.app_users au 
  WHERE au.id = auth.uid() AND au.role = ANY (ARRAY['admin_principal'::user_role, 'admin_secondaire'::user_role])
));

-- Social Events
CREATE POLICY "Admins can manage all social events" 
ON public.social_events 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.app_users au 
  WHERE au.id = auth.uid() AND au.role = ANY (ARRAY['admin_principal'::user_role, 'admin_secondaire'::user_role])
));

-- Happy Events
CREATE POLICY "Admins can manage all happy events" 
ON public.happy_events 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.app_users au 
  WHERE au.id = auth.uid() AND au.role = ANY (ARRAY['admin_principal'::user_role, 'admin_secondaire'::user_role])
));

-- Difficult Events
CREATE POLICY "Admins can manage all difficult events" 
ON public.difficult_events 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.app_users au 
  WHERE au.id = auth.uid() AND au.role = ANY (ARRAY['admin_principal'::user_role, 'admin_secondaire'::user_role])
));

-- Retirement Departures
CREATE POLICY "Admins can manage all retirement departures" 
ON public.retirement_departures 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.app_users au 
  WHERE au.id = auth.uid() AND au.role = ANY (ARRAY['admin_principal'::user_role, 'admin_secondaire'::user_role])
));

-- 5. SÉCURISATION DES TABLES DE CONTENU
-- Blog Articles
CREATE POLICY "Admins can manage all blog articles" 
ON public.blog_articles 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.app_users au 
  WHERE au.id = auth.uid() AND au.role = ANY (ARRAY['admin_principal'::user_role, 'admin_secondaire'::user_role])
));

-- Journal Editions
CREATE POLICY "Admins can manage all journal editions" 
ON public.journal_editions 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.app_users au 
  WHERE au.id = auth.uid() AND au.role = ANY (ARRAY['admin_principal'::user_role, 'admin_secondaire'::user_role])
));

-- Media Items
CREATE POLICY "Admins can manage all media items" 
ON public.media_items 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.app_users au 
  WHERE au.id = auth.uid() AND au.role = ANY (ARRAY['admin_principal'::user_role, 'admin_secondaire'::user_role])
));

-- 6. CRÉER UNE FONCTION DE VÉRIFICATION DE SÉCURITÉ
CREATE OR REPLACE FUNCTION public.check_security_compliance()
RETURNS TABLE(table_name text, has_rls boolean, policy_count bigint, risk_level text)
LANGUAGE sql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
  SELECT 
    schemaname || '.' || tablename as table_name,
    rowsecurity as has_rls,
    COALESCE(policy_count, 0) as policy_count,
    CASE 
      WHEN NOT rowsecurity THEN 'CRITIQUE - RLS désactivé'
      WHEN COALESCE(policy_count, 0) = 0 THEN 'ÉLEVÉ - Aucune politique'
      WHEN COALESCE(policy_count, 0) < 3 THEN 'MOYEN - Peu de politiques'
      ELSE 'FAIBLE - Bien sécurisé'
    END as risk_level
  FROM pg_tables pt
  LEFT JOIN (
    SELECT 
      schemaname,
      tablename,
      COUNT(*) as policy_count
    FROM pg_policies
    GROUP BY schemaname, tablename
  ) pp ON pt.schemaname = pp.schemaname AND pt.tablename = pp.tablename
  WHERE pt.schemaname = 'public'
  ORDER BY 
    CASE 
      WHEN NOT rowsecurity THEN 1
      WHEN COALESCE(policy_count, 0) = 0 THEN 2
      WHEN COALESCE(policy_count, 0) < 3 THEN 3
      ELSE 4
    END;
$function$;

-- 7. CRÉER UNE FONCTION DE NETTOYAGE DES SESSIONS
CREATE OR REPLACE FUNCTION public.cleanup_expired_sessions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  -- Log l'opération de nettoyage
  PERFORM public.log_security_event('session_cleanup', NULL, '{"action": "cleanup_expired_sessions"}'::jsonb);
  
  -- Cette fonction peut être étendue pour nettoyer les sessions expirées
  -- selon vos besoins spécifiques
END;
$function$;

-- 8. FONCTION DE VALIDATION DE L'INTÉGRITÉ DES DONNÉES
CREATE OR REPLACE FUNCTION public.validate_data_integrity()
RETURNS TABLE(table_name text, issue_description text, affected_count bigint)
LANGUAGE sql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
  -- Vérifier les utilisateurs sans mot de passe
  SELECT 'app_users'::text, 'Utilisateurs sans mot de passe'::text, COUNT(*)::bigint
  FROM public.app_users 
  WHERE password_hash IS NULL OR password_hash = ''
  
  UNION ALL
  
  -- Vérifier les actualités sans auteur
  SELECT 'news'::text, 'Actualités sans auteur'::text, COUNT(*)::bigint
  FROM public.news 
  WHERE created_by IS NULL
  
  UNION ALL
  
  -- Vérifier les membres avec des données sensibles exposées
  SELECT 'members'::text, 'Membres avec emails exposés'::text, COUNT(*)::bigint
  FROM public.members 
  WHERE "Email" IS NOT NULL AND "Email" != '';
$function$;