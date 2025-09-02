-- Create a default admin user
-- Note: This is a temporary approach. In production, you should create admin users through Supabase Auth properly.

-- First, let's insert a profile for the admin (this simulates what the trigger would do)
INSERT INTO public.profiles (id, email, full_name)
VALUES (
  gen_random_uuid(),
  'admin@treklovers.com',
  'Adventure Trek Admin'
) ON CONFLICT DO NOTHING;

-- Get the profile ID and make this user an admin
DO $$
DECLARE
  admin_user_id uuid;
BEGIN
  -- Get the user ID from profiles
  SELECT id INTO admin_user_id 
  FROM public.profiles 
  WHERE email = 'admin@treklovers.com';
  
  -- Add admin role if user exists
  IF admin_user_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (admin_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END $$;