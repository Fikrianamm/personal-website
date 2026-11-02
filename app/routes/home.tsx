import { useState } from "react";
import type { Route } from "./+types/home";
import type {
  Json,
  PortfolioProfile,
  Profile,
  SocialLinks,
} from "~/types/database";
import { ExperienceCard } from "~/components/experience-card";
import { Footer } from "~/components/footer";
import { Hero } from "~/components/hero";
import { ProjectCard } from "~/components/project-card";
import { ProjectDetailDialog } from "~/components/project-detail-dialog";
import { Reveal } from "~/components/reveal";
import { SkillBadge } from "~/components/skill-badge";
import { createClient } from "~/lib/supabase.server";
import type { Project } from "~/types/database";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Fikri — Portfolio" },
    { name: "description", content: "Portfolio personal Fikri" },
  ];
}

function toSocialLinks(value: Json): SocialLinks {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return {};
  }

  const links: SocialLinks = {};
  for (const [platform, url] of Object.entries(value)) {
    if (typeof url === "string") {
      links[platform] = url;
    }
  }
  return links;
}

function toPortfolioProfile(profile: Profile | null): PortfolioProfile | null {
  if (!profile) {
    return null;
  }
  return { ...profile, social_links: toSocialLinks(profile.social_links) };
}

export async function loader({ request }: Route.LoaderArgs) {
  const { supabase } = createClient(request);
  const [profileRes, projectsRes, skillsRes, experiencesRes] =
    await Promise.all([
      supabase
        .from("profile")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase.from("projects").select("*").order("display_order"),
      supabase.from("skills").select("*").order("category").order("name"),
      supabase.from("experiences").select("*").order("display_order"),
    ]);

  const error =
    profileRes.error ??
    projectsRes.error ??
    skillsRes.error ??
    experiencesRes.error;

  if (error) {
    console.error("Failed to load portfolio data from Supabase:", error);
    throw new Response("Data portfolio gagal dimuat dari Supabase.", {
      status: 500,
    });
  }

  if (
    projectsRes.data === null ||
    skillsRes.data === null ||
    experiencesRes.data === null
  ) {
    console.error("Supabase returned no data for a portfolio collection.");
    throw new Response("Data portfolio gagal dimuat dari Supabase.", {
      status: 500,
    });
  }

  return {
    profile: toPortfolioProfile(profileRes.data),
    projects: projectsRes.data,
    skills: skillsRes.data,
    experiences: experiencesRes.data,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { profile, projects, skills, experiences } = loaderData;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const skillsByCategory = skills.reduce<Record<string, typeof skills>>(
    (groups, skill) => {
      groups[skill.category] ??= [];
      groups[skill.category].push(skill);
      return groups;
    },
    {},
  );
  const socialLinks = Object.entries(profile?.social_links ?? {}).filter(
    (entry): entry is [string, string] =>
      typeof entry[1] === "string" && entry[1].length > 0,
  );

  return (
    <div>
      {profile ? (
        <Hero profile={profile} experienceCount={experiences.length} />
      ) : (
        <section
          id="home"
          className="container-wide flex min-h-[70svh] scroll-mt-24 items-center py-20"
        >
          <div className="container-narrow">
            <p className="eyebrow">Portfolio · Web development</p>
            <h1 className="section-heading mt-6">Profil belum tersedia.</h1>
          </div>
        </section>
      )}

      <section
        id="about"
        className="section scroll-mt-24 border-b border-ink-faint"
      >
        <div className="container-wide grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <Reveal>
            <p className="eyebrow mb-5">01 · Tentang saya</p>
            <h2 className="section-heading">
              Membangun web yang terasa sederhana dan bekerja dengan baik.
            </h2>
          </Reveal>
          {profile ? (
            <Reveal delay={1}>
              <p className="section-intro text-lg">
                Saya mengerjakan produk web dari kebutuhan hingga implementasi,
                dengan perhatian pada alur yang jelas, kode yang terawat, dan
                pengalaman yang nyaman digunakan.
              </p>
              <dl className="mt-9 grid gap-px overflow-hidden rounded-panel border border-ink-faint bg-ink-faint sm:grid-cols-2">
                <div className="bg-paper p-5 sm:p-6">
                  <dt className="text-xs font-medium uppercase tracking-[0.14em] text-ink-soft">
                    Fokus
                  </dt>
                  <dd className="mt-2 text-sm font-medium leading-6">
                    {profile.headline}
                  </dd>
                </div>
                <div className="bg-paper p-5 sm:p-6">
                  <dt className="text-xs font-medium uppercase tracking-[0.14em] text-ink-soft">
                    Berbasis di
                  </dt>
                  <dd className="mt-2 text-sm font-medium leading-6">
                    {profile.location ?? "Terbuka untuk bekerja jarak jauh"}
                  </dd>
                </div>
                <div className="bg-paper p-5 sm:p-6">
                  <dt className="text-xs font-medium uppercase tracking-[0.14em] text-ink-soft">
                    Email
                  </dt>
                  <dd className="mt-2 break-all text-sm font-medium leading-6">
                    <a
                      href={`mailto:${profile.email}`}
                      className="underline decoration-ink-faint underline-offset-4 transition-colors hover:decoration-ink"
                    >
                      {profile.email}
                    </a>
                  </dd>
                </div>
                <div className="bg-paper p-5 sm:p-6">
                  <dt className="text-xs font-medium uppercase tracking-[0.14em] text-ink-soft">
                    Telepon
                  </dt>
                  <dd className="mt-2 text-sm font-medium leading-6">
                    {profile.phone ? (
                      <a
                        href={`tel:${profile.phone}`}
                        className="underline decoration-ink-faint underline-offset-4 transition-colors hover:decoration-ink"
                      >
                        {profile.phone}
                      </a>
                    ) : (
                      "Tersedia melalui email"
                    )}
                  </dd>
                </div>
              </dl>
            </Reveal>
          ) : (
            <p className="section-intro">Data profil belum tersedia.</p>
          )}
        </div>
      </section>

      <section
        id="skills"
        className="section scroll-mt-24 border-b border-ink-faint"
      >
        <div className="container-wide">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <Reveal>
              <p className="eyebrow mb-5">02 · Toolkit</p>
              <h2 className="section-heading">Teknologi yang saya gunakan.</h2>
            </Reveal>
            <Reveal delay={1} className="section-intro md:max-w-sm">
              <p>
                Kumpulan tools dan keahlian untuk merancang, membangun, dan
                mengembangkan produk digital.
              </p>
            </Reveal>
          </div>
          {skills.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {Object.entries(skillsByCategory).map(
                ([category, categorySkills], index) => (
                  <Reveal
                    key={category}
                    delay={index % 4}
                    className="group/skill relative overflow-hidden rounded-panel border border-ink-faint p-5 duration-300 hover:-translate-y-1 hover:border-ink/25 hover:shadow-lg sm:p-7 motion-reduce:transition-none transition-all"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -right-2 -top-8 select-none text-8xl font-semibold tracking-[-0.1em] text-ink/[0.035] transition-all duration-500 group-hover/skill:-translate-x-2 group-hover/skill:translate-y-2 motion-reduce:transition-none"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                      {category}
                    </h3>
                    <ul className="flex flex-wrap gap-2">
                      {categorySkills.map((skill) => (
                        <li key={skill.id}>
                          <SkillBadge skill={skill} />
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                ),
              )}
            </div>
          ) : (
            <p className="section-intro">Belum ada skill yang ditambahkan.</p>
          )}
        </div>
      </section>

      <section
        id="experience"
        className="section scroll-mt-24 border-b border-ink-faint"
      >
        <div className="container-wide">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <Reveal>
              <p className="eyebrow mb-5">03 · Perjalanan</p>
              <h2 className="section-heading">Pengalaman profesional.</h2>
            </Reveal>
            <Reveal delay={1} className="section-intro md:max-w-sm">
              <p>
                Peran dan kolaborasi yang membentuk cara saya membangun solusi
                digital.
              </p>
            </Reveal>
          </div>
          {experiences.length > 0 ? (
            <ol className="mx-auto max-w-5xl divide-y divide-ink-faint border-y border-ink-faint">
              {experiences.map((experience, index) => (
                <li key={experience.id}>
                  <Reveal delay={index % 4}>
                    <ExperienceCard experience={experience} index={index + 1} />
                  </Reveal>
                </li>
              ))}
            </ol>
          ) : (
            <p className="section-intro">
              Belum ada pengalaman yang ditambahkan.
            </p>
          )}
        </div>
      </section>

      <section
        id="projects"
        className="section scroll-mt-24 border-b border-ink-faint"
      >
        <div className="container-wide">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <Reveal>
              <p className="eyebrow mb-5">04 · Karya pilihan</p>
              <h2 className="section-heading">Proyek yang pernah saya buat.</h2>
            </Reveal>
            <Reveal delay={1} className="section-intro md:max-w-sm">
              <p>
                Berbagai aplikasi yang dibangun untuk menyelesaikan kebutuhan
                nyata.
              </p>
            </Reveal>
          </div>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <Reveal key={project.id} delay={index % 4} className="h-full">
                  <ProjectCard
                    project={project}
                    onOpen={() => setSelectedProject(project)}
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="section-intro">Belum ada project yang ditambahkan.</p>
          )}
        </div>
      </section>

      <section id="contact" className="section scroll-mt-24">
        <Reveal className="container-wide overflow-hidden rounded-panel border border-ink-faint bg-paper-soft px-6 py-12 sm:px-10 md:px-16 md:py-16">
          <p className="eyebrow mb-5">05 · Mari terhubung</p>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <Reveal>
                <h2 className="section-heading">
                  Punya ide untuk dikerjakan bersama?
                </h2>
              </Reveal>
              <Reveal delay={1}>
                <p className="section-intro mt-5">
                  Ceritakan kebutuhan atau rencana Anda. Saya terbuka untuk
                  berdiskusi dan berkolaborasi.
                </p>
              </Reveal>
            </div>
            {profile ? (
              <div className="flex shrink-0 flex-wrap gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-ink px-6 text-sm font-medium text-paper hover:bg-ink/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink hover:-translate-y-0.5 transition-all"
                >
                  Kirim email <span aria-hidden="true">↗</span>
                </a>
              </div>
            ) : (
              <p className="section-intro">Informasi kontak belum tersedia.</p>
            )}
          </div>
          {profile && (
            <div className="mt-10 border-t border-ink-faint pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
                Temukan saya
              </p>
              {socialLinks.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-3">
                  {socialLinks.map(([platform, url]) => (
                    <li key={platform}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink-faint bg-paper px-4 text-sm font-medium capitalize text-ink duration-200 hover:-translate-y-0.5 hover:bg-ink hover:text-paper active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none transition-all"
                      >
                        {platform}
                        <span aria-hidden="true">↗</span>
                        <span className="sr-only"> (buka di tab baru)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-ink-muted">
                  Hubungi saya melalui email untuk terhubung.
                </p>
              )}
            </div>
          )}
        </Reveal>
      </section>

      <Footer socialLinks={profile?.social_links} />
      {selectedProject && (
        <ProjectDetailDialog
          key={selectedProject.id}
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
