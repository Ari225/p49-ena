-- Fix security warnings from linter

-- Fix 1: Update functions to have immutable search_path
-- Update existing functions to set proper search_path
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
BEGIN
  RETURN (SELECT role FROM public.app_users WHERE id = auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = 'public';

-- Update other functions to set search_path properly
CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid)
RETURNS user_role
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT role FROM public.app_users WHERE id = user_id;
$$;

CREATE OR REPLACE FUNCTION public.sp_inserer_membre(
  p_prenoms character varying, 
  p_nom_famille character varying, 
  p_date_naissance date, 
  p_email character varying, 
  p_photo text, 
  p_matricule character, 
  p_ecole character varying, 
  p_filiere_egef character varying, 
  p_filiere_egad character varying, 
  p_ministere character varying, 
  p_lieu_exercice character varying, 
  p_emploi character varying, 
  p_region character varying, 
  p_whatsapp character varying
)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
    v_member_id BIGINT;
BEGIN
    INSERT INTO members (
        prenoms, nom_famille, date_naissance, email, photo, matricule,
        ecole, filiere_egef, filiere_egad, ministere, lieu_exercice,
        emploi_fonction_publique, region, whatsapp
    ) VALUES (
        p_prenoms, p_nom_famille, p_date_naissance, p_email, p_photo, p_matricule,
        p_ecole, p_filiere_egef, p_filiere_egad, p_ministere, p_lieu_exercice,
        p_emploi, p_region, p_whatsapp
    ) RETURNING id INTO v_member_id;
    
    RETURN v_member_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_activity_status()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  IF NEW.date < CURRENT_DATE THEN
    NEW.status = 'Terminé';
  ELSE
    NEW.status = 'À venir';
  END IF;
  RETURN NEW;
END;
$$;