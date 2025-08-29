-- Créer la table pour les citations
CREATE TABLE public.career_quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quote TEXT NOT NULL,
  member_id BIGINT NOT NULL,
  member_name TEXT NOT NULL,
  member_first_name TEXT NOT NULL,
  member_position TEXT,
  matricule TEXT NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Créer la table pour les statistiques
CREATE TABLE public.career_statistics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  formations_dispensees INTEGER NOT NULL DEFAULT 0,
  personnes_formees INTEGER NOT NULL DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activer RLS sur les deux tables
ALTER TABLE public.career_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_statistics ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour career_quotes
CREATE POLICY "Admins peuvent gérer toutes les citations"
ON public.career_quotes
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal', 'admin_secondaire', 'redacteur')
  )
);

CREATE POLICY "Publique peut voir les citations"
ON public.career_quotes
FOR SELECT
USING (true);

-- Politiques RLS pour career_statistics
CREATE POLICY "Admins peuvent gérer toutes les statistiques"
ON public.career_statistics
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal', 'admin_secondaire', 'redacteur')
  )
);

CREATE POLICY "Publique peut voir les statistiques"
ON public.career_statistics
FOR SELECT
USING (true);

-- Triggers pour updated_at
CREATE TRIGGER update_career_quotes_updated_at
  BEFORE UPDATE ON public.career_quotes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_career_statistics_updated_at
  BEFORE UPDATE ON public.career_statistics
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();