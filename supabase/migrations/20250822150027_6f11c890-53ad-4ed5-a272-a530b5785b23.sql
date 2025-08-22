-- Modifier la fonction pour retourner les vraies données non masquées des événements difficiles
CREATE OR REPLACE FUNCTION public.get_public_difficult_events()
 RETURNS TABLE(id uuid, title text, event_date date, category text, member_name text, family_support_message text, image_url text, description text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    de.id,
    de.title,
    de.event_date,
    de.category,
    de.member_name,  -- Retourner le vrai nom du membre (non masqué)
    -- Retourner le vrai message de soutien familial (non masqué)
    de.family_support_message,
    de.image_url,
    de.description
  FROM public.difficult_events de
  ORDER BY de.event_date DESC;
END;
$function$;