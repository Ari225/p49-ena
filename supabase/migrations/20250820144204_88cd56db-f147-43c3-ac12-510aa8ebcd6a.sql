-- Create popups table
CREATE TABLE public.popups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT,
  type TEXT NOT NULL CHECK (type IN ('announcement', 'welcome', 'alert', 'information', 'other')),
  other_type TEXT,
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_date DATE NOT NULL DEFAULT CURRENT_DATE,
  image_url TEXT,
  target_audience TEXT NOT NULL CHECK (target_audience IN ('all_visitors', 'all_users', 'admins_only', 'editors_only')),
  author TEXT NOT NULL,
  position TEXT,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.popups ENABLE ROW LEVEL SECURITY;

-- Create policies for popups
CREATE POLICY "Admins can manage all popups" 
ON public.popups 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM app_users 
  WHERE app_users.id = auth.uid() 
  AND app_users.role IN ('admin_principal', 'admin_secondaire')
));

CREATE POLICY "Authenticated users can insert popups" 
ON public.popups 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid());

CREATE POLICY "Public can view active popups" 
ON public.popups 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Users can update their own popups" 
ON public.popups 
FOR UPDATE 
USING (auth.uid() = created_by);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_popups_updated_at
BEFORE UPDATE ON public.popups
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add validation trigger for other_type field
CREATE OR REPLACE FUNCTION public.validate_popup_other_type()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.type = 'other' AND (NEW.other_type IS NULL OR NEW.other_type = '') THEN
    RAISE EXCEPTION 'Le champ "other_type" est requis quand le type est "other"';
  END IF;
  
  IF NEW.type != 'other' THEN
    NEW.other_type = NULL;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_popup_other_type_trigger
BEFORE INSERT OR UPDATE ON public.popups
FOR EACH ROW
EXECUTE FUNCTION public.validate_popup_other_type();

-- Insert welcome message from President
INSERT INTO public.popups (
  title,
  message,
  type,
  is_active,
  target_audience,
  author,
  position,
  image_url
) VALUES (
  'Message de bienvenue de la Présidente',
  'Bienvenue sur le site du Réseau P49 ENA. Nous sommes ravis de vous accueillir dans notre communauté de diplômés engagés au service de la nation. Ce portail vous permettra de rester connectés, de partager vos expériences et de contribuer au rayonnement de notre réseau.',
  'welcome',
  true,
  'all_visitors',
  'Mme la Présidente',
  'Présidente du Réseau P49 ENA',
  '/lovable-uploads/Pers49.webp'
);