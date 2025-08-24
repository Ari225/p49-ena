-- Mettre à jour la politique RLS pour permettre aux rédacteurs de voir les suggestions
DROP POLICY IF EXISTS "Admins can view all suggestions" ON public.suggestions;

CREATE POLICY "Editors and admins can view all suggestions" 
ON public.suggestions 
FOR SELECT 
USING (EXISTS ( 
  SELECT 1 FROM app_users 
  WHERE app_users.id = auth.uid() 
  AND app_users.role IN ('admin_principal', 'admin_secondaire', 'redacteur')
));

-- Mettre à jour aussi la politique de mise à jour pour les rédacteurs
DROP POLICY IF EXISTS "Admins can update suggestions" ON public.suggestions;

CREATE POLICY "Editors and admins can update suggestions" 
ON public.suggestions 
FOR UPDATE 
USING (EXISTS ( 
  SELECT 1 FROM app_users 
  WHERE app_users.id = auth.uid() 
  AND app_users.role IN ('admin_principal', 'admin_secondaire', 'redacteur')
));