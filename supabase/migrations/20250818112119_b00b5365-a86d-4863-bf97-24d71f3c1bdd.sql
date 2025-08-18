-- Créer des fonctions sécurisées pour le masquage des données sensibles
CREATE OR REPLACE FUNCTION public.mask_sensitive_data(data_value TEXT, show_full BOOLEAN DEFAULT false)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  IF data_value IS NULL OR data_value = '' THEN
    RETURN NULL;
  END IF;
  
  -- Si l'utilisateur a accès complet (admin), montrer toutes les données
  IF show_full THEN
    RETURN data_value;
  END IF;
  
  -- Masquer partiellement les données sensibles
  IF length(data_value) <= 3 THEN
    RETURN '***';
  ELSE
    RETURN substring(data_value, 1, 2) || '***' || substring(data_value, length(data_value), 1);
  END IF;
END;
$$;

-- Fonction pour vérifier si l'utilisateur peut accéder aux données complètes
CREATE OR REPLACE FUNCTION public.can_access_full_member_data()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Seuls les admins peuvent accéder aux données complètes
  RETURN EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal', 'admin_secondaire')
  );
END;
$$;

-- Fonction sécurisée pour obtenir un aperçu du répertoire des membres (données publiques uniquement)
CREATE OR REPLACE FUNCTION public.get_public_member_directory()
RETURNS TABLE(
  id BIGINT,
  prenoms_masque TEXT,
  nom_famille_masque TEXT,
  emploi_fonction_publique TEXT,
  lieu_exercice TEXT,
  region TEXT,
  has_whatsapp BOOLEAN,
  has_facebook BOOLEAN,
  has_instagram BOOLEAN,
  has_linkedin BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    m.id,
    public.mask_sensitive_data(m."Pr�noms", false) as prenoms_masque,
    public.mask_sensitive_data(m."Nom de famille", false) as nom_famille_masque,
    m."Emploi fonction publique",
    m."Lieu d'exercice",
    m."R�gion",
    CASE WHEN m."WhatsApp" IS NOT NULL AND m."WhatsApp" != 0 THEN true ELSE false END as has_whatsapp,
    CASE WHEN m."Facebook" IS NOT NULL AND m."Facebook" != '' THEN true ELSE false END as has_facebook,
    CASE WHEN m."instagram" IS NOT NULL AND m."instagram" != '' THEN true ELSE false END as has_instagram,
    CASE WHEN m."linkedIn" IS NOT NULL AND m."linkedIn" != '' THEN true ELSE false END as has_linkedin
  FROM public.members m
  WHERE m."Pr�noms" IS NOT NULL AND m."Nom de famille" IS NOT NULL;
END;
$$;

-- Fonction sécurisée pour les détails complets (admin seulement)
CREATE OR REPLACE FUNCTION public.get_secure_member_details(target_member_id BIGINT)
RETURNS TABLE(
  id BIGINT,
  prenoms TEXT,
  nom_famille TEXT,
  email TEXT,
  whatsapp BIGINT,
  emploi_fonction_publique TEXT,
  lieu_exercice TEXT,
  photo TEXT,
  facebook TEXT,
  instagram TEXT,
  linkedin TEXT,
  date_naissance TEXT,
  ecole TEXT,
  filiere_egef TEXT,
  filiere_egad TEXT,
  ministere TEXT,
  region TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Vérifier que l'utilisateur est admin
  IF NOT public.can_access_full_member_data() THEN
    RAISE EXCEPTION 'Accès refusé: privilèges administrateur requis';
  END IF;

  -- Logger l'accès aux données sensibles
  PERFORM public.log_security_event(
    'member_data_access',
    auth.uid(),
    jsonb_build_object('member_id', target_member_id, 'access_type', 'full_details')
  );

  RETURN QUERY
  SELECT 
    m.id,
    m."Pr�noms",
    m."Nom de famille",
    m."Email",
    m."WhatsApp",
    m."Emploi fonction publique",
    m."Lieu d'exercice",
    m."Photo",
    m."Facebook",
    m."instagram",
    m."linkedIn",
    m."Date de naissance",
    m."Ecole",
    m."Fili�re_EGEF",
    m."Fili�re_EGAD",
    m."Minist�re",
    m."R�gion"
  FROM public.members m
  WHERE m.id = target_member_id;
END;
$$;

-- Ajouter un trigger pour logger tous les accès aux données membres
CREATE OR REPLACE FUNCTION public.log_member_access()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Logger tous les accès aux données membres
  PERFORM public.log_security_event(
    'member_table_access',
    auth.uid(),
    jsonb_build_object(
      'operation', TG_OP,
      'table', TG_TABLE_NAME,
      'timestamp', now()
    )
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Créer le trigger sur la table members
DROP TRIGGER IF EXISTS member_access_log_trigger ON public.members;
CREATE TRIGGER member_access_log_trigger
  AFTER SELECT OR INSERT OR UPDATE OR DELETE ON public.members
  FOR EACH STATEMENT EXECUTE FUNCTION public.log_member_access();

-- Mettre à jour les fonctions existantes pour utiliser le nouveau système de sécurité
DROP FUNCTION IF EXISTS public.get_member_directory();
CREATE OR REPLACE FUNCTION public.get_member_directory()
RETURNS TABLE(
  id BIGINT,
  prenoms TEXT,
  nom_famille TEXT,
  emploi_fonction_publique TEXT,
  lieu_exercice TEXT,
  photo TEXT,
  matricule TEXT,
  has_whatsapp BOOLEAN,
  has_facebook BOOLEAN,
  has_instagram BOOLEAN,
  has_linkedin BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  show_full_data BOOLEAN;
BEGIN
  -- Vérifier les privilèges
  show_full_data := public.can_access_full_member_data();
  
  -- Logger l'accès
  PERFORM public.log_security_event(
    'member_directory_access',
    auth.uid(),
    jsonb_build_object('full_access', show_full_data)
  );

  RETURN QUERY
  SELECT 
    m.id,
    CASE WHEN show_full_data THEN m."Pr�noms" 
         ELSE public.mask_sensitive_data(m."Pr�noms", false) END as prenoms,
    CASE WHEN show_full_data THEN m."Nom de famille" 
         ELSE public.mask_sensitive_data(m."Nom de famille", false) END as nom_famille,
    m."Emploi fonction publique",
    m."Lieu d'exercice",
    m."Photo",
    CASE WHEN show_full_data THEN m."Matricule" 
         ELSE public.mask_sensitive_data(m."Matricule", false) END as matricule,
    CASE WHEN m."WhatsApp" IS NOT NULL AND m."WhatsApp" != 0 THEN true ELSE false END as has_whatsapp,
    CASE WHEN m."Facebook" IS NOT NULL AND m."Facebook" != '' THEN true ELSE false END as has_facebook,
    CASE WHEN m."instagram" IS NOT NULL AND m."instagram" != '' THEN true ELSE false END as has_instagram,
    CASE WHEN m."linkedIn" IS NOT NULL AND m."linkedIn" != '' THEN true ELSE false END as has_linkedin
  FROM public.members m
  WHERE m."Pr�noms" IS NOT NULL AND m."Nom de famille" IS NOT NULL;
END;
$$;