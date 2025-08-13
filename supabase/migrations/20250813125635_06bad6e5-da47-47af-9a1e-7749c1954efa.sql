-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Users can view their own profile" ON public.app_users;
DROP POLICY IF EXISTS "Admin principal can manage all users" ON public.app_users;

-- Créer une fonction sécurisée pour vérifier si un utilisateur est admin principal
CREATE OR REPLACE FUNCTION public.is_admin_principal(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT role = 'admin_principal' FROM public.app_users WHERE id = _user_id;
$$;

-- Nouvelle politique pour permettre aux admins de gérer tous les utilisateurs
CREATE POLICY "Admin principal can manage all users" 
ON public.app_users 
FOR ALL 
USING (
  CASE 
    WHEN auth.uid() IS NULL THEN false
    ELSE public.is_admin_principal(auth.uid())
  END
)
WITH CHECK (
  CASE 
    WHEN auth.uid() IS NULL THEN false
    ELSE public.is_admin_principal(auth.uid())
  END
);

-- Politique pour permettre aux utilisateurs de voir leur propre profil
CREATE POLICY "Users can view their own profile" 
ON public.app_users 
FOR SELECT 
USING (id = auth.uid());

-- Politique spéciale pour permettre la création d'utilisateurs par les admins
-- Cette politique permet l'insertion si elle est faite par un admin principal
CREATE POLICY "Allow admin to create users" 
ON public.app_users 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE id = auth.uid() 
    AND role = 'admin_principal'
  )
);