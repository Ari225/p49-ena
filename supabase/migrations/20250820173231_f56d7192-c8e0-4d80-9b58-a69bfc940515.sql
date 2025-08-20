-- Update journal_status enum to include 'archive'
ALTER TYPE journal_status ADD VALUE IF NOT EXISTS 'archive';

-- Add a function to automatically archive old editions when a new one is published
CREATE OR REPLACE FUNCTION auto_archive_old_editions()
RETURNS TRIGGER AS $$
BEGIN
  -- If the new edition is published, archive all other published editions
  IF NEW.status = 'publie' THEN
    UPDATE journal_editions 
    SET status = 'archive'
    WHERE status = 'publie' AND id != NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically archive old editions
DROP TRIGGER IF EXISTS trigger_auto_archive_editions ON journal_editions;
CREATE TRIGGER trigger_auto_archive_editions
  AFTER INSERT OR UPDATE ON journal_editions
  FOR EACH ROW
  EXECUTE FUNCTION auto_archive_old_editions();