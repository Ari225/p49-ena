-- Supprimer toutes les politiques existantes pour popups
DROP POLICY IF EXISTS "Admins can view all popups" ON public.popups;
DROP POLICY IF EXISTS "Admins can create popups" ON public.popups;
DROP POLICY IF EXISTS "Admins can update popups" ON public.popups;
DROP POLICY IF EXISTS "Admins can delete popups" ON public.popups;
DROP POLICY IF EXISTS "Everyone can view active popups" ON public.popups;
DROP POLICY IF EXISTS "Authenticated users can insert popups" ON public.popups;
DROP POLICY IF EXISTS "Users can update their own popups" ON public.popups;
DROP POLICY IF EXISTS "Public can view active popups" ON public.popups;

-- Créer des politiques plus permissives pour le système d'authentification personnalisé
-- Les admins peuvent tout faire
CREATE POLICY "Allow admin operations" 
ON public.popups 
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE public.app_users.id = created_by
    AND public.app_users.role IN ('admin_principal', 'admin_secondaire')
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE public.app_users.id = created_by
    AND public.app_users.role IN ('admin_principal', 'admin_secondaire')
  )
);

-- Les utilisateurs authentifiés peuvent insérer des popups
CREATE POLICY "Allow authenticated insert" 
ON public.popups 
FOR INSERT 
WITH CHECK (
  created_by IS NOT NULL 
  AND EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE public.app_users.id = created_by
  )
);

-- Lecture publique des popups actifs
CREATE POLICY "Public read active popups" 
ON public.popups 
FOR SELECT 
USING (is_active = true OR created_by IS NOT NULL);