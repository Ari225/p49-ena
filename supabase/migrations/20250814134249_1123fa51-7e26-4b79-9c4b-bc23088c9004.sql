-- Créer une nouvelle politique RLS pour permettre aux membres de modifier leurs propres données
-- après vérification du matricule (sans nécessiter d'authentification admin)

-- D'abord, supprimer l'ancienne politique restrictive pour UPDATE
DROP POLICY IF EXISTS "Only admins can update members" ON public.members;

-- Créer une nouvelle politique qui permet à tout utilisateur authentifié de modifier les membres
-- (la vérification du matricule se fait dans l'application)
CREATE POLICY "Authenticated users can update members after matricule verification" 
ON public.members 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

-- Garder la politique admin pour les autres opérations sensibles comme DELETE
CREATE POLICY "Only admins can delete members" 
ON public.members 
FOR DELETE 
USING (EXISTS ( 
  SELECT 1 FROM app_users 
  WHERE app_users.id = auth.uid() 
  AND app_users.role = ANY (ARRAY['admin_principal'::user_role, 'admin_secondaire'::user_role])
));