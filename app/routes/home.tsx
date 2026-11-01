import type { Route } from "./+types/home";
import { supabase } from "~/lib/supabase.server";
import type { Profile, Project, Skill } from "~/types/database";
import { defaultProfile } from "~/lib/default-profile";
import { Hero } from "~/components/hero";
import { ProjectCard } from "~/components/project-card";
import { SkillBadge } from "~/components/skill-badge";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Fikri — Portfolio" },
    { name: "description", content: "Personal portfolio website" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const [profileRes, projectsRes, skillsRes] = await Promise.all([
    supabase.from("profile").select("*").single(),
    supabase.from("projects").select("*").eq("is_featured", true).order("display_order"),
    supabase.from("skills").select("*").order("display_order"),
  ]);

  return {
    profile: (profileRes.data as Profile | null) ?? defaultProfile,
    featuredProjects: (projectsRes.data ?? []) as Project[],
    skills: (skillsRes.data ?? []) as Skill[],
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { profile, featuredProjects, skills } = loaderData;

  // Group skills by category
  const skillsByCategory = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div>
      {/* Hero Section */}
      {profile && <Hero profile={profile} />}

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="section bg-gray-50 dark:bg-gray-900">
          <div className="container-wide">
            <h2 className="text-3xl font-bold text-center mb-12">Skills & Tech Stack</h2>
            <div className="space-y-8">
              {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-4">{category}</h3>
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

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="section">
          <div className="container-wide">
            <h2 className="text-3xl font-bold text-center mb-4">Featured Projects</h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-12">Beberapa project pilihan yang sudah saya kerjakan</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
