-- Créer la table pour les textes officiels
CREATE TABLE public.official_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  year INTEGER NOT NULL,
  description TEXT NOT NULL,
  document_url TEXT NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activer RLS
ALTER TABLE public.official_documents ENABLE ROW LEVEL SECURITY;

-- Politique pour voir tous les documents (public)
CREATE POLICY "Public can view official documents" 
ON public.official_documents 
FOR SELECT 
USING (true);

-- Politique pour créer des documents (utilisateurs authentifiés)
CREATE POLICY "Authenticated users can create official documents" 
ON public.official_documents 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid());

-- Politique pour mettre à jour ses propres documents
CREATE POLICY "Users can update their own official documents" 
ON public.official_documents 
FOR UPDATE 
USING (auth.uid() = created_by)
WITH CHECK (auth.uid() = created_by);

-- Politique pour supprimer ses propres documents
CREATE POLICY "Users can delete their own official documents" 
ON public.official_documents 
FOR DELETE 
USING (auth.uid() = created_by);

-- Politique pour les admins (gestion complète)
CREATE POLICY "Admins can manage all official documents" 
ON public.official_documents 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM app_users 
  WHERE id = auth.uid() 
  AND role IN ('admin_principal', 'admin_secondaire')
));

-- Trigger pour mettre à jour updated_at
CREATE TRIGGER update_official_documents_updated_at
BEFORE UPDATE ON public.official_documents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();