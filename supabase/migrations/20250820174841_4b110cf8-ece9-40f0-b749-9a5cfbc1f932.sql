-- Fix existing editions: keep only the most recent as 'publie', archive the others
WITH latest_edition AS (
  SELECT id 
  FROM journal_editions 
  WHERE status = 'publie'
  ORDER BY publish_date DESC, created_at DESC
  LIMIT 1
)
UPDATE journal_editions 
SET status = 'archive', updated_at = now()
WHERE status = 'publie' 
AND id NOT IN (SELECT id FROM latest_edition);