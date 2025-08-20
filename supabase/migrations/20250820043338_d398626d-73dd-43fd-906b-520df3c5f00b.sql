-- Retirer le masquage des données membres
-- Permettre l'accès public complet aux données des membres

-- 1. Créer une nouvelle politique RLS pour accès public aux données membres
DROP POLICY IF EXISTS "COMPLETELY_LOCKED_MEMBERS" ON public.members;
DROP POLICY IF EXISTS "Public can view via secure function only" ON public.members;
DROP POLICY IF EXISTS "ULTIMATE_BLOCK_members" ON public.members;

-- 2. Créer une politique permettant la lecture publique
CREATE POLICY "Public can view all member data" 
ON public.members 
FOR SELECT 
USING (true);

-- 3. Créer une fonction publique pour récupérer tous les membres sans masquage
CREATE OR REPLACE FUNCTION public.get_all_members_public()
RETURNS TABLE(
  id bigint,
  prenoms text,
  nom_famille text,
  emploi_fonction_publique text,
  lieu_exercice text,
  photo text,
  matricule text,
  email text,
  whatsapp bigint,
  facebook text,
  instagram text,
  linkedin text,
  date_naissance text,
  ecole text,
  filiere_egef text,
  filiere_egad text,
  ministere text,
  region text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    m.id,
    m."Pr�noms",
    m."Nom de famille",
    m."Emploi fonction publique",
    m."Lieu d'exercice",
    m."Photo",
    m."Matricule",
    m."Email",
    m."WhatsApp",
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
  ORDER BY m."Nom de famille", m."Pr�noms";
END;
$function$;