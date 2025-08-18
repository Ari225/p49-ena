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

-- Ajouter un trigger pour surveiller les modifications sur la table members
CREATE OR REPLACE FUNCTION public.log_member_modifications()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Logger les modifications sur les données membres
  PERFORM public.log_security_event(
    'member_data_modification',
    auth.uid(),
    jsonb_build_object(
      'operation', TG_OP,
      'member_id', COALESCE(NEW.id, OLD.id),
      'timestamp', now()
    )
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Créer le trigger sur les modifications de données
DROP TRIGGER IF EXISTS member_modification_log_trigger ON public.members;
CREATE TRIGGER member_modification_log_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.members
  FOR EACH ROW EXECUTE FUNCTION public.log_member_modifications();