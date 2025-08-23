-- Create table for Assemblées Générales specific data
CREATE TABLE public.assemblees_generales (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  session_president TEXT NOT NULL,
  agenda_points JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.assemblees_generales ENABLE ROW LEVEL SECURITY;

-- Create policies for assemblees_generales
CREATE POLICY "Allow all users to view assemblees_generales" 
ON public.assemblees_generales 
FOR SELECT 
USING (true);

CREATE POLICY "Allow authenticated users to insert assemblees_generales" 
ON public.assemblees_generales 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to update assemblees_generales" 
ON public.assemblees_generales 
FOR UPDATE 
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete assemblees_generales" 
ON public.assemblees_generales 
FOR DELETE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_assemblees_generales_updated_at
BEFORE UPDATE ON public.assemblees_generales
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();