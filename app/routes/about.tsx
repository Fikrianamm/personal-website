import type { Route } from "./+types/about";
import { supabase } from "~/lib/supabase.server";
import type { Profile, Skill, Experience } from "~/types/database";
import { defaultProfile } from "~/lib/default-profile";
import { SkillBadge } from "~/components/skill-badge";
import { ExperienceCard } from "~/components/experience-card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About — Fikri" },
    { name: "description", content: "About Fikri — background, skills, and experience" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const [profileRes, skillsRes, experiencesRes] = await Promise.all([
    supabase.from("profile").select("*").single(),
    supabase.from("skills").select("*").order("display_order"),
    supabase.from("experiences").select("*").order("start_date", { ascending: false }),
  ]);

  return {
    profile: (profileRes.data as Profile | null) ?? defaultProfile,
    skills: (skillsRes.data ?? []) as Skill[],
    experiences: (experiencesRes.data ?? []) as Experience[],
  };
}

export default function About({ loaderData }: Route.ComponentProps) {
  const { profile, skills, experiences } = loaderData;

  // Group skills by category
  const skillsByCategory = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div>
      {/* Profile Section */}
      {profile && (
        <section className="section">
          <div className="container-wide">
            <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
              {/* Avatar */}
              <div className="shrink-0">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.full_name}
                    className="w-48 h-48 rounded-full object-cover shadow-lg"
                  />
                ) : (
                  <div className="w-48 h-48 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-400">
                      {profile.full_name?.charAt(0) ?? "?"}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold mb-2">{profile.full_name}</h1>
                {profile.headline && (
                  <p className="text-xl text-primary-600 dark:text-primary-400 font-medium mb-4">
                    {profile.headline}
                  </p>
                )}
                {profile.bio && (
                  <div className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 max-w-2xl">
                    {profile.bio.split("\n").map((paragraph, i) => (
                      <p key={i} className="mb-3">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
                {profile.resume_url && (
                  <a
                    href={profile.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Resume
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="section bg-gray-50 dark:bg-gray-900">
          <div className="container-wide">
            <h2 className="text-3xl font-bold text-center mb-12">Skills & Tech Stack</h2>
            <div className="space-y-8">
              {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-4">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {categorySkills.map((skill) => (
                      <SkillBadge key={skill.id} skill={skill} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {experiences.length > 0 && (
        <section className="section">
          <div className="container-wide">
            <h2 className="text-3xl font-bold text-center mb-12">Work Experience</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {experiences.map((experience) => (
                <ExperienceCard key={experience.id} experience={experience} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
