import type { Project } from "~/types/database";

interface ProjectCardProps {
  project: Project;
  onOpen: () => void;
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const {
    title,
    description,
    thumbnail_url,
    tech_stack,
    live_url,
    source_url,
  } = project;

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-panel border border-ink-faint bg-paper duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none transition-all">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-ink-faint bg-paper-soft">
        {thumbnail_url
          ? (
            <img
              src={thumbnail_url}
              alt={`Tampilan ${title}`}
              className="h-full w-full object-cover grayscale duration-700 group-hover:scale-[1.04] group-hover:grayscale-0 motion-reduce:transition-none transition-all"
            />
          )
          : (
            <div
              aria-hidden="true"
              className="flex h-full items-center justify-center"
            >
              <span className="text-6xl font-semibold tracking-[-0.08em] text-ink-faint">
                {title.charAt(0)}
              </span>
            </div>
          )}
        {project.is_featured && (
          <span className="absolute left-4 top-4 rounded-full border border-ink-faint bg-paper/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-ink backdrop-blur-sm">
            Pilihan
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-semibold leading-snug tracking-tight text-ink sm:text-xl">
          {title}
        </h3>
        <p className="mt-3 line-clamp-4 text-sm leading-7 text-ink-muted">
          {description}
        </p>

        {tech_stack.length > 0 && (
          <ul
            aria-label={`Teknologi ${title}`}
            className="mt-5 flex flex-wrap gap-2"
          >
            {tech_stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full bg-paper-soft px-3 py-1 text-xs font-medium text-ink-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          onClick={onOpen}
          className="mt-6 inline-flex min-h-11 w-full items-center justify-between rounded-full border border-ink-faint px-4 text-sm font-medium text-ink transition-[background-color,color,transform] duration-200 hover:bg-ink hover:text-paper active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none"
          aria-label={`Lihat detail ${title}`}
        >
          Lihat detail proyek
          <span aria-hidden="true" className="text-lg">↗</span>
        </button>

        {(live_url || source_url) && (
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 border-t border-ink-faint pt-3">
            {live_url && (
              <a
                href={live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink underline decoration-ink-faint underline-offset-4 transition-colors hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                Demo langsung <span aria-hidden="true">↗</span>
              </a>
            )}
            {source_url && (
              <a
                href={source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink underline decoration-ink-faint underline-offset-4 transition-colors hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                Source code <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
