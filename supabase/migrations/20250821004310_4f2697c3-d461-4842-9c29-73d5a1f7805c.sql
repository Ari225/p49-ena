-- Supprimer les anciennes politiques restrictives pour UPDATE et DELETE
DROP POLICY IF EXISTS "Allow creators to update their activities" ON public.activities;
DROP POLICY IF EXISTS "Allow creators to delete their activities" ON public.activities;

-- Créer de nouvelles politiques qui permettent aux admins de gérer toutes les activités
-- et aux créateurs de gérer leurs propres activités

-- Politique UPDATE : Admins peuvent tout modifier OU créateurs peuvent modifier leurs activités
CREATE POLICY "Admins and creators can update activities" 
ON public.activities 
FOR UPDATE 
USING (
  -- Vérifier si l'utilisateur est admin via la table app_users
  EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal', 'admin_secondaire')
  )
  OR 
  -- OU si c'est le créateur de l'activité
  (created_by = auth.uid())
);

-- Politique DELETE : Admins peuvent tout supprimer OU créateurs peuvent supprimer leurs activités
CREATE POLICY "Admins and creators can delete activities" 
ON public.activities 
FOR DELETE 
USING (
  -- Vérifier si l'utilisateur est admin via la table app_users
  EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal', 'admin_secondaire')
  )
  OR 
  -- OU si c'est le créateur de l'activité
  (created_by = auth.uid())
);