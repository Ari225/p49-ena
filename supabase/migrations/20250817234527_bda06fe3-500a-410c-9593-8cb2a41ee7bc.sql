-- Créer la table communiques
CREATE TABLE public.communiques (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  urgency TEXT NOT NULL CHECK (urgency IN ('normal', 'important', 'urgent')) DEFAULT 'normal',
  published_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Activer RLS
ALTER TABLE public.communiques ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
CREATE POLICY "Public can view communiques" 
ON public.communiques 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create communiques" 
ON public.communiques 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid());

CREATE POLICY "Users can update their own communiques" 
ON public.communiques 
FOR UPDATE 
USING (auth.uid() = created_by)
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Admins can manage all communiques" 
ON public.communiques 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal', 'admin_secondaire')
  )
);

-- Trigger pour updated_at
CREATE TRIGGER update_communiques_updated_at
  BEFORE UPDATE ON public.communiques
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();