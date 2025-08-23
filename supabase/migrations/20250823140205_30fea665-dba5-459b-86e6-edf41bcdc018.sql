-- Créer une fonction sécurisée pour récupérer les messages de contact
CREATE OR REPLACE FUNCTION public.get_contact_messages()
RETURNS TABLE(
  id uuid,
  name text,
  email text,
  phone text,
  subject text,
  message text,
  status text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  processed_at timestamp with time zone,
  processed_by uuid,
  ip_address inet,
  user_agent text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Vérifier que l'utilisateur est admin en utilisant le système d'auth personnalisé
  IF NOT EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal'::user_role, 'admin_secondaire'::user_role)
  ) THEN
    RAISE EXCEPTION 'Accès refusé: privilèges administrateur requis';
  END IF;

  -- Logger l'accès aux messages de contact
  PERFORM public.log_security_event(
    'contact_messages_accessed',
    auth.uid(),
    jsonb_build_object('access_type', 'admin_dashboard')
  );

  RETURN QUERY
  SELECT 
    c.id,
    c.name,
    c.email,
    c.phone,
    c.subject,
    c.message,
    c.status,
    c.created_at,
    c.updated_at,
    c.processed_at,
    c.processed_by,
    c.ip_address,
    c.user_agent
  FROM public.contacts c
  ORDER BY c.created_at DESC;
END;
$function$;