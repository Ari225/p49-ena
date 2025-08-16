-- SCRIPT DE SÉCURISATION COMPLÈTE - VERSION CORRIGÉE
-- Suppression sécurisée et recréation des politiques

-- 1. NETTOYAGE DES POLITIQUES EXISTANTES
-- App Users
DROP POLICY IF EXISTS "Admin principal can view all users" ON public.app_users;
DROP POLICY IF EXISTS "Users can view own profile" ON public.app_users;
DROP POLICY IF EXISTS "Only admin principal can create users" ON public.app_users;
DROP POLICY IF EXISTS "Admin principal can manage all users" ON public.app_users;

-- News
DROP POLICY IF EXISTS "Admins can manage all news" ON public.news;
DROP POLICY IF EXISTS "Editors can manage their own news" ON public.news;
DROP POLICY IF EXISTS "Public can view visible news" ON public.news;

-- Members
DROP POLICY IF EXISTS "Only authenticated admins can access members directly" ON public.members;

-- Events tables
DROP POLICY IF EXISTS "Admins can manage all activities" ON public.activities;
DROP POLICY IF EXISTS "Admins can manage all social events" ON public.social_events;
DROP POLICY IF EXISTS "Admins can manage all happy events" ON public.happy_events;
DROP POLICY IF EXISTS "Admins can manage all difficult events" ON public.difficult_events;
DROP POLICY IF EXISTS "Admins can manage all retirement departures" ON public.retirement_departures;

-- Content tables
DROP POLICY IF EXISTS "Admins can manage all blog articles" ON public.blog_articles;
DROP POLICY IF EXISTS "Admins can manage all journal editions" ON public.journal_editions;
DROP POLICY IF EXISTS "Admins can manage all media items" ON public.media_items;

-- 2. RECRÉATION DES POLITIQUES SÉCURISÉES
-- App Users - Politiques ultra-strictes
CREATE POLICY "Secure_Users_View_Own_Profile" 
ON public.app_users 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Secure_Admin_Principal_View_All" 
ON public.app_users 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.app_users au 
  WHERE au.id = auth.uid() AND au.role = 'admin_principal'::user_role
));

CREATE POLICY "Secure_Admin_Principal_Create_Users" 
ON public.app_users 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.app_users au 
  WHERE au.id = auth.uid() AND au.role = 'admin_principal'::user_role
));

CREATE POLICY "Secure_Users_Update_Profile" 
ON public.app_users 
FOR UPDATE 
USING ((auth.uid() = id) OR (EXISTS (
  SELECT 1 FROM public.app_users au 
  WHERE au.id = auth.uid() AND au.role = ANY (ARRAY['admin_principal'::user_role, 'admin_secondaire'::user_role])
)));

CREATE POLICY "Secure_Admin_Principal_Delete_Users" 
ON public.app_users 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM public.app_users au 
  WHERE au.id = auth.uid() AND au.role = 'admin_principal'::user_role
));

-- News - Sécurisation complète
CREATE POLICY "Secure_Admins_Manage_News" 
ON public.news 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.app_users au 
  WHERE au.id = auth.uid() AND au.role = ANY (ARRAY['admin_principal'::user_role, 'admin_secondaire'::user_role])
));

CREATE POLICY "Secure_Editors_Own_News" 
ON public.news 
FOR ALL 
USING (auth.uid() = created_by);

CREATE POLICY "Secure_Public_View_News" 
ON public.news 
FOR SELECT 
USING (is_visible = true);

-- Members - Accès ultra restreint
CREATE POLICY "Secure_Admins_Only_Members_Access" 
ON public.members 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.app_users au 
  WHERE au.id = auth.uid() AND au.role = ANY (ARRAY['admin_principal'::user_role, 'admin_secondaire'::user_role])
));

-- 3. FONCTION DE VÉRIFICATION DE SÉCURITÉ AVANCÉE
CREATE OR REPLACE FUNCTION public.security_audit_report()
RETURNS TABLE(
  audit_category text, 
  issue_description text, 
  severity_level text,
  recommendation text,
  affected_count bigint
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
  -- Vérification des tables sans RLS
  SELECT 
    'RLS_PROTECTION'::text,
    'Table sans Row Level Security: ' || schemaname || '.' || tablename,
    'CRITIQUE'::text,
    'Activer RLS immédiatement'::text,
    1::bigint
  FROM pg_tables 
  WHERE schemaname = 'public' AND NOT rowsecurity
  
  UNION ALL
  
  -- Vérification des utilisateurs avec mots de passe faibles
  SELECT 
    'PASSWORD_SECURITY'::text,
    'Utilisateurs sans mot de passe ou avec hash faible'::text,
    'ÉLEVÉ'::text,
    'Forcer la réinitialisation des mots de passe'::text,
    COUNT(*)::bigint
  FROM public.app_users 
  WHERE password_hash IS NULL OR length(password_hash) < 20
  
  UNION ALL
  
  -- Vérification des données personnelles exposées
  SELECT 
    'DATA_EXPOSURE'::text,
    'Membres avec emails exposés publiquement'::text,
    'ÉLEVÉ'::text,
    'Restreindre l''accès aux données membres'::text,
    COUNT(*)::bigint
  FROM public.members 
  WHERE "Email" IS NOT NULL AND "Email" != ''
  
  UNION ALL
  
  -- Vérification des contenus sans auteur
  SELECT 
    'DATA_INTEGRITY'::text,
    'Contenus sans auteur identifié'::text,
    'MOYEN'::text,
    'Assigner des auteurs aux contenus'::text,
    (SELECT COUNT(*) FROM public.news WHERE created_by IS NULL)::bigint;
$function$;

-- 4. FONCTION DE MONITORING EN TEMPS RÉEL
CREATE OR REPLACE FUNCTION public.security_monitor()
RETURNS TABLE(
  timestamp_check timestamp with time zone,
  security_status text,
  active_threats bigint,
  recommendations text[]
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
  threat_count bigint;
  rec_array text[];
BEGIN
  -- Compter les menaces actives
  SELECT COUNT(*) INTO threat_count
  FROM (
    SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND NOT rowsecurity
    UNION ALL
    SELECT 1 FROM public.app_users WHERE password_hash IS NULL OR length(password_hash) < 20
  ) threats;
  
  -- Générer des recommandations
  rec_array := ARRAY[]::text[];
  
  IF threat_count > 0 THEN
    rec_array := array_append(rec_array, 'Activer RLS sur toutes les tables');
    rec_array := array_append(rec_array, 'Forcer la réinitialisation des mots de passe faibles');
    rec_array := array_append(rec_array, 'Auditer les accès aux données sensibles');
  END IF;
  
  RETURN QUERY SELECT 
    now() as timestamp_check,
    CASE 
      WHEN threat_count = 0 THEN 'SÉCURISÉ'
      WHEN threat_count < 5 THEN 'ATTENTION'
      ELSE 'DANGER'
    END as security_status,
    threat_count as active_threats,
    rec_array as recommendations;
END;
$function$;