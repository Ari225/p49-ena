-- Modifier la fonction pour retourner les données non masquées des événements heureux
CREATE OR REPLACE FUNCTION public.get_public_happy_events()
 RETURNS TABLE(id uuid, title text, event_date text, category text, masked_member_name text, general_message text, image_url text, location text)
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
    -- Retourner le vrai nom du membre (non masqué)
    he.member_name as masked_member_name,
    -- Retourner le vrai message (non masqué)
    COALESCE(he.message, 'Nos sincères félicitations') as general_message,
    he.image_url,
    he.location
  FROM public.happy_events he
  ORDER BY he.created_at DESC;
END;
$function$;