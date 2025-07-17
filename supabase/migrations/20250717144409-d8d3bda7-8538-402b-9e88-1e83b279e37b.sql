-- Vérifier les politiques RLS sur app_users et permettre la lecture publique pour l'authentification
-- Ajouter une politique pour permettre la lecture des utilisateurs lors de la connexion

CREATE POLICY "Allow public read for authentication" 
ON public.app_users 
FOR SELECT 
USING (true);