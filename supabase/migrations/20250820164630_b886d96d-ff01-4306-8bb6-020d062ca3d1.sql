-- Créer une fonction sécurisée pour modifier un témoignage
CREATE OR REPLACE FUNCTION public.update_testimonial_secure(testimonial_id uuid, new_content text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Vérifier que l'utilisateur est admin
  IF NOT EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal'::user_role, 'admin_secondaire'::user_role)
  ) THEN
    RAISE EXCEPTION 'Accès refusé: privilèges administrateur requis';
  END IF;

  -- Mettre à jour le témoignage
  UPDATE public.testimonials 
  SET 
    content = new_content,
    updated_at = now()
  WHERE id = testimonial_id;

  -- Vérifier que la mise à jour a été effectuée
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Témoignage non trouvé';
  END IF;

  -- Logger l'événement
  PERFORM public.log_security_event(
    'testimonial_updated',
    auth.uid(),
    jsonb_build_object('testimonial_id', testimonial_id)
  );

  RETURN true;
END;
$$;

-- Créer une fonction sécurisée pour supprimer un témoignage
CREATE OR REPLACE FUNCTION public.delete_testimonial_secure(testimonial_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Vérifier que l'utilisateur est admin
  IF NOT EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal'::user_role, 'admin_secondaire'::user_role)
  ) THEN
    RAISE EXCEPTION 'Accès refusé: privilèges administrateur requis';
  END IF;

  -- Supprimer le témoignage
  DELETE FROM public.testimonials 
  WHERE id = testimonial_id;

  -- Vérifier que la suppression a été effectuée
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Témoignage non trouvé';
  END IF;

  -- Logger l'événement
  PERFORM public.log_security_event(
    'testimonial_deleted',
    auth.uid(),
    jsonb_build_object('testimonial_id', testimonial_id)
  );

  RETURN true;
END;
$$;