-- Corriger les politiques RLS pour media_items
-- La politique actuelle est trop restrictive et empêche les utilisateurs connectés d'insérer

-- Supprimer les politiques existantes qui posent problème
DROP POLICY IF EXISTS "LOCKED_MEDIA_AuthenticatedAccess" ON public.media_items;
DROP POLICY IF EXISTS "LOCKED_MEDIA_PublicView" ON public.media_items;

-- Créer de nouvelles politiques RLS plus appropriées
-- Permettre la lecture publique
CREATE POLICY "Public can view media items" 
ON public.media_items 
FOR SELECT 
USING (true);

-- Permettre aux utilisateurs authentifiés d'insérer leurs propres médias
CREATE POLICY "Authenticated users can insert media" 
ON public.media_items 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid());

-- Permettre aux créateurs de mettre à jour leurs médias
CREATE POLICY "Users can update their own media" 
ON public.media_items 
FOR UPDATE 
USING (auth.uid() = created_by)
WITH CHECK (auth.uid() = created_by);

-- Permettre aux créateurs de supprimer leurs médias
CREATE POLICY "Users can delete their own media" 
ON public.media_items 
FOR DELETE 
USING (auth.uid() = created_by);

-- Permettre aux admins de tout gérer
CREATE POLICY "Admins can manage all media" 
ON public.media_items 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.app_users 
  WHERE id = auth.uid() 
  AND role IN ('admin_principal', 'admin_secondaire')
));