-- Supprimer les anciennes politiques RLS qui utilisent auth.uid()
DROP POLICY IF EXISTS "Anyone can view media items" ON public.media_items;
DROP POLICY IF EXISTS "Authenticated users can create media items" ON public.media_items;
DROP POLICY IF EXISTS "Authenticated users can update media items" ON public.media_items;
DROP POLICY IF EXISTS "Authenticated users can delete media items" ON public.media_items;

-- Créer de nouvelles politiques RLS adaptées à notre système personnalisé
CREATE POLICY "Anyone can view media items" ON public.media_items
FOR SELECT
USING (true);

CREATE POLICY "Anyone can create media items" ON public.media_items
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update media items" ON public.media_items
FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete media items" ON public.media_items
FOR DELETE
USING (true);