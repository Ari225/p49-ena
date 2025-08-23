-- Corriger la fonction get_contact_messages pour utiliser la colonne 'status' au lieu de 'statut'
CREATE OR REPLACE FUNCTION public.get_contact_messages()
 RETURNS TABLE(id uuid, name text, email text, phone text, subject text, message text, status text, created_at timestamp with time zone, updated_at timestamp with time zone, processed_at timestamp with time zone, processed_by uuid, ip_address inet, user_agent text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Vérifier que l'utilisateur est admin en utilisant le système d'auth personnalisé
  IF NOT EXISTS (
    SELECT 1 FROM public.app_users au
    WHERE au.id = auth.uid() 
    AND au.role IN ('admin_principal'::user_role, 'admin_secondaire'::user_role)
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
    contacts.id,
    contacts.name,
    contacts.email,
    contacts.phone,
    contacts.subject,
    contacts.message,
    contacts.status,  -- Utiliser 'status' et non 'statut'
    contacts.created_at,
    contacts.updated_at,
    contacts.processed_at,
    contacts.processed_by,
    contacts.ip_address,
    contacts.user_agent
  FROM public.contacts
  ORDER BY 
    -- Messages non gérés en premier (priorité 0), messages gérés ensuite (priorité 1)
    CASE WHEN contacts.status = 'géré' THEN 1 ELSE 0 END ASC,  -- Utiliser 'status' et non 'statut'
    -- Puis par date de création décroissante
    contacts.created_at DESC;
END;
$function$;