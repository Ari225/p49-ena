-- Create storage policies for journal-pdfs bucket
CREATE POLICY "Anyone can view journal PDFs"
ON storage.objects
FOR SELECT
USING (bucket_id = 'journal-pdfs');

CREATE POLICY "Authenticated users can upload journal PDFs"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'journal-pdfs' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own journal PDFs"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'journal-pdfs' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete their own journal PDFs"
ON storage.objects
FOR DELETE
USING (bucket_id = 'journal-pdfs' AND auth.uid() IS NOT NULL);