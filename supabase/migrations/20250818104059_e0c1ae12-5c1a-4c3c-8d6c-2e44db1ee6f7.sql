-- Update activities table structure for the new form requirements
ALTER TABLE public.activities DROP COLUMN IF EXISTS type;
ALTER TABLE public.activities DROP COLUMN IF EXISTS participants;

-- Add new columns for the updated form
ALTER TABLE public.activities ADD COLUMN IF NOT EXISTS start_time TIME;
ALTER TABLE public.activities ADD COLUMN IF NOT EXISTS end_time TIME;
ALTER TABLE public.activities ADD COLUMN IF NOT EXISTS brief_description TEXT;
ALTER TABLE public.activities ADD COLUMN IF NOT EXISTS other_category TEXT;

-- Update existing time column to be nullable since we're splitting it
ALTER TABLE public.activities ALTER COLUMN time DROP NOT NULL;

-- Add constraint to ensure other_category is provided when category is 'Autre'
CREATE OR REPLACE FUNCTION validate_activity_category()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.category = 'Autre' AND (NEW.other_category IS NULL OR NEW.other_category = '') THEN
    RAISE EXCEPTION 'Le champ "autre catégorie" est requis quand la catégorie est "Autre"';
  END IF;
  
  IF NEW.category != 'Autre' THEN
    NEW.other_category = NULL;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for category validation
DROP TRIGGER IF EXISTS validate_activity_category_trigger ON public.activities;
CREATE TRIGGER validate_activity_category_trigger
  BEFORE INSERT OR UPDATE ON public.activities
  FOR EACH ROW
  EXECUTE FUNCTION validate_activity_category();