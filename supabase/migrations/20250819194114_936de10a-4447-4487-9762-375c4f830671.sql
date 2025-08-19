-- Créer la table testimonials pour enregistrer les témoignages
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id BIGINT NOT NULL,
  member_name TEXT NOT NULL,
  member_position TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Activer RLS sur la table testimonials
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre à tout le monde de voir les témoignages actifs
CREATE POLICY "Public can view active testimonials" 
ON public.testimonials 
FOR SELECT 
USING (is_active = true);

-- Politique pour permettre aux utilisateurs authentifiés d'insérer des témoignages
CREATE POLICY "Authenticated users can insert testimonials" 
ON public.testimonials 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Politique pour permettre aux admins de gérer tous les témoignages
CREATE POLICY "Admins can manage all testimonials" 
ON public.testimonials 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.app_users 
  WHERE id = auth.uid() 
  AND role IN ('admin_principal', 'admin_secondaire')
));

-- Ajouter un trigger pour mettre à jour updated_at
CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Fonction pour vérifier le matricule et créer un témoignage
CREATE OR REPLACE FUNCTION public.create_testimonial_with_verification(
  p_matricule TEXT,
  p_content TEXT,
  p_image_url TEXT DEFAULT NULL
)
RETURNS TABLE(success BOOLEAN, message TEXT, testimonial_id UUID)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_member_record RECORD;
  v_testimonial_id UUID;
BEGIN
  -- Vérifier si le matricule existe
  SELECT id, "Prénoms", "Nom de famille", "Emploi fonction publique"
  INTO v_member_record
  FROM public.members 
  WHERE "Matricule" = p_matricule;
  
  IF NOT FOUND THEN
    RETURN QUERY SELECT false, 'Matricule non trouvé', NULL::UUID;
    RETURN;
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
    p_image_url
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