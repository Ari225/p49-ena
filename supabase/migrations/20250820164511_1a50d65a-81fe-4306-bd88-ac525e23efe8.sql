-- Activer RLS sur la table testimonials si ce n'est pas déjà fait
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Vérifier et corriger les politiques pour permettre la modification et suppression par les admins
DROP POLICY IF EXISTS "Admins can manage all testimonials" ON public.testimonials;

-- Recréer la politique admin avec des permissions explicites
CREATE POLICY "Admins can manage all testimonials" 
ON public.testimonials 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal'::user_role, 'admin_secondaire'::user_role)
  )
) 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal'::user_role, 'admin_secondaire'::user_role)
  )
);