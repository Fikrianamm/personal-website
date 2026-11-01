import type { Route } from "./+types/projects";
import { supabase } from "~/lib/supabase.server";
import type { Project } from "~/types/database";
import { ProjectCard } from "~/components/project-card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects — Fikri" },
    { name: "description", content: "Projects and works by Fikri" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("display_order");

  return {
    projects: (data ?? []) as Project[],
  };
}

export default function Projects({ loaderData }: Route.ComponentProps) {
  const { projects } = loaderData;

  return (
    <div>
      <section className="section">
        <div className="container-wide">
          <h1 className="text-4xl font-bold text-center mb-4">Projects</h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12">
            Semua project yang sudah saya kerjakan
          </p>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Belum ada project yang ditambahkan.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
