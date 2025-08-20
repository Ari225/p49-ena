-- Add policy to allow authenticated users to insert journal editions with created_by
CREATE POLICY "Authenticated users can create journal editions"
ON public.journal_editions
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid());