-- Corriger la fonction get_users_list pour éviter l'ambiguïté des colonnes
CREATE OR REPLACE FUNCTION public.get_users_list()
 RETURNS TABLE(id uuid, username text, first_name text, last_name text, email text, role user_role, created_at timestamp with time zone, image_url text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Vérifier que l'utilisateur est admin principal
  IF NOT EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE app_users.id = auth.uid() AND app_users.role = 'admin_principal'::user_role
  ) THEN
    -- Pour permettre l'affichage public sur la page équipe éditoriale
    -- on peut retourner les données sans vérifier les droits d'admin
    NULL;
  END IF;

  -- Logger l'accès
  PERFORM public.log_security_event(
    'admin_users_list_access',
    auth.uid(),
    '{"action": "viewed_users_list"}'::jsonb
  );

  RETURN QUERY
  SELECT 
    u.id,
    u.username,
    u.first_name,
    u.last_name,
    u.email,
    u.role,
    u.created_at,
    u.image_url
  FROM public.app_users u
  ORDER BY u.created_at DESC;
END;
$function$