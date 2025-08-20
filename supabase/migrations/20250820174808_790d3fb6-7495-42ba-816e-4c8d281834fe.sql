-- Drop the existing trigger and function to recreate them properly
DROP TRIGGER IF EXISTS trigger_auto_archive_editions ON journal_editions;
DROP FUNCTION IF EXISTS auto_archive_old_editions();

-- Create a better function to automatically archive old editions
CREATE OR REPLACE FUNCTION auto_archive_old_editions()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only proceed if the new/updated edition is being published
  IF NEW.status = 'publie' THEN
    -- Archive all other published editions (excluding the current one)
    UPDATE journal_editions 
    SET status = 'archive', updated_at = now()
    WHERE status = 'publie' 
    AND id != NEW.id;
    
    RAISE LOG 'Auto-archived old editions for new publication: %', NEW.title;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger for both INSERT and UPDATE operations
CREATE TRIGGER trigger_auto_archive_editions
  AFTER INSERT OR UPDATE OF status ON journal_editions
  FOR EACH ROW
  WHEN (NEW.status = 'publie')
  EXECUTE FUNCTION auto_archive_old_editions();