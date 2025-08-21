-- Créer une politique temporaire qui permet aux admins d'accéder à toutes les activités
-- basée sur une fonction qui utilise l'ID de session au lieu de auth.uid()

-- D'abord, supprimer les anciennes politiques
DROP POLICY IF EXISTS "Admins and creators can update activities" ON public.activities;
DROP POLICY IF EXISTS "Admins and creators can delete activities" ON public.activities;

-- Créer une politique UPDATE plus permissive pour les administrateurs
CREATE POLICY "Allow admins to update all activities" 
ON public.activities 
FOR UPDATE 
USING (
  -- Permettre la modification si l'utilisateur existe dans app_users avec un rôle admin
  EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE role IN ('admin_principal', 'admin_secondaire')
    AND id = ANY (
      SELECT unnest(string_to_array(current_setting('app.current_user_id', true), ','))::uuid
    )
  )
  OR 
  -- OU si c'est le créateur de l'activité via auth.uid() (pour les cas où ça marche)
  created_by = auth.uid()
)
WITH CHECK (true);

-- Créer une politique DELETE plus permissive pour les administrateurs  
CREATE POLICY "Allow admins to delete all activities" 
ON public.activities 
FOR DELETE 
USING (
  -- Permettre la suppression si l'utilisateur existe dans app_users avec un rôle admin
  EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE role IN ('admin_principal', 'admin_secondaire')
    AND id = ANY (
      SELECT unnest(string_to_array(current_setting('app.current_user_id', true), ','))::uuid
    )
  )
  OR 
  -- OU si c'est le créateur de l'activité via auth.uid() (pour les cas où ça marche)
  created_by = auth.uid()
);