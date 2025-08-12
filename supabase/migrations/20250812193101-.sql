-- Fix storage policies for media-files bucket
-- Drop existing policies that use auth.uid()
DROP POLICY IF EXISTS "Authenticated users can delete their media files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update their media files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload media files" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete images" ON storage.objects;
DROP POLICY IF EXISTS "Users can update images" ON storage.objects;

-- Create new policies that allow public access for media-files bucket
CREATE POLICY "Anyone can upload to media-files" ON storage.objects
FOR INSERT 
WITH CHECK (bucket_id = 'media-files');

CREATE POLICY "Anyone can update media-files" ON storage.objects
FOR UPDATE 
USING (bucket_id = 'media-files');

CREATE POLICY "Anyone can delete from media-files" ON storage.objects
FOR DELETE 
USING (bucket_id = 'media-files');