-- Créer la table pour les annonces de carrière
CREATE TABLE public.career_announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Formations', 'Renforcement des capacités', 'Coaching & mentorat', 'Concours')),
  description TEXT NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Champs pour les Formations
  niveau TEXT CHECK (niveau IS NULL OR niveau IN ('Débutant', 'Intermédiaire', 'Avancé', 'Expert', 'Tous les niveaux')),
  date_debut DATE,
  duree_formation TEXT,
  type_formation TEXT CHECK (type_formation IS NULL OR type_formation IN ('en ligne', 'en présentiel')),
  lieu TEXT,
  
  -- Champs pour Renforcement des capacités
  points_renforcement JSONB DEFAULT '[]'::jsonb,
  
  -- Champs pour Coaching & mentorat
  duree_coaching TEXT,
  format TEXT,
  
  -- Champs pour Concours
  date_ouverture DATE,
  date_limite DATE,
  nombre_places TEXT,
  lien_concours TEXT,
  
  -- Métadonnées
  is_active BOOLEAN NOT NULL DEFAULT true,
  published_date DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Activer RLS
ALTER TABLE public.career_announcements ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
-- Les visiteurs peuvent voir toutes les annonces actives
CREATE POLICY "Public can view active career announcements" 
ON public.career_announcements 
FOR SELECT 
USING (is_active = true);

-- Les utilisateurs authentifiés peuvent créer des annonces
CREATE POLICY "Authenticated users can create career announcements" 
ON public.career_announcements 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid());

-- Les utilisateurs peuvent modifier leurs propres annonces
CREATE POLICY "Users can update their own career announcements" 
ON public.career_announcements 
FOR UPDATE 
USING (auth.uid() = created_by)
WITH CHECK (auth.uid() = created_by);

-- Les utilisateurs peuvent supprimer leurs propres annonces
CREATE POLICY "Users can delete their own career announcements" 
ON public.career_announcements 
FOR DELETE 
USING (auth.uid() = created_by);

-- Les admins peuvent tout faire
CREATE POLICY "Admins can manage all career announcements" 
ON public.career_announcements 
FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.app_users 
  WHERE id = auth.uid() 
  AND role IN ('admin_principal'::user_role, 'admin_secondaire'::user_role)
));

-- Créer une fonction de mise à jour automatique du timestamp
CREATE OR REPLACE FUNCTION public.update_career_announcement_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour automatiquement updated_at
CREATE TRIGGER update_career_announcements_updated_at
  BEFORE UPDATE ON public.career_announcements
  FOR EACH ROW
  EXECUTE FUNCTION public.update_career_announcement_updated_at();

-- Index pour améliorer les performances
CREATE INDEX idx_career_announcements_category ON public.career_announcements(category);
CREATE INDEX idx_career_announcements_active ON public.career_announcements(is_active);
CREATE INDEX idx_career_announcements_created_by ON public.career_announcements(created_by);
CREATE INDEX idx_career_announcements_published_date ON public.career_announcements(published_date DESC);