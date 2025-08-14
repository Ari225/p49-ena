-- Remove the dangerous public read access policy for app_users table
DROP POLICY IF EXISTS "Allow read access to app users" ON public.app_users;

-- The existing secure policies will remain:
-- 1. "Users can view own profile" - allows users to see only their own data
-- 2. "Admin principal can view all users" - allows admin principal to see all users
-- 3. Other role-based policies for proper access control

-- Verify the remaining policies are sufficient for application functionality