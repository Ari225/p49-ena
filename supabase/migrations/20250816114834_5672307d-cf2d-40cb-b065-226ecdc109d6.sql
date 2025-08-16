-- Fix get_secure_user_info to use app_users table instead of profiles
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
    SELECT 1 FROM app_users au 
    WHERE au.id = auth.uid() 
    AND au.role IN ('admin_principal', 'admin_secondaire')
  ) THEN
    RAISE EXCEPTION 'Unauthorized access';
  END IF;

  RETURN QUERY
  SELECT 
    au.id,
    au.username,
    au.first_name,
    au.last_name,
    au.email,
    au.role::TEXT,
    au.image_url
  FROM app_users au
  WHERE au.id = target_user_id;
END;
$$;