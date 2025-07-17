-- Créer les politiques de storage pour permettre l'upload d'images de profil utilisateur

-- Politique pour permettre à tout utilisateur authentifié d'uploader des images
CREATE POLICY "Authenticated users can upload images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media-files');

-- Politique pour permettre à tout le monde de voir les images (car le bucket est public)
CREATE POLICY "Public can view images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'media-files');

-- Politique pour permettre aux utilisateurs de mettre à jour leurs propres images
CREATE POLICY "Users can update images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'media-files');

-- Politique pour permettre aux utilisateurs de supprimer leurs propres images
CREATE POLICY "Users can delete images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'media-files');