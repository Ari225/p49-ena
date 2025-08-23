-- Créer une fonction pour permettre aux membres non connectés de modifier leurs informations avec vérification par matricule
CREATE OR REPLACE FUNCTION public.update_member_info_with_matricule(
  p_matricule text,
  p_update_data jsonb
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  target_member_id bigint;
  col_name TEXT;
  col_value TEXT;
BEGIN
  -- Vérifier que le matricule existe
  SELECT id INTO target_member_id
  FROM public.members 
  WHERE "Matricule" = p_matricule;
  
  IF target_member_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Matricule non trouvé');
  END IF;

  -- Mettre à jour colonne par colonne avec les VRAIS noms de colonnes
  FOR col_name, col_value IN SELECT * FROM jsonb_each_text(p_update_data)
  LOOP
    CASE col_name
      WHEN 'Prénoms' THEN
        UPDATE members SET "Pr�noms" = col_value WHERE id = target_member_id;
      WHEN 'Nom de famille' THEN
        UPDATE members SET "Nom de famille" = col_value WHERE id = target_member_id;
      WHEN 'Date de naissance' THEN
        UPDATE members SET "Date de naissance" = col_value WHERE id = target_member_id;
      WHEN 'Email' THEN
        UPDATE members SET "Email" = col_value WHERE id = target_member_id;
      WHEN 'Photo' THEN
        UPDATE members SET "Photo" = col_value WHERE id = target_member_id;
      WHEN 'Ecole' THEN
        UPDATE members SET "Ecole" = col_value WHERE id = target_member_id;
      WHEN 'Filière_EGEF' THEN
        UPDATE members SET "Fili�re_EGEF" = col_value WHERE id = target_member_id;
      WHEN 'Filière_EGAD' THEN
        UPDATE members SET "Fili�re_EGAD" = col_value WHERE id = target_member_id;
      WHEN 'Ministère' THEN
        UPDATE members SET "Minist�re" = col_value WHERE id = target_member_id;
      WHEN 'Lieu d''exercice' THEN
        UPDATE members SET "Lieu d'exercice" = col_value WHERE id = target_member_id;
      WHEN 'Emploi fonction publique' THEN
        UPDATE members SET "Emploi fonction publique" = col_value WHERE id = target_member_id;
      WHEN 'Région' THEN
        UPDATE members SET "R�gion" = col_value WHERE id = target_member_id;
      WHEN 'WhatsApp' THEN
        UPDATE members SET "WhatsApp" = col_value::BIGINT WHERE id = target_member_id;
      WHEN 'Facebook' THEN
        UPDATE members SET "Facebook" = col_value WHERE id = target_member_id;
      WHEN 'instagram' THEN
        UPDATE members SET "instagram" = col_value WHERE id = target_member_id;
      WHEN 'linkedIn' THEN
        UPDATE members SET "linkedIn" = col_value WHERE id = target_member_id;
    END CASE;
  END LOOP;

  -- Logger l'événement de sécurité
  PERFORM public.log_security_event(
    'member_data_updated_with_matricule',
    NULL, -- pas d'utilisateur connecté
    jsonb_build_object(
      'matricule_used', left(p_matricule, 2) || '***',
      'member_id', target_member_id,
      'updated_fields', (SELECT array_agg(key) FROM jsonb_each_text(p_update_data))
    )
  );
  
  RETURN jsonb_build_object('success', true, 'message', 'Informations mises à jour avec succès');
END;
$$;