-- Ajouter une colonne statut à la table contacts
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS statut text DEFAULT 'nouveau';

-- Mettre à jour les enregistrements existants
UPDATE public.contacts SET statut = 'nouveau' WHERE statut IS NULL;