-- Create social_events table for storing social events data
CREATE TABLE IF NOT EXISTS public.social_events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type text NOT NULL,
  category text NOT NULL,
  title text NOT NULL,
  member_name text NOT NULL,
  event_date text NOT NULL, -- Flexible date format: dd/mm/yyyy, mm/yyyy, or yyyy
  location text, -- Optional field
  description text NOT NULL,
  thought text NOT NULL,
  image_url text,
  years_of_service integer,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.social_events ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Anyone can view social events" 
ON public.social_events 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create social events" 
ON public.social_events 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update social events" 
ON public.social_events 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete social events" 
ON public.social_events 
FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Create trigger for updating the updated_at column
CREATE TRIGGER update_social_events_updated_at
  BEFORE UPDATE ON public.social_events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();