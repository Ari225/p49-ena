-- Create a bucket specifically for journal PDFs if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('journal-pdfs', 'journal-pdfs', true, 52428800, ARRAY['application/pdf'])
ON CONFLICT (id) DO UPDATE SET
  allowed_mime_types = ARRAY['application/pdf'],
  file_size_limit = 52428800;

-- Ensure media-files bucket supports PDFs too
UPDATE storage.buckets 
SET allowed_mime_types = ARRAY['image/*', 'application/pdf']
WHERE id = 'media-files';