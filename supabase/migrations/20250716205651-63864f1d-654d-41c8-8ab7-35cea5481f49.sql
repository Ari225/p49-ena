
-- Create a storage bucket for media files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media-files',
  'media-files', 
  true,
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/quicktime', 'video/x-msvideo']
);

-- Create storage policies for the media-files bucket
CREATE POLICY "Public can view media files"
ON storage.objects FOR SELECT
USING (bucket_id = 'media-files');

CREATE POLICY "Authenticated users can upload media files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'media-files' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update their media files"
ON storage.objects FOR UPDATE
USING (bucket_id = 'media-files' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete their media files"
ON storage.objects FOR DELETE
USING (bucket_id = 'media-files' AND auth.uid() IS NOT NULL);
