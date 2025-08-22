-- Supprimer et recréer la fonction pour retourner les vraies données non masquées des départs à la retraite
DROP FUNCTION IF EXISTS public.get_public_retirement_departures();

CREATE OR REPLACE FUNCTION public.get_public_retirement_departures()
 RETURNS TABLE(id uuid, member_name text, retirement_date date, years_of_service integer, tribute_message text, image_url text, category text, department text, "position" text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    rd.id,
    rd.member_name,  -- Retourner le vrai nom du membre (non masqué)
    rd.retirement_date,
    rd.years_of_service,
    rd.tribute_message,  -- Retourner le vrai message d'hommage (non masqué)
    rd.image_url,
    rd.category,
    rd.department,
    rd."position"
  FROM public.retirement_departures rd
  ORDER BY rd.retirement_date DESC;
END;
$function$;