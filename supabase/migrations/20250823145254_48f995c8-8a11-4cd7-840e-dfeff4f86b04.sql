-- Corriger la fonction get_contact_messages avec un tri correct
DROP FUNCTION IF EXISTS public.get_contact_messages();

CREATE OR REPLACE FUNCTION public.get_contact_messages()
 RETURNS TABLE(id uuid, name text, email text, phone text, subject text, message text, status text, created_at timestamp with time zone, updated_at timestamp with time zone, processed_at timestamp with time zone, processed_by uuid, ip_address inet, user_agent text, statut text)
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
    contacts.status,
    contacts.created_at,
    contacts.updated_at,
    contacts.processed_at,
    contacts.processed_by,
    contacts.ip_address,
    contacts.user_agent,
    COALESCE(contacts.statut, 'nouveau') as statut
  FROM public.contacts
  ORDER BY 
    -- Messages non gérés en premier (priorité 0), messages gérés ensuite (priorité 1)
    CASE WHEN COALESCE(contacts.statut, 'nouveau') = 'géré' THEN 1 ELSE 0 END ASC,
    -- Puis par date de création décroissante
    contacts.created_at DESC;
END;
$function$;