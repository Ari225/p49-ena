-- Enable RLS on members table
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to members
CREATE POLICY "Allow public read access to members" 
ON public.members 
FOR SELECT 
USING (true);