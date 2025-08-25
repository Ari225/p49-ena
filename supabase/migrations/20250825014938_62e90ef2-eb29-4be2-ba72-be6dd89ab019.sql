-- Créer les buckets de stockage pour le journal s'ils n'existent pas déjà
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('journal-covers', 'journal-covers', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/webp']::text[]),
  ('journal-pdfs', 'journal-pdfs', true, 104857600, ARRAY['application/pdf']::text[])
ON CONFLICT (id) DO NOTHING;

-- Créer les politiques de sécurité pour les buckets journal
CREATE POLICY "Anyone can view journal covers" ON storage.objects
FOR SELECT USING (bucket_id = 'journal-covers');

CREATE POLICY "Authenticated users can upload journal covers" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'journal-covers' 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Authenticated users can update journal covers" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'journal-covers' 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Authenticated users can delete journal covers" ON storage.objects
FOR DELETE USING (
  bucket_id = 'journal-covers' 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Anyone can view journal PDFs" ON storage.objects
FOR SELECT USING (bucket_id = 'journal-pdfs');

CREATE POLICY "Authenticated users can upload journal PDFs" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'journal-pdfs' 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Authenticated users can update journal PDFs" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'journal-pdfs' 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Authenticated users can delete journal PDFs" ON storage.objects
FOR DELETE USING (
  bucket_id = 'journal-pdfs' 
  AND auth.uid() IS NOT NULL
);