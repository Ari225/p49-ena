-- Créer une fonction pour récupérer les membres du bureau exécutif
CREATE OR REPLACE FUNCTION public.get_bureau_executif_members()
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
  WHERE i."Position" = 'bureau_executif'
  ORDER BY i.id ASC;
END;
$function$;