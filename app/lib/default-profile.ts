import type { Profile } from "~/types/database";

export const defaultProfile: Profile = {
  id: "default",
  full_name: "Fikri",
  headline: "Full Stack Developer",
  bio: "Halo! Saya seorang developer yang passionate dalam membangun aplikasi web modern, cepat, dan user-friendly.",
  avatar_url: null,
  resume_url: null,
  email: "fikri@example.com",
  location: "Indonesia",
  social_links: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  updated_at: new Date().toISOString(),
};

