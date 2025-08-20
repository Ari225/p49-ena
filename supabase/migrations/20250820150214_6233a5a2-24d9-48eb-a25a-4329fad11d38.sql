-- Désactiver complètement RLS pour la table popups
-- car l'application utilise un système d'authentification personnalisé
ALTER TABLE public.popups DISABLE ROW LEVEL SECURITY;

-- Supprimer toutes les politiques existantes
DROP POLICY IF EXISTS "Allow admins all operations" ON public.popups;
DROP POLICY IF EXISTS "Public can read active popups" ON public.popups;