-- Corriger la fonction avec les vrais noms de colonnes encodés comme dans get_member_details
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
BEGIN
  -- Obtenir l'ID de l'utilisateur authentifié
  current_user_id := auth.uid();
  
  -- Vérifier que l'utilisateur est authentifié
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Non autorisé: utilisateur non authentifié';
  END IF;

  -- Mettre à jour les informations du membre avec les vrais noms de colonnes encodés
  UPDATE members 
  SET 
    "Prénoms" = COALESCE((p_update_data->>'Prénoms'), "Prénoms"),
    "Nom de famille" = COALESCE((p_update_data->>'Nom de famille'), "Nom de famille"),
    "Date de naissance" = COALESCE((p_update_data->>'Date de naissance'), "Date de naissance"),
    "Email" = COALESCE((p_update_data->>'Email'), "Email"),
    "Photo" = COALESCE((p_update_data->>'Photo'), "Photo"),
    "Ecole" = COALESCE((p_update_data->>'Ecole'), "Ecole"),
    "Filière_EGEF" = COALESCE((p_update_data->>'Filière_EGEF'), "Filière_EGEF"),
    "Filière_EGAD" = COALESCE((p_update_data->>'Filière_EGAD'), "Filière_EGAD"),
    "Ministère" = COALESCE((p_update_data->>'Ministère'), "Ministère"),
    "Lieu d'exercice" = COALESCE((p_update_data->>'Lieu d''exercice'), "Lieu d'exercice"),
    "Emploi fonction publique" = COALESCE((p_update_data->>'Emploi fonction publique'), "Emploi fonction publique"),
    "Région" = COALESCE((p_update_data->>'Région'), "Région"),
    "WhatsApp" = COALESCE((p_update_data->>'WhatsApp')::BIGINT, "WhatsApp"),
    "Facebook" = COALESCE((p_update_data->>'Facebook'), "Facebook"),
    "instagram" = COALESCE((p_update_data->>'instagram'), "instagram"),
    "linkedIn" = COALESCE((p_update_data->>'linkedIn'), "linkedIn")
  WHERE id = p_member_id;
  
  -- Vérifier si la mise à jour a eu lieu
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Membre non trouvé avec l''ID: %', p_member_id;
  END IF;
  
  RETURN TRUE;
END;
$$;