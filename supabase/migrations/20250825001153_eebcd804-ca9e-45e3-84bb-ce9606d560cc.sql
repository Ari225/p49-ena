-- Restructurer la table echo_regions
DROP TABLE IF EXISTS echo_regions CASCADE;

CREATE TABLE public.echo_regions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url text,
  region text NOT NULL,
  delegue text NOT NULL,
  membres integer DEFAULT 0,
  derniere_activite text,
  actualites_recentes jsonb DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  created_by uuid REFERENCES auth.users(id),
  -- Référence vers la table instances_dir pour le délégué
  delegue_id bigint REFERENCES public.instances_dir(id)
);

-- Enable RLS
ALTER TABLE public.echo_regions ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
CREATE POLICY "Public can view echo regions" ON public.echo_regions
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert echo regions" ON public.echo_regions
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update echo regions" ON public.echo_regions
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete echo regions" ON public.echo_regions
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- Trigger pour updated_at
CREATE TRIGGER update_echo_regions_updated_at
  BEFORE UPDATE ON public.echo_regions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Fonction pour synchroniser automatiquement avec instances_dir
CREATE OR REPLACE FUNCTION sync_echo_regions_with_delegates()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Insérer les délégués régionaux qui n'existent pas encore
  INSERT INTO public.echo_regions (region, delegue, delegue_id)
  SELECT 
    i."Région",
    i."Nom et Prénoms",
    i.id
  FROM public.instances_dir i
  WHERE i."Position" = 'delegues_regionaux'
  AND NOT EXISTS (
    SELECT 1 FROM public.echo_regions er 
    WHERE er.delegue_id = i.id
  );
  
  -- Mettre à jour les informations existantes
  UPDATE public.echo_regions
  SET 
    region = i."Région",
    delegue = i."Nom et Prénoms"
  FROM public.instances_dir i
  WHERE echo_regions.delegue_id = i.id
  AND i."Position" = 'delegues_regionaux';
END;
$$;

-- Exécuter la synchronisation initiale
SELECT sync_echo_regions_with_delegates();