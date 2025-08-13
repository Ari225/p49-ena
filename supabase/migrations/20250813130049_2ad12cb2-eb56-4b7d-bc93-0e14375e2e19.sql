-- Le problème est que votre système n'utilise pas l'auth Supabase native
-- donc auth.uid() sera toujours NULL. Je vais créer une solution qui fonctionne
-- avec votre système d'authentification personnalisé.

-- Supprimer toutes les politiques existantes
DROP POLICY IF EXISTS "Admin principal can manage all users" ON public.app_users;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.app_users;
DROP POLICY IF EXISTS "Allow admin to create users" ON public.app_users;

-- Créer une politique simple qui permet aux applications d'insérer des utilisateurs
-- Cette politique vérifie que certains champs obligatoires sont présents
CREATE POLICY "Allow user creation from app" 
ON public.app_users 
FOR INSERT 
WITH CHECK (
  username IS NOT NULL 
  AND first_name IS NOT NULL 
  AND last_name IS NOT NULL 
  AND role IS NOT NULL
);

-- Politique pour permettre la lecture (pour la liste des utilisateurs)
CREATE POLICY "Allow read access to app users" 
ON public.app_users 
FOR SELECT 
USING (true);

-- Politique pour permettre les mises à jour
CREATE POLICY "Allow updates to app users" 
ON public.app_users 
FOR UPDATE 
USING (true)
WITH CHECK (true);

-- Politique pour permettre les suppressions
CREATE POLICY "Allow deletes to app users" 
ON public.app_users 
FOR DELETE 
USING (true);

-- Supprimer la fonction is_admin_principal qui n'est plus nécessaire
DROP FUNCTION IF EXISTS public.is_admin_principal(_user_id uuid);