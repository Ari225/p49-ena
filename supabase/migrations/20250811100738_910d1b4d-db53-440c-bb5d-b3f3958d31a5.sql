-- Fix security linter warnings by setting search_path on existing functions

-- Ensure get_user_role has an explicit search_path
CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid)
RETURNS user_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $function$
  SELECT role FROM public.app_users WHERE id = user_id;
$function$;

-- Ensure update_activity_status has an explicit search_path
CREATE OR REPLACE FUNCTION public.update_activity_status()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  IF NEW.date < CURRENT_DATE THEN
    NEW.status = 'Terminé';
  ELSE
    NEW.status = 'À venir';
  END IF;
  RETURN NEW;
END;
$function$;