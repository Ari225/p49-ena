-- Supprimer toutes les politiques RLS existantes
DROP POLICY IF EXISTS "Allow admin operations" ON public.popups;
DROP POLICY IF EXISTS "Allow authenticated insert" ON public.popups;
DROP POLICY IF EXISTS "Public read active popups" ON public.popups;

-- Désactiver temporairement RLS pour permettre les opérations
ALTER TABLE public.popups DISABLE ROW LEVEL SECURITY;

-- Réactiver RLS
ALTER TABLE public.popups ENABLE ROW LEVEL SECURITY;

-- Créer des politiques plus simples pour le système d'authentification personnalisé
-- Permettre toutes les opérations aux administrateurs identifiés par created_by
CREATE POLICY "Allow admins all operations" 
ON public.popups 
FOR ALL
USING (
  created_by IS NOT NULL 
  AND EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE public.app_users.id = created_by
    AND public.app_users.role IN ('admin_principal', 'admin_secondaire')
  )
)
WITH CHECK (
  created_by IS NOT NULL 
  AND EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE public.app_users.id = created_by
    AND public.app_users.role IN ('admin_principal', 'admin_secondaire')
  )
);

-- Permettre la lecture publique des popups actifs
CREATE POLICY "Public can read active popups" 
ON public.popups 
FOR SELECT 
USING (is_active = true);