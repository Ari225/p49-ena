-- Créer une politique RLS pour permettre la lecture publique de la table instances_dir
CREATE POLICY "Public can view instances_dir" 
ON public.instances_dir 
FOR SELECT 
USING (true);