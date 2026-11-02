-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.profile (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  headline text NOT NULL DEFAULT ''::text,
  bio text NOT NULL DEFAULT ''::text,
  avatar_url text,
  resume_url text,
  email text NOT NULL,
  location text,
  social_links jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  phone text,
  CONSTRAINT profile_pkey PRIMARY KEY (id)
);
CREATE TABLE public.skills (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  icon_url text,
  CONSTRAINT skills_pkey PRIMARY KEY (id)
);
CREATE TABLE public.projects (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text NOT NULL,
  thumbnail_url text,
  images ARRAY NOT NULL DEFAULT '{}'::text[],
  tech_stack ARRAY NOT NULL DEFAULT '{}'::text[],
  live_url text,
  source_url text,
  is_featured boolean NOT NULL DEFAULT false,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT projects_pkey PRIMARY KEY (id)
);
CREATE TABLE public.experiences (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  company text NOT NULL,
  role text NOT NULL,
  description text,
  start_date date NOT NULL,
  end_date date,
  company_logo_url text,
  display_order integer NOT NULL DEFAULT 0,
  skills text,
  CONSTRAINT experiences_pkey PRIMARY KEY (id)
);

-- Enable Row Level Security
alter table public.profile enable row level security;
alter table public.skills enable row level security;
alter table public.projects enable row level security;
alter table public.experiences enable row level security;

-- RLS Policies: Public read access for portfolio data
create policy "Public read access" on public.profile for select using (true);
create policy "Public read access" on public.skills for select using (true);
create policy "Public read access" on public.projects for select using (true);
create policy "Public read access" on public.experiences for select using (true);

-- Create indexes
create index idx_projects_slug on public.projects (slug);
create index idx_projects_featured on public.projects (is_featured) where is_featured = true;
create index idx_skills_category on public.skills (category);
create index idx_projects_display_order on public.projects (display_order);
create index idx_skills_display_order on public.skills (display_order);
create index idx_experiences_display_order on public.experiences (display_order);

-- Seed initial profile row
insert into public.profile (full_name, headline, bio, email, social_links)
values (
  'Fikri',
  'Full Stack Developer',
  'Halo! Saya seorang developer yang passionate dalam membangun aplikasi web modern.',
  'hello@example.com',
  '{"github": "https://github.com/username", "linkedin": "https://linkedin.com/in/username"}'
);
