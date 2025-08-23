-- Ajouter la politique manquante pour que les admins puissent supprimer des contacts
CREATE POLICY IF NOT EXISTS "Admins peuvent supprimer les contacts" 
ON public.contacts 
FOR DELETE 
USING (EXISTS ( 
  SELECT 1 FROM app_users 
  WHERE app_users.id = auth.uid() 
  AND app_users.role IN ('admin_principal'::user_role, 'admin_secondaire'::user_role)
));