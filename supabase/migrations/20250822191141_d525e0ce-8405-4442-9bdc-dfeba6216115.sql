-- Correction de la politique RLS pour les admins sur blog_articles
DROP POLICY IF EXISTS "Admins can manage all articles" ON blog_articles;

CREATE POLICY "Admins can manage all articles" ON blog_articles
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM app_users 
    WHERE app_users.id = auth.uid() 
    AND app_users.role IN ('admin_principal', 'admin_secondaire')
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM app_users 
    WHERE app_users.id = auth.uid() 
    AND app_users.role IN ('admin_principal', 'admin_secondaire')
  )
);