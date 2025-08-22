-- Modifier la fonction pour retourner les vraies données non masquées des départs à la retraite
CREATE OR REPLACE FUNCTION public.get_public_retirement_departures()
 RETURNS TABLE(id uuid, member_name text, retirement_date date, years_of_service integer, general_tribute text, image_url text, category text)
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
    -- Retourner le vrai message d'hommage (non masqué)
    COALESCE(rd.tribute_message, 'Merci pour votre service dévoué à la nation') as general_tribute,
    rd.image_url,
    rd.category
  FROM public.retirement_departures rd
  ORDER BY rd.retirement_date DESC;
END;
$function$;