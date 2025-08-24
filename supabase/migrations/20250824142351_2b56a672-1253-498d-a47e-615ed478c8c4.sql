-- Corriger la fonction pour avoir un search_path sécurisé
CREATE OR REPLACE FUNCTION public.update_career_announcement_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;