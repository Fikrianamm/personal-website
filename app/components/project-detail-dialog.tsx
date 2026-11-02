import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import type { Project } from "~/types/database";

interface ProjectDetailDialogProps {
  project: Project;
  onClose: () => void;
}

export function ProjectDetailDialog({
  project,
  onClose,
}: ProjectDetailDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeImage, setActiveImage] = useState(0);
  const images = project.thumbnail_url
    ? [
      project.thumbnail_url,
      ...project.images.filter((image) => image !== project.thumbnail_url),
    ]
    : project.images;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  function showPreviousImage() {
    setActiveImage((index) => (index - 1 + images.length) % images.length);
  }

  function showNextImage() {
    setActiveImage((index) => (index + 1) % images.length);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      dialogRef.current?.close();
      return;
    }

    if (event.key === "ArrowLeft" && images.length > 1) {
      event.preventDefault();
      showPreviousImage();
    }

    if (event.key === "ArrowRight" && images.length > 1) {
      event.preventDefault();
      showNextImage();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="project-dialog-title"
      aria-describedby="project-dialog-description"
      className="project-dialog m-auto max-h-[min(90dvh,52rem)] w-[min(94vw,64rem)] max-w-none overflow-y-auto rounded-panel border border-ink-faint bg-paper p-0 text-ink shadow-2xl backdrop:bg-ink/50 backdrop:backdrop-blur-sm"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          dialogRef.current?.close();
        }
      }}
      onKeyDown={handleKeyDown}
      onCancel={(event) => {
        event.preventDefault();
        dialogRef.current?.close();
      }}
    >
      <div className="flex items-start justify-between gap-6 border-b border-ink-faint px-5 py-4 sm:px-8">
        <div className="min-w-0">
          <p className="eyebrow mb-2">Detail proyek</p>
          <h2
            id="project-dialog-title"
            className="text-xl font-semibold leading-snug tracking-tight sm:text-2xl"
          >
            {project.title}
          </h2>
        </div>
        <button
          type="button"
          autoFocus
          onClick={() => dialogRef.current?.close()}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink-faint text-ink transition-colors hover:bg-paper-soft active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          aria-label="Tutup detail proyek"
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6l12 12M18 6L6 18"
            />
          </svg>
        </button>
      </div>

      <div className="grid gap-0 md:grid-cols-[1.2fr_0.8fr]">
        <div className="relative min-h-64 bg-paper-soft md:min-h-[27rem]">
          {images.length > 0
            ? (
              <>
                <img
                  key={images[activeImage]}
                  src={images[activeImage]}
                  alt={`${project.title} — gambar ${activeImage + 1}`}
                  className="project-carousel-image absolute inset-0 h-full w-full object-contain p-3 sm:p-6"
                />
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={showPreviousImage}
                      className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink-faint bg-paper/95 text-ink shadow-sm transition-colors hover:bg-paper active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                      aria-label="Gambar sebelumnya"
                    >
                      <span aria-hidden="true" className="text-xl">←</span>
                    </button>
                    <button
                      type="button"
                      onClick={showNextImage}
                      className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink-faint bg-paper/95 text-ink shadow-sm transition-colors hover:bg-paper active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                      aria-label="Gambar berikutnya"
                    >
                      <span aria-hidden="true" className="text-xl">→</span>
                    </button>
                    <p
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-paper/95 px-3 py-1 text-xs font-medium text-ink"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {activeImage + 1} / {images.length}
                    </p>
                  </>
                )}
              </>
            )
            : (
              <div className="flex min-h-64 items-center justify-center p-8 text-center text-sm text-ink-muted md:min-h-[27rem]">
                Gambar proyek belum tersedia.
              </div>
            )}
        </div>

        <div className="flex flex-col p-5 sm:p-8">
          <p
            id="project-dialog-description"
            className="whitespace-pre-line text-sm leading-7 text-ink-muted"
          >
            {project.description}
          </p>

          {project.tech_stack.length > 0 && (
            <div className="mt-7">
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
                Teknologi
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.tech_stack.map((technology) => (
                  <li
                    key={technology}
                    className="rounded-full border border-ink-faint px-3 py-1.5 text-xs font-medium text-ink"
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(project.live_url || project.source_url) && (
            <div className="mt-auto flex flex-wrap gap-3 pt-8">
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-paper transition-colors hover:bg-ink/85 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                >
                  Buka proyek <span aria-hidden="true">↗</span>
                </a>
              )}
              {project.source_url && (
                <a
                  href={project.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink-faint px-5 text-sm font-medium text-ink transition-colors hover:bg-paper-soft active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                >
                  Source code <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}
