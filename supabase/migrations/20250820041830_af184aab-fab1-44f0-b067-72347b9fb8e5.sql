-- Security Fix: Protect Personal Details in Events Tables
-- Issue: Events tables expose member names and personal details publicly

-- 1. Lock down direct access to events tables
DROP POLICY IF EXISTS "Anyone can view difficult events" ON public.difficult_events;
DROP POLICY IF EXISTS "Anyone can view happy events" ON public.happy_events;
DROP POLICY IF EXISTS "Anyone can view retirement departures" ON public.retirement_departures;

-- 2. Create restrictive RLS policies - only authenticated users can view
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

-- 4. Create admin functions for full data access
CREATE OR REPLACE FUNCTION public.get_admin_difficult_events()
RETURNS TABLE(
  id uuid,
  title text,
  description text,
  event_date date,
  category text,
  member_name text,
  family_support_message text,
  image_url text,
  created_at timestamp with time zone,
  created_by uuid
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Only allow admins to access full data
  IF NOT public.can_access_full_member_data() THEN
    RAISE EXCEPTION 'Accès refusé: privilèges administrateur requis';
  END IF;

  -- Log admin access
  PERFORM public.log_security_event(
    'admin_events_access',
    auth.uid(),
    '{"table": "difficult_events", "access_type": "full_data"}'::jsonb
  );

  RETURN QUERY
  SELECT 
    de.id,
    de.title,
    de.description,
    de.event_date,
    de.category,
    de.member_name,
    de.family_support_message,
    de.image_url,
    de.created_at,
    de.created_by
  FROM public.difficult_events de
  ORDER BY de.created_at DESC;
END;
$function$;

-- 5. Log access to sensitive event data
CREATE OR REPLACE FUNCTION public.log_event_access()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Log access to sensitive event data
  PERFORM public.log_security_event(
    'sensitive_event_access',
    auth.uid(),
    jsonb_build_object(
      'table', TG_TABLE_NAME,
      'operation', TG_OP,
      'event_id', COALESCE(NEW.id, OLD.id)
    )
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$function$;

-- 6. Create triggers for access logging
CREATE TRIGGER log_difficult_events_access
  AFTER SELECT ON public.difficult_events
  FOR EACH ROW EXECUTE FUNCTION public.log_event_access();

CREATE TRIGGER log_happy_events_access
  AFTER SELECT ON public.happy_events
  FOR EACH ROW EXECUTE FUNCTION public.log_event_access();

CREATE TRIGGER log_retirement_departures_access
  AFTER SELECT ON public.retirement_departures
  FOR EACH ROW EXECUTE FUNCTION public.log_event_access();

-- 7. Security verification function
CREATE OR REPLACE FUNCTION public.verify_events_security()
RETURNS TABLE(check_name text, status text, details text)
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  -- Check that direct access is blocked
  SELECT 
    'EVENTS_DIRECT_ACCESS_BLOCKED'::text,
    CASE WHEN COUNT(*) = 0 THEN 'SECURED' ELSE 'VULNERABLE' END::text,
    'Public SELECT policies on events tables: ' || COUNT(*)::text
  FROM pg_policies 
  WHERE schemaname = 'public' 
  AND tablename IN ('difficult_events', 'happy_events', 'retirement_departures')
  AND cmd = 'SELECT'
  AND qual ~ 'true'
  
  UNION ALL
  
  -- Check that secure functions exist
  SELECT 
    'SECURE_FUNCTIONS_AVAILABLE'::text,
    CASE WHEN COUNT(*) >= 3 THEN 'AVAILABLE' ELSE 'MISSING' END::text,
    'Public event functions available: ' || COUNT(*)::text
  FROM information_schema.routines 
  WHERE routine_schema = 'public' 
  AND routine_name LIKE 'get_public_%_events%';
$function$;