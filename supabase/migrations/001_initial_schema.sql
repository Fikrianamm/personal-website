-- Profile table (single row for personal info)
create table public.profile (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  headline text not null default '',
  bio text not null default '',
  avatar_url text,
  resume_url text,
  email text not null,
  location text,
  social_links jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

-- Skills table
create table public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  icon_url text,
  display_order int not null default 0
);

-- Projects table
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null,
  long_description text,
  thumbnail_url text,
  images text[] not null default '{}',
  tech_stack text[] not null default '{}',
  live_url text,
  source_url text,
  is_featured boolean not null default false,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Experiences table
create table public.experiences (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  role text not null,
  description text,
  start_date date not null,
  end_date date,
  company_logo_url text,
  display_order int not null default 0
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
