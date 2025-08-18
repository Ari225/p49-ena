-- Mettre à jour la fonction get_member_directory existante pour utiliser le masquage sécurisé
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

-- Mettre à jour la fonction get_member_details existante pour utiliser la nouvelle sécurité
CREATE OR REPLACE FUNCTION public.get_member_details(member_matricule text, verification_matricule text)
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
DECLARE
  is_admin BOOLEAN;
  is_self_access BOOLEAN;
BEGIN
  -- Vérifier si l'utilisateur est admin
  is_admin := public.can_access_full_member_data();
  
  -- Vérifier si c'est un accès avec matricule valide
  is_self_access := (verification_matricule = member_matricule);
  
  -- Logger l'accès
  PERFORM public.log_security_event(
    'member_details_access',
    auth.uid(),
    jsonb_build_object(
      'matricule_accessed', public.mask_sensitive_data(member_matricule, false),
      'is_admin', is_admin,
      'is_self_access', is_self_access
    )
  );
  
  -- Autoriser l'accès seulement si admin ou accès avec matricule valide
  IF NOT (is_admin OR is_self_access) THEN
    RAISE EXCEPTION 'Accès refusé: privilèges insuffisants';
  END IF;

  RETURN QUERY
  SELECT 
    m.id,
    m."Pr�noms",
    m."Nom de famille",
    CASE WHEN is_admin THEN m."Email" 
         ELSE public.mask_sensitive_data(m."Email", false) END,
    CASE WHEN is_admin THEN m."WhatsApp"
         ELSE NULL END,
    m."Emploi fonction publique",
    m."Lieu d'exercice",
    m."Photo",
    CASE WHEN is_admin THEN m."Facebook"
         ELSE public.mask_sensitive_data(m."Facebook", false) END,
    CASE WHEN is_admin THEN m."instagram"
         ELSE public.mask_sensitive_data(m."instagram", false) END,
    CASE WHEN is_admin THEN m."linkedIn"
         ELSE public.mask_sensitive_data(m."linkedIn", false) END,
    CASE WHEN is_admin THEN m."Date de naissance"
         ELSE public.mask_sensitive_data(m."Date de naissance", false) END,
    m."Ecole",
    m."Fili�re_EGEF",
    m."Fili�re_EGAD",
    m."Minist�re",
    m."R�gion"
  FROM public.members m
  WHERE m."Matricule" = member_matricule;
END;
$$;