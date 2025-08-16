-- Drop and recreate the get_secure_user_info function to fix the ambiguous column reference
DROP FUNCTION IF EXISTS get_secure_user_info(uuid);

CREATE OR REPLACE FUNCTION get_secure_user_info(target_user_id UUID)
RETURNS TABLE (
  id UUID,
  username TEXT,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  role TEXT,
  image_url TEXT
) 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Only allow users to get their own info or admins to get any user info
  IF auth.uid() != target_user_id AND NOT EXISTS (
    SELECT 1 FROM profiles p 
    WHERE p.user_id = auth.uid() 
    AND p.role IN ('admin_principal', 'admin_secondaire')
  ) THEN
    RAISE EXCEPTION 'Unauthorized access';
  END IF;

  RETURN QUERY
  SELECT 
    p.user_id as id,
    p.username,
    p.first_name,
    p.last_name,
    au.email,
    p.role,
    p.image_url
  FROM profiles p
  JOIN auth.users au ON p.user_id = au.id
  WHERE p.user_id = target_user_id;
END;
$$;