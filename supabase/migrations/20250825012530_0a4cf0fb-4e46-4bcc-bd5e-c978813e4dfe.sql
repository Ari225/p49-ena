-- Mettre à jour les politiques de suppression pour les annonces de carrière
-- Permettre aux admins ET aux rédacteurs de supprimer toutes les annonces

DROP POLICY IF EXISTS "Users can delete their own career announcements" ON career_announcements;
DROP POLICY IF EXISTS "Admins can manage all career announcements" ON career_announcements;

-- Nouvelle politique pour permettre aux admins et rédacteurs de supprimer toutes les annonces
CREATE POLICY "Admins and editors can delete all career announcements" 
ON career_announcements 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal', 'admin_secondaire', 'redacteur')
  )
);

-- Politique pour que les utilisateurs puissent supprimer leurs propres annonces
CREATE POLICY "Users can delete their own career announcements" 
ON career_announcements 
FOR DELETE 
USING (auth.uid() = created_by);

-- Mise à jour des autres politiques pour les admins et rédacteurs
CREATE POLICY "Admins and editors can manage all career announcements" 
ON career_announcements 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal', 'admin_secondaire', 'redacteur')
  )
) 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal', 'admin_secondaire', 'redacteur')
  )
);