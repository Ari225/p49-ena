-- Corriger les politiques RLS pour la table contacts
-- D'abord supprimer les politiques existantes qui pourraient poser problème
DROP POLICY IF EXISTS "Admins peuvent supprimer les contacts" ON public.contacts;

-- Créer la politique de suppression pour les admins
CREATE POLICY "Admins peuvent supprimer les contacts" 
ON public.contacts 
FOR DELETE 
USING (EXISTS ( 
  SELECT 1 FROM app_users 
  WHERE app_users.id = auth.uid() 
  AND app_users.role IN ('admin_principal'::user_role, 'admin_secondaire'::user_role)
));