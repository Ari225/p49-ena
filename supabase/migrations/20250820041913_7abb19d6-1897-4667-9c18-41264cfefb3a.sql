-- Security Fix: Protect Personal Details in Events Tables
-- Issue: Events tables expose member names and personal details publicly

-- 1. Lock down direct access to events tables
DROP POLICY IF EXISTS "Anyone can view difficult events" ON public.difficult_events;
DROP POLICY IF EXISTS "Anyone can view happy events" ON public.happy_events;
DROP POLICY IF EXISTS "Anyone can view retirement departures" ON public.retirement_departures;

-- 2. Create restrictive RLS policies - only authenticated users can view full data
CREATE POLICY "Authenticated users can view difficult events" 
ON public.difficult_events 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can view happy events" 
ON public.happy_events 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can view retirement departures" 
ON public.retirement_departures 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- 3. Create secure public functions that return sanitized data
CREATE OR REPLACE FUNCTION public.get_public_difficult_events()
RETURNS TABLE(
  id uuid,
  title text,
  event_date date,
  category text,
  masked_member_name text,
  general_message text,
  image_url text
)
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
    -- Mask member names for privacy
    CASE 
      WHEN de.member_name IS NOT NULL THEN 
        substring(de.member_name, 1, 1) || '***' || 
        CASE WHEN length(de.member_name) > 1 THEN substring(de.member_name, length(de.member_name), 1) ELSE '' END
      ELSE 'Membre anonyme'
    END as masked_member_name,
    -- Remove specific family details, use generic message
    CASE 
      WHEN de.family_support_message IS NOT NULL THEN 'La famille P49 présente ses condoléances'
      ELSE 'Nos pensées vous accompagnent'
    END as general_message,
    de.image_url
  FROM public.difficult_events de
  ORDER BY de.event_date DESC;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_public_happy_events()
RETURNS TABLE(
  id uuid,
  title text,
  event_date text,
  category text,
  masked_member_name text,
  general_message text,
  image_url text,
  location text
)
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
    -- Mask member names for privacy
    CASE 
      WHEN he.member_name IS NOT NULL THEN 
        substring(he.member_name, 1, 1) || '***' || 
        CASE WHEN length(he.member_name) > 1 THEN substring(he.member_name, length(he.member_name), 1) ELSE '' END
      ELSE 'Membre P49'
    END as masked_member_name,
    -- Use generic congratulatory message
    CASE 
      WHEN he.message IS NOT NULL THEN 'Félicitations de la part de toute la famille P49'
      ELSE 'Nos sincères félicitations'
    END as general_message,
    he.image_url,
    he.location
  FROM public.happy_events he
  ORDER BY he.created_at DESC;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_public_retirement_departures()
RETURNS TABLE(
  id uuid,
  masked_member_name text,
  retirement_date date,
  years_of_service integer,
  general_tribute text,
  image_url text,
  category text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    rd.id,
    -- Mask member names for privacy
    CASE 
      WHEN rd.member_name IS NOT NULL THEN 
        substring(rd.member_name, 1, 1) || '***' || 
        CASE WHEN length(rd.member_name) > 1 THEN substring(rd.member_name, length(rd.member_name), 1) ELSE '' END
      ELSE 'Membre retraité'
    END as masked_member_name,
    rd.retirement_date,
    rd.years_of_service,
    -- Use generic tribute message
    CASE 
      WHEN rd.years_of_service IS NOT NULL THEN 
        'Merci pour ' || rd.years_of_service || ' années de service dévoué à la nation'
      ELSE 'Merci pour votre service dévoué à la nation'
    END as general_tribute,
    rd.image_url,
    rd.category
  FROM public.retirement_departures rd
  ORDER BY rd.retirement_date DESC;
END;
$function$;