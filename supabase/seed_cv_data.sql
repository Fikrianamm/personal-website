-- Run in the Supabase SQL Editor; the app's public key has read-only RLS access.
BEGIN;

DO $$
BEGIN
  UPDATE public.profile
  SET
    full_name = 'Fikri Taufiqul Anam',
    headline = 'Fullstack Developer',
    bio =  'Halo! Saya seorang *fresh graduate* Teknik Informatika dan Full-Stack React Developer. Saya suka bereksperimen dengan teknologi web dan ide-ide kreatif. Bagi saya, setiap baris kode adalah media eksplorasi untuk membangun antarmuka yang interaktif, estetik, dan menyenangkan saat diakses.',
    email = 'fikritaufiqulanam1@gmail.com',
    phone = '+6289675329315',
    location = 'Kudus, Jawa Tengah',
    updated_at = now()
  WHERE email = 'fikritaufiqulanam1@gmail.com';

  IF NOT FOUND THEN
    INSERT INTO public.profile (
      full_name,
      headline,
      bio,
      email,
      phone,
      location
    )
    VALUES (
      'Fikri Taufiqul Anam',
      'Fullstack Developer',
      'fikritaufiqulanam1@gmail.com',
      '+6289675329315',
      'Kudus, Jawa Tengah'
    );
  END IF;
END
$$;

INSERT INTO public.skills (name, category)
SELECT seed.name, seed.category
FROM (
  VALUES
    ('JavaScript', 'Programming Languages'),
    ('TypeScript', 'Programming Languages'),
    ('HTML/CSS', 'Programming Languages'),
    ('SQL', 'Programming Languages'),
    ('React.js', 'Frameworks & Libraries'),
    ('Next.js', 'Frameworks & Libraries'),
    ('Laravel', 'Frameworks & Libraries'),
    ('Tailwind CSS', 'Frameworks & Libraries'),
    ('Git', 'Tools & Platforms'),
    ('GitHub', 'Tools & Platforms'),
    ('Docker', 'Tools & Platforms'),
    ('Postman', 'Tools & Platforms'),
    ('VS Code', 'Tools & Platforms'),
    ('MySQL', 'Tools & Platforms'),
    ('PostgreSQL', 'Tools & Platforms'),
    ('Problem Solving', 'Soft Skills'),
    ('Team Collaboration', 'Soft Skills'),
    ('Adaptability', 'Soft Skills'),
    ('Clean Code Practices', 'Soft Skills')
) AS seed(name, category)
WHERE NOT EXISTS (
  SELECT 1
  FROM public.skills existing
  WHERE lower(existing.name) = lower(seed.name)
    AND lower(existing.category) = lower(seed.category)
);

INSERT INTO public.projects (
  title,
  slug,
  description,
  tech_stack,
  is_featured,
  display_order
)
VALUES
  (
    'Sistem Operasional Bisnis',
    'sistem-operasional-haqi-koleksi',
    'Membangun aplikasi web yang menyatukan penjualan, produksi, stok bahan baku, dan arsip desain. Sistem ini memangkas pencatatan manual sekitar 50%. Juga mengelola server dan administrasi aplikasi untuk operasional perusahaan.',
    ARRAY['Next.js', 'React.js', 'MySQL', 'TypeScript'],
    true,
    1
  ),
  (
    'Sistem Informasi Bimbingan Akademik',
    'sistem-informasi-bimbingan-akademik',
    'Merancang sistem informasi bimbingan akademik yang menghubungkan dosen dan mahasiswa secara real-time serta mempercepat pemantauan bimbingan dosen.',
    ARRAY['Laravel', 'Inertia', 'React.js', 'MySQL', 'TypeScript'],
    true,
    2
  ),
  (
    'Sistem Invoice Digital Tiket Travel',
    'sistem-invoice-digital-tiket-travel',
    'Membuat sistem invoice digital untuk tiket travel dengan ekspor PDF. Sistem mempercepat proses pembuatan invoice hingga 3 kali dan menghemat sekitar 10 jam kerja administrasi per minggu.',
    ARRAY['React.js', 'Node.js', 'MySQL', 'TypeScript'],
    true,
    3
  )
ON CONFLICT (slug) DO UPDATE
SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  tech_stack = EXCLUDED.tech_stack,
  is_featured = EXCLUDED.is_featured,
  display_order = EXCLUDED.display_order;

INSERT INTO public.experiences (
  company,
  role,
  description,
  start_date,
  end_date,
  display_order,
  skills
)
SELECT
  seed.company,
  seed.role,
  seed.description,
  seed.start_date,
  seed.end_date,
  seed.display_order,
  seed.skills
FROM (
  VALUES
    (
      'Universitas Muria Kudus',
      'Gelar Sarjana Teknik Informatika (S.Kom.)',
      'Membangun aplikasi web Next.js dan MySQL yang menyatukan penjualan, produksi, stok bahan baku, dan arsip desain, memangkas pencatatan manual sekitar 50%. Mengelola server dan administrasi sistem aplikasi untuk operasional perusahaan.',
      DATE '2026-04-01',
      DATE '2026-07-31',
      1,
      'IPK 3,86 / 4.00'
    ),
    (
      'Lembaga Sistem Informasi Universitas Muria Kudus',
      'Fullstack Developer | Intern',
      'Merancang sistem informasi bimbingan akademik (SIBA) berbasis Laravel, Inertia, React.js, dan MySQL. Menghubungkan dosen dan mahasiswa secara real-time serta mempercepat pemantauan bimbingan dosen.',
      DATE '2025-09-01',
      DATE '2025-12-31',
      2,
      'Laravel, Inertia, React.js, MySQL, TypeScript'
    ),
    (
      'PT. Mulia Sujar Abadi',
      'Fullstack Developer | Intern',
      'Membuat sistem invoice digital untuk tiket travel dengan ekspor PDF menggunakan React.js, Node.js, dan MySQL. Mempercepat proses invoice hingga 3 kali dan menghemat sekitar 10 jam kerja administrasi per minggu.',
      DATE '2025-01-01',
      DATE '2025-03-31',
      3,
      'React.js, Node.js, MySQL, Typescript'
    )
) AS seed(company, role, description, start_date, end_date, display_order, skills)
WHERE NOT EXISTS (
  SELECT 1
  FROM public.experiences existing
  WHERE existing.company = seed.company
    AND existing.role = seed.role
    AND existing.start_date = seed.start_date
);

COMMIT;
