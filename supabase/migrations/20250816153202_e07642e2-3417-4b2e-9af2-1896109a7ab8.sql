-- Create table for happy events
CREATE TABLE public.happy_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  member_name text NOT NULL,
  event_date date NOT NULL,
  location text,
  description text,
  message text,
  category text NOT NULL,
  custom_category text, -- For "Autre" option
  image_url text,
  created_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create table for retirement departures (already exists but we'll modify structure)
-- Add custom_category field to existing retirement_departures table
ALTER TABLE public.retirement_departures 
ADD COLUMN custom_category text;

-- Create table for difficult events (already exists but we'll modify structure)  
-- Add custom_category field to existing difficult_events table
ALTER TABLE public.difficult_events
ADD COLUMN custom_category text;

-- Enable RLS on happy_events
ALTER TABLE public.happy_events ENABLE ROW LEVEL SECURITY;

-- Create policies for happy_events
CREATE POLICY "Anyone can view happy events" ON public.happy_events FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create happy events" ON public.happy_events FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update happy events" ON public.happy_events FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete happy events" ON public.happy_events FOR DELETE USING (auth.uid() IS NOT NULL);

-- Create trigger for updated_at
CREATE TRIGGER update_happy_events_updated_at
  BEFORE UPDATE ON public.happy_events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();