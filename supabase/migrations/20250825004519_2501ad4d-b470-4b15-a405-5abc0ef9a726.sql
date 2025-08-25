-- Créer un bucket pour les images des échos des régions
INSERT INTO storage.buckets (id, name, public) 
VALUES ('echo-regions', 'echo-regions', true)
ON CONFLICT (id) DO NOTHING;

-- Créer les politiques pour le bucket echo-regions
CREATE POLICY "Public can view echo-regions images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'echo-regions');

CREATE POLICY "Authenticated users can upload echo-regions images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'echo-regions' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update echo-regions images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'echo-regions' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete echo-regions images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'echo-regions' AND auth.uid() IS NOT NULL);