-- Créer une fonction qui utilise exactement les noms de colonnes réels de la base
CREATE OR REPLACE FUNCTION update_member_info(
  p_member_id BIGINT,
  p_update_data JSONB
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  current_user_id UUID;
  col_name TEXT;
  col_value TEXT;
BEGIN
  -- Obtenir l'ID de l'utilisateur authentifié
  current_user_id := auth.uid();
  
  -- Vérifier que l'utilisateur est authentifié
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Non autorisé: utilisateur non authentifié';
  END IF;

  -- Mettre à jour colonne par colonne avec les VRAIS noms de colonnes
  FOR col_name, col_value IN SELECT * FROM jsonb_each_text(p_update_data)
  LOOP
    CASE col_name
      WHEN 'Prénoms' THEN
        UPDATE members SET "Pr�noms" = col_value WHERE id = p_member_id;
      WHEN 'Nom de famille' THEN
        UPDATE members SET "Nom de famille" = col_value WHERE id = p_member_id;
      WHEN 'Date de naissance' THEN
        UPDATE members SET "Date de naissance" = col_value WHERE id = p_member_id;
      WHEN 'Email' THEN
        UPDATE members SET "Email" = col_value WHERE id = p_member_id;
      WHEN 'Photo' THEN
        UPDATE members SET "Photo" = col_value WHERE id = p_member_id;
      WHEN 'Ecole' THEN
        UPDATE members SET "Ecole" = col_value WHERE id = p_member_id;
      WHEN 'Filière_EGEF' THEN
        UPDATE members SET "Fili�re_EGEF" = col_value WHERE id = p_member_id;
      WHEN 'Filière_EGAD' THEN
        UPDATE members SET "Fili�re_EGAD" = col_value WHERE id = p_member_id;
      WHEN 'Ministère' THEN
        UPDATE members SET "Minist�re" = col_value WHERE id = p_member_id;
      WHEN 'Lieu d''exercice' THEN
        UPDATE members SET "Lieu d'exercice" = col_value WHERE id = p_member_id;
      WHEN 'Emploi fonction publique' THEN
        UPDATE members SET "Emploi fonction publique" = col_value WHERE id = p_member_id;
      WHEN 'Région' THEN
        UPDATE members SET "R�gion" = col_value WHERE id = p_member_id;
      WHEN 'WhatsApp' THEN
        UPDATE members SET "WhatsApp" = col_value::BIGINT WHERE id = p_member_id;
      WHEN 'Facebook' THEN
        UPDATE members SET "Facebook" = col_value WHERE id = p_member_id;
      WHEN 'instagram' THEN
        UPDATE members SET "instagram" = col_value WHERE id = p_member_id;
      WHEN 'linkedIn' THEN
        UPDATE members SET "linkedIn" = col_value WHERE id = p_member_id;
    END CASE;
  END LOOP;
  
  RETURN TRUE;
END;
$$;