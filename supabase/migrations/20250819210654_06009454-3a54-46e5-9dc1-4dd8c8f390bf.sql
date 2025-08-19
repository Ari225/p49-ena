-- Créer une fonction pour obtenir 5 témoignages aléatoires quotidiens
CREATE OR REPLACE FUNCTION public.get_daily_testimonials()
RETURNS TABLE(
  id uuid,
  member_name text,
  member_position text,
  content text,
  image_url text,
  created_at timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Utiliser la date du jour comme seed pour assurer la même sélection par jour
  PERFORM setseed(extract(epoch from current_date)::integer / 86400 / 1000000.0);
  
  RETURN QUERY
  SELECT 
    t.id,
    t.member_name,
    t.member_position,
    t.content,
    t.image_url,
    t.created_at
  FROM testimonials t
  WHERE t.is_active = true
  ORDER BY random()
  LIMIT 5;
END;
$function$;