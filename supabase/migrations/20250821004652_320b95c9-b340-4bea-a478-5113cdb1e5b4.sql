-- Supprimer les politiques actuelles
DROP POLICY IF EXISTS "Allow admins to update all activities" ON public.activities;
DROP POLICY IF EXISTS "Allow admins to delete all activities" ON public.activities;

-- Créer des politiques temporaires plus permissives pour les administrateurs
-- Permettre à tous les utilisateurs authentifiés d'UPDATE les activités (temporaire)
CREATE POLICY "Temp allow authenticated users to update activities" 
ON public.activities 
FOR UPDATE 
USING (true)  -- Politique temporaire très permissive
WITH CHECK (true);

-- Permettre à tous les utilisateurs authentifiés de DELETE les activités (temporaire)
CREATE POLICY "Temp allow authenticated users to delete activities" 
ON public.activities 
FOR DELETE 
USING (true);  -- Politique temporaire très permissive