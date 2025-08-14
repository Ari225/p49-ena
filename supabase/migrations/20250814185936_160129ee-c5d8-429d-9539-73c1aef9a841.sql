-- Fix security issue: Restrict access to sensitive member information with correct column names
-- Step 1: Remove the overly permissive public access policy
DROP POLICY IF EXISTS "Public can view members directory" ON public.members;

-- Step 2: Create a secure function to get member directory data (public safe)
CREATE OR REPLACE FUNCTION public.get_member_directory()
RETURNS TABLE(
  id bigint,
  prenoms text,
  nom_famille text,
  emploi_fonction_publique text,
  lieu_exercice text,
  photo text,
  matricule text,
  has_whatsapp boolean,
  has_facebook boolean,
  has_instagram boolean,
  has_linkedin boolean
) 
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $function$
  SELECT 
    m.id,
    m."Pr�noms" as prenoms,
    m."Nom de famille" as nom_famille,
    m."Emploi fonction publique" as emploi_fonction_publique,
    m."Lieu d'exercice" as lieu_exercice,
    m."Photo" as photo,
    m."Matricule" as matricule,
    CASE WHEN m."WhatsApp" IS NOT NULL AND m."WhatsApp" != 0 THEN true ELSE false END as has_whatsapp,
    CASE WHEN m."Facebook" IS NOT NULL AND m."Facebook" != '' THEN true ELSE false END as has_facebook,
    CASE WHEN m."instagram" IS NOT NULL AND m."instagram" != '' THEN true ELSE false END as has_instagram,
    CASE WHEN m."linkedIn" IS NOT NULL AND m."linkedIn" != '' THEN true ELSE false END as has_linkedin
  FROM public.members m
  WHERE m."Pr�noms" IS NOT NULL AND m."Nom de famille" IS NOT NULL
$function$;

-- Step 3: Create secure function for authenticated member details (with verification)
CREATE OR REPLACE FUNCTION public.get_member_details(member_matricule text, verification_matricule text)
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
  region text
) 
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $function$
  SELECT 
    m.id,
    m."Pr�noms" as prenoms,
    m."Nom de famille" as nom_famille,
    m."Email" as email,
    m."WhatsApp" as whatsapp,
    m."Emploi fonction publique" as emploi_fonction_publique,
    m."Lieu d'exercice" as lieu_exercice,
    m."Photo" as photo,
    m."Facebook" as facebook,
    m."instagram" as instagram,
    m."linkedIn" as linkedin,
    m."Date de naissance" as date_naissance,
    m."Ecole" as ecole,
    m."Fili�re_EGEF" as filiere_egef,
    m."Fili�re_EGAD" as filiere_egad,
    m."Minist�re" as ministere,
    m."R�gion" as region
  FROM public.members m
  WHERE m."Matricule" = member_matricule 
    AND (
      -- Allow if user provides correct matricule verification
      verification_matricule = member_matricule
      -- OR if user is authenticated admin
      OR EXISTS (
        SELECT 1 FROM public.app_users 
        WHERE id = auth.uid() 
        AND role IN ('admin_principal', 'admin_secondaire')
      )
    )
$function$;

-- Step 4: Create restricted public access policy
CREATE POLICY "Public can view via secure function only" 
ON public.members 
FOR SELECT 
USING (false); -- Block direct table access

-- Step 5: Ensure admins can still see full member data
CREATE POLICY "Admins can view all member data" 
ON public.members 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal', 'admin_secondaire')
  )
);

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.get_member_directory() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_member_details(text, text) TO anon, authenticated;