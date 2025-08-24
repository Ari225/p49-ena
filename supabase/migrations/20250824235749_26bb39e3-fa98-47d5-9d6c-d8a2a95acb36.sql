-- Restructurer la table echo_regions avec les nouvelles colonnes
-- Sauvegarder les données existantes si nécessaires
CREATE TABLE IF NOT EXISTS echo_regions_backup AS SELECT * FROM echo_regions;

-- Supprimer l'ancienne table
DROP TABLE IF EXISTS echo_regions CASCADE;

-- Créer la nouvelle table avec la structure demandée
CREATE TABLE public.echo_regions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image TEXT, -- Image de la région
  region TEXT NOT NULL, -- Région
  delegue TEXT, -- Délégué régional
  members_count INTEGER DEFAULT 0, -- Nombre de membres
  last_activity TEXT, -- Dernière activité
  recent_news JSONB DEFAULT '[]'::jsonb, -- Actualités récentes (array d'objets)
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID
);

-- Activer RLS
ALTER TABLE public.echo_regions ENABLE ROW LEVEL SECURITY;

-- Créer les politiques RLS
CREATE POLICY "Admins peuvent gérer tous les échos des régions" 
ON public.echo_regions 
FOR ALL 
TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.app_users 
  WHERE id = auth.uid() 
  AND role IN ('admin_principal', 'admin_secondaire')
));

CREATE POLICY "Tout le monde peut voir les échos des régions" 
ON public.echo_regions 
FOR SELECT 
USING (true);

CREATE POLICY "Utilisateurs authentifiés peuvent créer des échos des régions" 
ON public.echo_regions 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid());

CREATE POLICY "Utilisateurs peuvent modifier leurs propres échos des régions" 
ON public.echo_regions 
FOR UPDATE 
TO authenticated
USING (auth.uid() = created_by)
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Utilisateurs peuvent supprimer leurs propres échos des régions" 
ON public.echo_regions 
FOR DELETE 
TO authenticated
USING (auth.uid() = created_by);

-- Créer un trigger pour mettre à jour updated_at
CREATE TRIGGER update_echo_regions_updated_at
  BEFORE UPDATE ON public.echo_regions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insérer quelques données d'exemple basées sur les délégués régionaux
INSERT INTO public.echo_regions (region, delegue, members_count, last_activity, recent_news, image, created_by) VALUES
('Littoral', 'Jean Dupont', 150, 'Réunion du bureau régional - 15 Jan 2025', '[{"title": "Formation des jeunes cadres", "date": "2025-01-10"}, {"title": "Assemblée générale régionale", "date": "2025-01-05"}]'::jsonb, '/lovable-uploads/Pers49.webp', NULL),
('Centre', 'Marie Nguyen', 120, 'Séminaire de formation - 12 Jan 2025', '[{"title": "Nouveau programme de mentorat", "date": "2025-01-08"}, {"title": "Célébration des retraités", "date": "2025-01-03"}]'::jsonb, '/lovable-uploads/Pers49.webp', NULL),
('Ouest', 'Paul Martin', 95, 'Atelier développement personnel - 10 Jan 2025', '[{"title": "Session de coaching", "date": "2025-01-07"}, {"title": "Rencontre inter-promotions", "date": "2025-01-02"}]'::jsonb, '/lovable-uploads/Pers49.webp', NULL);