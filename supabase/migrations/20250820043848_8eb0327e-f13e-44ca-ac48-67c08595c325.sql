-- Mettre à jour la fonction get_member_details pour utiliser l'accès public 
-- tout en gardant les vérifications par matricule

CREATE OR REPLACE FUNCTION public.get_member_details_public(
  member_matricule text,
  verification_matricule text
)
RETURNS TABLE(
  id bigint,
  prenoms text,
  nom_famille text,
  email text,
  whatsapp bigint,
  emploi_fonction_publique text,
  lieu_exercice text,
  photo text,
  facebook text,
  instagram text,
  linkedin text,
  date_naissance text,
  ecole text,
  filiere_egef text,
  filiere_egad text,
  ministere text,
  region text,
  matricule text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Vérifier que les matricules correspondent (pour sécurité)
  IF member_matricule != verification_matricule THEN
    RAISE EXCEPTION 'Matricules ne correspondent pas';
  END IF;
  
  -- Vérifier que le matricule existe
  IF NOT EXISTS (
    SELECT 1 FROM public.members 
    WHERE "Matricule" = member_matricule
  ) THEN
    RAISE EXCEPTION 'Matricule non trouvé';
  END IF;

  -- Logger l'accès
  PERFORM public.log_security_event(
    'member_details_access_with_matricule',
    auth.uid(),
    jsonb_build_object(
      'matricule_used', left(member_matricule, 2) || '***',
      'access_type', 'matricule_verification'
    )
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
    m."R�gion",
    m."Matricule"
  FROM public.members m
  WHERE m."Matricule" = member_matricule;
END;
$function$;