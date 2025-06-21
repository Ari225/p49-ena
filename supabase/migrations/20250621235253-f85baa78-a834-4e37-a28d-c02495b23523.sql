
-- Create activities table to store form data
CREATE TABLE public.activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Les Régionales', 'Assemblées Générales', 'Réunions de constitution', 'Autre activité')),
  type TEXT, -- Only required when category is 'Autre activité'
  date DATE NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  participants TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'À venir' CHECK (status IN ('À venir', 'Terminé')),
  created_by UUID REFERENCES public.app_users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- Create policies for activities
CREATE POLICY "Allow all users to view activities" 
  ON public.activities 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow authenticated users to insert activities" 
  ON public.activities 
  FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow creators to update their activities" 
  ON public.activities 
  FOR UPDATE 
  USING (created_by = auth.uid());

CREATE POLICY "Allow creators to delete their activities" 
  ON public.activities 
  FOR DELETE 
  USING (created_by = auth.uid());

-- Create function to automatically update activity status based on date
CREATE OR REPLACE FUNCTION update_activity_status()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.date < CURRENT_DATE THEN
    NEW.status = 'Terminé';
  ELSE
    NEW.status = 'À venir';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update status
CREATE TRIGGER update_activity_status_trigger
  BEFORE INSERT OR UPDATE ON public.activities
  FOR EACH ROW
  EXECUTE FUNCTION update_activity_status();
