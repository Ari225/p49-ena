-- Corriger la fonction pour retourner les vraies données non masquées
DROP FUNCTION IF EXISTS public.get_public_happy_events();

CREATE OR REPLACE FUNCTION public.get_public_happy_events()
 RETURNS TABLE(id uuid, title text, event_date text, category text, member_name text, message text, image_url text, location text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    he.id,
    he.title,
    he.event_date,
    he.category,
    he.member_name,  -- Retourner le vrai nom du membre
    he.message,      -- Retourner le vrai message
    he.image_url,
    he.location
  FROM public.happy_events he
  ORDER BY he.created_at DESC;
END;
$function$;