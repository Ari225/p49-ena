-- Corriger la fonction create_testimonial_with_verification pour utiliser les bons noms de colonnes et récupérer l'image du membre
CREATE OR REPLACE FUNCTION public.create_testimonial_with_verification(p_matricule text, p_content text, p_image_url text DEFAULT NULL::text)
 RETURNS TABLE(success boolean, message text, testimonial_id uuid)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_member_record RECORD;
  v_testimonial_id UUID;
  v_final_image_url TEXT;
BEGIN
  -- Vérifier si le matricule existe et récupérer les informations du membre
  SELECT id, "Prénoms", "Nom de famille", "Emploi fonction publique", "Photo"
  INTO v_member_record
  FROM public.members 
  WHERE "Matricule" = p_matricule;
  
  IF NOT FOUND THEN
    RETURN QUERY SELECT false, 'Matricule non trouvé', NULL::UUID;
    RETURN;
  END IF;
  
  -- Si aucune image fournie, utiliser la photo du membre
  IF p_image_url IS NULL OR p_image_url = '' THEN
    v_final_image_url := v_member_record."Photo";
  ELSE
    v_final_image_url := p_image_url;
  END IF;
  
  -- Créer le témoignage
  INSERT INTO public.testimonials (
    member_id,
    member_name,
    member_position,
    content,
    image_url
  ) VALUES (
    v_member_record.id,
    CONCAT(v_member_record."Prénoms", ' ', v_member_record."Nom de famille"),
    COALESCE(v_member_record."Emploi fonction publique", 'Membre P49'),
    p_content,
    v_final_image_url
  ) RETURNING id INTO v_testimonial_id;
  
  -- Logger l'événement
  PERFORM public.log_security_event(
    'testimonial_created',
    auth.uid(),
    jsonb_build_object(
      'member_id', v_member_record.id,
      'testimonial_id', v_testimonial_id
    )
  );
  
  RETURN QUERY SELECT true, 'Témoignage créé avec succès', v_testimonial_id;
END;
$function$;