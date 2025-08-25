-- Corriger la fonction sécurisée pour supprimer les communiqués
CREATE OR REPLACE FUNCTION delete_communique_secure(communique_id UUID)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
    result_message TEXT;
    current_user_id UUID;
    current_user_role user_role;
    communique_creator UUID;
BEGIN
    -- Récupérer l'ID de l'utilisateur connecté
    current_user_id := auth.uid();
    
    -- Vérifier si l'utilisateur est connecté
    IF current_user_id IS NULL THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', 'Utilisateur non authentifié'
        );
    END IF;
    
    -- Récupérer le rôle de l'utilisateur depuis app_users
    SELECT role INTO current_user_role
    FROM app_users 
    WHERE id = current_user_id;
    
    -- Récupérer le créateur du communiqué
    SELECT created_by INTO communique_creator
    FROM communiques 
    WHERE id = communique_id;
    
    -- Vérifier si le communiqué existe
    IF communique_creator IS NULL THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', 'Communiqué non trouvé'
        );
    END IF;
    
    -- Vérifier les permissions
    IF current_user_role NOT IN ('admin_principal', 'admin_secondaire') AND current_user_id != communique_creator THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', 'Permissions insuffisantes pour supprimer ce communiqué'
        );
    END IF;
    
    -- Supprimer le communiqué
    DELETE FROM communiques WHERE id = communique_id;
    
    -- Vérifier si la suppression a réussi
    IF NOT FOUND THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', 'Échec de la suppression du communiqué'
        );
    END IF;
    
    RETURN jsonb_build_object(
        'success', true,
        'message', 'Communiqué supprimé avec succès'
    );
END;
$$;