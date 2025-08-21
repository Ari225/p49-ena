-- Créer une fonction publique pour afficher l'équipe éditoriale
CREATE OR REPLACE FUNCTION public.get_editorial_team()
 RETURNS TABLE(id uuid, username text, first_name text, last_name text, email text, role user_role, created_at timestamp with time zone, image_url text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Retourner les utilisateurs qui font partie de l'équipe éditoriale (admins + rédacteurs)
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
  WHERE u.role IN ('admin_principal', 'admin_secondaire', 'redacteur')
  ORDER BY 
    CASE u.role 
      WHEN 'admin_principal' THEN 1
      WHEN 'admin_secondaire' THEN 2 
      WHEN 'redacteur' THEN 3
    END,
    u.created_at ASC;
END;
$function$