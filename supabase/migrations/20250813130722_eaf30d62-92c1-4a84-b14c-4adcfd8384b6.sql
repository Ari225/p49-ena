-- Fix security vulnerability: Restrict newsletter subscriber email access to admins only
-- The current policy allows anyone to view subscriber emails and tokens

-- Drop the existing insecure SELECT policy
DROP POLICY IF EXISTS "Admins can view active subscriptions" ON public.newsletter_subscriptions;

-- Create a secure policy that only allows admin users to view newsletter subscriptions
CREATE POLICY "Only admins can view newsletter subscriptions" 
ON public.newsletter_subscriptions 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 
    FROM public.app_users 
    WHERE app_users.id = auth.uid() 
    AND app_users.role IN ('admin_principal', 'admin_secondaire')
  )
);

-- Keep the insert policy as is - anyone should be able to subscribe
-- This is safe because users only provide their own email