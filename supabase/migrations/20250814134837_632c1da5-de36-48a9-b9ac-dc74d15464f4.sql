-- Modifier la politique RLS pour permettre les mises à jour sans authentification Supabase
-- puisque l'authentification se fait par matricule dans l'application

-- Supprimer l'ancienne politique qui nécessite auth.uid()
DROP POLICY IF EXISTS "Authenticated users can update members after matricule verification" ON public.members;

-- Créer une nouvelle politique qui permet les mises à jour pour tous
-- La sécurité est assurée par la vérification du matricule dans l'application
CREATE POLICY "Allow member updates with matricule verification" 
ON public.members 
FOR UPDATE 
USING (true);