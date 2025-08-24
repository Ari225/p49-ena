-- Créer la table echo_regions
CREATE TABLE public.echo_regions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT,
  details TEXT,
  image_url TEXT,
  published_date DATE NOT NULL DEFAULT CURRENT_DATE,
  published_by TEXT,
  region TEXT NOT NULL,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  reading_time INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Activer RLS
ALTER TABLE public.echo_regions ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
CREATE POLICY "Tout le monde peut voir les échos des régions" 
ON public.echo_regions 
FOR SELECT 
USING (is_visible = true);

CREATE POLICY "Utilisateurs authentifiés peuvent créer des échos des régions" 
ON public.echo_regions 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid());

CREATE POLICY "Admins peuvent gérer tous les échos des régions" 
ON public.echo_regions 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.app_users 
  WHERE id = auth.uid() AND role IN ('admin_principal', 'admin_secondaire')
));

CREATE POLICY "Utilisateurs peuvent modifier leurs propres échos des régions" 
ON public.echo_regions 
FOR UPDATE 
USING (auth.uid() = created_by)
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Utilisateurs peuvent supprimer leurs propres échos des régions" 
ON public.echo_regions 
FOR DELETE 
USING (auth.uid() = created_by);

-- Trigger pour updated_at
CREATE TRIGGER update_echo_regions_updated_at
BEFORE UPDATE ON public.echo_regions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insérer les données actuelles
INSERT INTO public.echo_regions (title, summary, details, image_url, published_date, published_by, region, is_visible, reading_time) VALUES
(
  'Rencontre mensuelle des membres d''Abidjan',
  'Plus de 30 membres se sont retrouvés pour échanger sur les projets en cours et planifier les activités futures.',
  'La rencontre mensuelle de la délégation d''Abidjan s''est tenue le samedi 25 mars 2024 dans les locaux de la préfecture.',
  'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop',
  '2024-03-25',
  'Délégation Abidjan',
  'Abidjan',
  true,
  5
),
(
  'Session de formation en leadership',
  'Formation intensive sur le leadership transformationnel organisée pour 15 membres de la région de Bouaké.',
  'Une formation de trois jours sur le leadership transformationnel s''est déroulée du 18 au 20 mars 2024.',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop',
  '2024-03-20',
  'Délégation Bouaké',
  'Bouaké',
  true,
  7
),
(
  'Inauguration du bureau régional de San-Pédro',
  'Ouverture officielle du nouveau bureau régional en présence du Préfet et des autorités locales.',
  'Le nouveau bureau régional de San-Pédro a été officiellement inauguré le 15 mars 2024.',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
  '2024-03-15',
  'Délégation San-Pédro',
  'San-Pédro',
  true,
  4
),
(
  'Atelier sur la gestion publique moderne',
  'Workshop sur les innovations en gestion publique locale organisé à Korhogo.',
  'L''atelier de formation sur la gestion publique moderne s''est tenu le 10 mars 2024 à Korhogo.',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
  '2024-03-10',
  'Délégation Korhogo',
  'Korhogo',
  false,
  6
);