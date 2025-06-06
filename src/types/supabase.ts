
export type Role = 'student' | 'instructor' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  promo_video_url?: string;
  category_id: string;
  instructor_id: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'all-levels';
  duration: string;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  video_url: string;
  duration: string;
  position: number;
  is_preview: boolean;
  created_at: string;
  updated_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  created_at: string;
  updated_at: string;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  user_id: string;
  course_id: string;
  rating: number;
  comment?: string;
  created_at: string;
  updated_at: string;
}

// Suggested Supabase Schema
/*
-- Users Table
CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'instructor', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories Table
CREATE TABLE categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Courses Table
CREATE TABLE courses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  promo_video_url TEXT,
  category_id UUID NOT NULL REFERENCES categories(id),
  instructor_id UUID NOT NULL REFERENCES users(id),
  level TEXT NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced', 'all-levels')),
  duration TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lessons Table
CREATE TABLE lessons (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  duration TEXT NOT NULL,
  position INTEGER NOT NULL,
  is_preview BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enrollments Table
CREATE TABLE enrollments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  course_id UUID NOT NULL REFERENCES courses(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, course_id)
);

-- Lesson Progress Table
CREATE TABLE lesson_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  lesson_id UUID NOT NULL REFERENCES lessons(id),
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, lesson_id)
);

-- Reviews Table
CREATE TABLE reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  course_id UUID NOT NULL REFERENCES courses(id),
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, course_id)
);
*/
