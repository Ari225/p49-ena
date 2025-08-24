-- Créer une fonction sécurisée pour vérifier si l'utilisateur peut gérer les suggestions
CREATE OR REPLACE FUNCTION public.can_manage_suggestions()
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal', 'admin_secondaire', 'redacteur')
  );
END;
$$;

-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Editors and admins can view all suggestions" ON public.suggestions;
DROP POLICY IF EXISTS "Editors and admins can update suggestions" ON public.suggestions;

-- Créer les nouvelles politiques avec la fonction sécurisée
CREATE POLICY "Managers can view suggestions" 
ON public.suggestions 
FOR SELECT 
USING (public.can_manage_suggestions());

CREATE POLICY "Managers can update suggestions" 
ON public.suggestions 
FOR UPDATE 
USING (public.can_manage_suggestions());