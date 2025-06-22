
-- Create users table for storing user profiles
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'teacher', 'admin', 'super_admin')),
  school_id UUID,
  class_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create schools table
CREATE TABLE public.schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create health reports table
CREATE TABLE public.health_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES public.users(id),
  height DECIMAL,
  weight DECIMAL,
  temperature DECIMAL,
  blood_pressure TEXT,
  notes TEXT,
  report_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create complaints table
CREATE TABLE public.complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES public.users(id),
  complaint TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved')),
  response TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create games table
CREATE TABLE public.games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  content JSONB,
  category TEXT,
  difficulty_level TEXT DEFAULT 'easy',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create game progress table
CREATE TABLE public.game_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  game_id UUID REFERENCES public.games(id) ON DELETE CASCADE,
  score INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create content management table for editable homepage content
CREATE TABLE public.homepage_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_type TEXT NOT NULL,
  title TEXT,
  content JSONB,
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_content ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can view their own data and teachers/admins can view students in their school
CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT USING (auth.uid() = auth_id);

CREATE POLICY "Teachers can view students in their school" ON public.users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users teacher 
      WHERE teacher.auth_id = auth.uid() 
      AND teacher.role IN ('teacher', 'admin', 'super_admin')
      AND (teacher.school_id = users.school_id OR teacher.role IN ('admin', 'super_admin'))
    )
  );

-- Health reports policies
CREATE POLICY "Students can view own health reports" ON public.health_reports
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = student_id AND auth_id = auth.uid())
  );

CREATE POLICY "Teachers can view student health reports" ON public.health_reports
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users teacher 
      WHERE teacher.auth_id = auth.uid() 
      AND teacher.role IN ('teacher', 'admin', 'super_admin')
    )
  );

-- Complaints policies
CREATE POLICY "Students can create and view own complaints" ON public.complaints
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = student_id AND auth_id = auth.uid())
  );

CREATE POLICY "Teachers can view and respond to complaints" ON public.complaints
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users teacher 
      WHERE teacher.auth_id = auth.uid() 
      AND teacher.role IN ('teacher', 'admin', 'super_admin')
    )
  );

-- Games policies (public read for all authenticated users)
CREATE POLICY "All users can view games" ON public.games
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can track own game progress" ON public.game_progress
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = user_id AND auth_id = auth.uid())
  );

-- Homepage content policies
CREATE POLICY "Everyone can view homepage content" ON public.homepage_content
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage homepage content" ON public.homepage_content
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE auth_id = auth.uid() 
      AND role IN ('admin', 'super_admin')
    )
  );

-- Insert some sample data
INSERT INTO public.schools (id, name, address, phone) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'SD Nusantara Jakarta', 'Jl. Pendidikan No. 123, Jakarta', '021-12345678'),
  ('550e8400-e29b-41d4-a716-446655440001', 'SD Cerdas Bangsa', 'Jl. Cerdas No. 456, Jakarta', '021-87654321');

INSERT INTO public.games (title, description, content, category) VALUES
  ('Cuci Tangan Yuk!', 'Belajar cara mencuci tangan yang benar', '{"steps": ["Basahi tangan", "Sabuni tangan", "Gosok 20 detik", "Bilas dengan air", "Keringkan"]}', 'hygiene'),
  ('Makanan Sehat', 'Pilih makanan yang bergizi', '{"questions": [{"question": "Manakah makanan sehat?", "options": ["Burger", "Sayur bayam", "Permen"], "answer": 1}]}', 'nutrition'),
  ('Tidur Cukup', 'Belajar pentingnya tidur yang cukup', '{"content": "Anak-anak perlu tidur 8-10 jam setiap malam"}', 'lifestyle');

INSERT INTO public.homepage_content (section_type, title, content, is_active) VALUES
  ('health_tips', 'Tips Kesehatan Harian', '{"tips": [{"title": "Cuci Tangan", "description": "Cuci tangan dengan sabun"}, {"title": "Makan Bergizi", "description": "Konsumsi makanan sehat"}]}', true),
  ('education', 'Edukasi Kesehatan untuk Anak', '{"topics": [{"title": "Kebersihan Diri", "content": "Menjaga kebersihan tubuh"}]}', true);
