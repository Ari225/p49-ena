-- Fix function search_path security issue
-- Add SET search_path TO 'public' to validate_activity_category function

CREATE OR REPLACE FUNCTION public.validate_activity_category()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NEW.category = 'Autre' AND (NEW.other_category IS NULL OR NEW.other_category = '') THEN
    RAISE EXCEPTION 'Le champ "autre catégorie" est requis quand la catégorie est "Autre"';
  END IF;
  
  IF NEW.category != 'Autre' THEN
    NEW.other_category = NULL;
  END IF;
  
  RETURN NEW;
END;
$function$;