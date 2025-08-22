-- Créer une fonction pour récupérer les commissaires aux comptes (id 22 et 23)
CREATE OR REPLACE FUNCTION public.get_commissaires_members()
RETURNS TABLE(id bigint, nom_prenoms text, poste text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    i.id,
    i."Nom et Prénoms" as nom_prenoms,
    i."Poste" as poste
  FROM public.instances_dir i
  WHERE i.id IN (22, 23)
  ORDER BY i.id ASC;
END;
$function$;