-- Create table for happy events
CREATE TABLE public.happy_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date TEXT NOT NULL, -- Using TEXT to handle both full dates and years
  location TEXT,
  category TEXT NOT NULL,
  member_name TEXT NOT NULL,
  message TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID
);

-- Enable Row Level Security
ALTER TABLE public.happy_events ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view happy events" 
ON public.happy_events 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create happy events" 
ON public.happy_events 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update happy events" 
ON public.happy_events 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete happy events" 
ON public.happy_events 
FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_happy_events_updated_at
BEFORE UPDATE ON public.happy_events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.happy_events;