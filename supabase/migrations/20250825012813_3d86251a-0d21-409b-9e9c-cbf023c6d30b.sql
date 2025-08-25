-- Créer une fonction sécurisée pour supprimer les annonces de carrière
CREATE OR REPLACE FUNCTION public.delete_career_announcement_secure(announcement_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  current_user_role user_role;
  announcement_creator uuid;
  deleted_count integer;
BEGIN
  -- Obtenir le rôle de l'utilisateur actuel
  SELECT role INTO current_user_role
  FROM app_users 
  WHERE id = auth.uid();
  
  -- Vérifier si l'utilisateur est connecté
  IF auth.uid() IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Utilisateur non authentifié');
  END IF;
  
  -- Obtenir le créateur de l'annonce
  SELECT created_by INTO announcement_creator
  FROM career_announcements 
  WHERE id = announcement_id;
  
  -- Vérifier si l'annonce existe
  IF announcement_creator IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Annonce non trouvée');
  END IF;
  
  -- Vérifier les permissions :
  -- 1. Admins et rédacteurs peuvent supprimer toutes les annonces
  -- 2. L'utilisateur peut supprimer ses propres annonces
  IF NOT (
    current_user_role IN ('admin_principal', 'admin_secondaire', 'redacteur') OR
    auth.uid() = announcement_creator
  ) THEN
    RETURN jsonb_build_object('success', false, 'error', 'Permissions insuffisantes');
  END IF;
  
  -- Supprimer l'annonce
  DELETE FROM career_announcements 
  WHERE id = announcement_id;
  
  -- Vérifier le nombre de lignes supprimées
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  
  IF deleted_count = 0 THEN
    RETURN jsonb_build_object('success', false, 'error', 'Aucune annonce supprimée');
  END IF;
  
  -- Logger l'événement de sécurité
  PERFORM public.log_security_event(
    'career_announcement_deleted',
    auth.uid(),
    jsonb_build_object(
      'announcement_id', announcement_id,
      'user_role', current_user_role,
      'deleted_count', deleted_count
    )
  );
  
  RETURN jsonb_build_object(
    'success', true, 
    'message', 'Annonce supprimée avec succès',
    'deleted_count', deleted_count
  );
END;
$function$;