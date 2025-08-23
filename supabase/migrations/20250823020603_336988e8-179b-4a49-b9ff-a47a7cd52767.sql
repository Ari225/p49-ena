-- Create table for "Les Régionales" activities
CREATE TABLE public.les_regionales (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_id uuid NOT NULL,
  end_date date NOT NULL,
  participation_fees jsonb NOT NULL DEFAULT '[]'::jsonb, -- Array of pricing options
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT fk_les_regionales_activity FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE public.les_regionales ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Allow all users to view les_regionales" 
ON public.les_regionales 
FOR SELECT 
USING (true);

CREATE POLICY "Allow authenticated users to insert les_regionales" 
ON public.les_regionales 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to update les_regionales" 
ON public.les_regionales 
FOR UPDATE 
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete les_regionales" 
ON public.les_regionales 
FOR DELETE 
USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_les_regionales_updated_at
BEFORE UPDATE ON public.les_regionales
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();