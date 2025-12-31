-- ==========================================
-- JH DEV'S PROFESSIONAL DATABASE SCHEMA
-- Version 3.0 (Bulletproof)
-- ==========================================

-- 1. CLEANUP (DROP EVERYTHING WITH CASCADE)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.is_admin() CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- 2. TABLES
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID REFERENCES auth.users ON DELETE CASCADE UNIQUE,
  email TEXT UNIQUE,
  full_name TEXT,
  phone TEXT,
  address TEXT,
  business_name TEXT,
  document TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'client', -- 'admin' or 'client'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE client_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT,
  size INTEGER,
  category TEXT, -- e.g., 'Logotipo', 'Conteúdo Interno', 'Documentação'
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'Briefing',
  progress INTEGER DEFAULT 0,
  preview_url TEXT,
  tasks JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. FUNCTIONS
-- BREAK RECURSION: Security Definer allows checking role without triggering RLS loops
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  -- We check both the profiles table and the auth.users email for the owner
  RETURN (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE auth_id = auth.uid() AND role = 'admin'
    )
    OR
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE id = auth.uid() AND email = 'helgonhc19@yahoo.com.br'
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- SMART LINK TRIGGER: Links pre-registered profiles to authenticating users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM public.profiles WHERE email = new.email) THEN
    UPDATE public.profiles 
    SET auth_id = new.id,
        full_name = COALESCE(full_name, new.raw_user_meta_data->>'full_name')
    WHERE email = new.email;
  ELSE
    INSERT INTO public.profiles (auth_id, email, full_name, role)
    VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', 'client');
  END IF;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. TRIGGERS
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 5. SECURITY (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Admins can manage all profiles" ON profiles
  FOR ALL USING (is_admin());

CREATE POLICY "Users can see their own profile" ON profiles
  FOR SELECT USING (auth_id = auth.uid());

-- Projects Policies
CREATE POLICY "Admins can manage all projects" ON projects
  FOR ALL USING (is_admin());

CREATE POLICY "Clients can see their assigned projects" ON projects
  FOR SELECT USING (
    client_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid())
  );

-- 6. INITIAL DATA (Run this manually for your email)
-- UPDATE profiles SET role = 'admin' WHERE email = 'helgonhc19@yahoo.com.br';
