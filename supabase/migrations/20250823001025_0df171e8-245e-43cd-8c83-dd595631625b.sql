-- Créer la table contacts pour enregistrer les messages de contact
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  phone TEXT,
  ip_address INET,
  user_agent TEXT,
  status TEXT NOT NULL DEFAULT 'nouveau',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  processed_at TIMESTAMP WITH TIME ZONE,
  processed_by UUID
);

-- Enable Row Level Security
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre à tous de créer des contacts
CREATE POLICY "Tout le monde peut créer des contacts" 
ON public.contacts 
FOR INSERT 
WITH CHECK (true);

-- Politique pour les admins de voir tous les contacts
CREATE POLICY "Admins peuvent voir tous les contacts" 
ON public.contacts 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.app_users 
  WHERE id = auth.uid() 
  AND role IN ('admin_principal', 'admin_secondaire')
));

-- Politique pour les admins de modifier les contacts
CREATE POLICY "Admins peuvent modifier les contacts" 
ON public.contacts 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.app_users 
  WHERE id = auth.uid() 
  AND role IN ('admin_principal', 'admin_secondaire')
))
WITH CHECK (EXISTS (
  SELECT 1 FROM public.app_users 
  WHERE id = auth.uid() 
  AND role IN ('admin_principal', 'admin_secondaire')
));

-- Créer un trigger pour mettre à jour updated_at
CREATE TRIGGER update_contacts_updated_at
BEFORE UPDATE ON public.contacts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Créer des index pour améliorer les performances
CREATE INDEX idx_contacts_status ON public.contacts(status);
CREATE INDEX idx_contacts_created_at ON public.contacts(created_at DESC);
CREATE INDEX idx_contacts_email ON public.contacts(email);