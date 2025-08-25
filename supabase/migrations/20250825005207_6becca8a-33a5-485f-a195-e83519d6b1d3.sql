-- Créer le bucket echo-regions s'il n'existe pas déjà
INSERT INTO storage.buckets (id, name, public) 
VALUES ('echo-regions', 'echo-regions', true)
ON CONFLICT (id) DO NOTHING;

-- Politiques pour le bucket echo-regions
-- Permettre à tous de voir les images
CREATE POLICY "Allow public viewing of echo-regions images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'echo-regions');

-- Permettre aux utilisateurs authentifiés d'uploader des images
CREATE POLICY "Allow authenticated users to upload echo-regions images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'echo-regions' 
  AND auth.uid() IS NOT NULL
);

-- Permettre aux utilisateurs authentifiés de mettre à jour leurs images
CREATE POLICY "Allow authenticated users to update echo-regions images" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'echo-regions' 
  AND auth.uid() IS NOT NULL
);

-- Permettre aux utilisateurs authentifiés de supprimer des images
CREATE POLICY "Allow authenticated users to delete echo-regions images" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'echo-regions' 
  AND auth.uid() IS NOT NULL
);