-- Créer la fonction pour mettre à jour les informations d'un membre de façon sécurisée
CREATE OR REPLACE FUNCTION update_member_info(
  member_id INTEGER,
  update_data JSONB
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
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

  -- Mettre à jour les informations du membre
  -- Extraire et mettre à jour chaque champ individuellement pour plus de sécurité
  UPDATE members 
  SET 
    "Prénoms" = COALESCE((update_data->>'Prénoms'), "Prénoms"),
    "Nom de famille" = COALESCE((update_data->>'Nom de famille'), "Nom de famille"),
    "Date de naissance" = COALESCE((update_data->>'Date de naissance'), "Date de naissance"),
    "Email" = COALESCE((update_data->>'Email'), "Email"),
    "Photo" = COALESCE((update_data->>'Photo'), "Photo"),
    "Ecole" = COALESCE((update_data->>'Ecole'), "Ecole"),
    "Filière_EGEF" = COALESCE((update_data->>'Filière_EGEF'), "Filière_EGEF"),
    "Filière_EGAD" = COALESCE((update_data->>'Filière_EGAD'), "Filière_EGAD"),
    "Ministère" = COALESCE((update_data->>'Ministère'), "Ministère"),
    "Lieu d'exercice" = COALESCE((update_data->>'Lieu d''exercice'), "Lieu d'exercice"),
    "Emploi fonction publique" = COALESCE((update_data->>'Emploi fonction publique'), "Emploi fonction publique"),
    "Région" = COALESCE((update_data->>'Région'), "Région"),
    "WhatsApp" = COALESCE((update_data->>'WhatsApp')::BIGINT, "WhatsApp"),
    "Facebook" = COALESCE((update_data->>'Facebook'), "Facebook"),
    "instagram" = COALESCE((update_data->>'instagram'), "instagram"),
    "linkedIn" = COALESCE((update_data->>'linkedIn'), "linkedIn")
  WHERE id = member_id;
  
  -- Vérifier si la mise à jour a eu lieu
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Membre non trouvé avec l''ID: %', member_id;
  END IF;
  
  RETURN TRUE;
END;
$$;