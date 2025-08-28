-- Supprimer et recréer la fonction RPC pour inclure la description
DROP FUNCTION public.get_public_happy_events();

CREATE OR REPLACE FUNCTION public.get_public_happy_events()
 RETURNS TABLE(id uuid, title text, event_date text, category text, member_name text, message text, image_url text, location text, description text)
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
    he.member_name,
    he.message,
    he.image_url,
    he.location,
    he.description  -- Ajouter la description
  FROM public.happy_events he
  ORDER BY he.created_at DESC;
END;
$function$;