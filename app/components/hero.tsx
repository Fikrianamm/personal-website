import type { PortfolioProfile } from "~/types/database";
import { Reveal } from "~/components/reveal";

interface HeroProps {
  profile: PortfolioProfile;
  experienceCount: number;
}

export function Hero({ profile, experienceCount }: HeroProps) {
  const initials = profile.full_name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("");

  const firstName = profile.full_name.split(" ")[0];
  return (
    <section
      id="home"
      className="scroll-mt-24 border-b border-ink-faint"
      aria-labelledby="hero-title"
    >
      <div className="container-wide grid min-h-[calc(100svh-5rem)] items-center gap-14 py-16 md:grid-cols-[1.15fr_0.85fr] md:gap-16 md:py-20">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-7">Portfolio · Web development</p>
          <h1
            id="hero-title"
            className="text-[clamp(3.25rem,8vw,6.75rem)] font-semibold leading-[0.98] tracking-[-0.075em] bg-linear-to-l from-white to-black bg-clip-text text-transparent"
          >
            Hi, I'm {firstName}
            <span className="ml-1">.</span>
          </h1>
          <Reveal delay={1}>
            <p className="mt-7 max-w-2xl text-xl font-medium leading-snug tracking-tight text-ink-muted sm:text-2xl">
              {profile.headline}
            </p>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-5 max-w-2xl whitespace-pre-line text-base leading-8 text-ink-muted">
              {profile.bio}
            </p>
          </Reveal>

          <Reveal delay={3}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-ink px-6 text-sm font-medium text-paper transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink/85 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink motion-reduce:transition-none"
              >
                Lihat proyek
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href="#contact"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-ink-faint hover:border-ink  px-6 text-sm font-medium text-ink duration-200 hover:bg-paper-soft active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink hover:-translate-y-0.5 transition-all"
              >
                Hubungi saya
              </a>
              {profile.resume_url && (
                <a
                  href={profile.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-full px-4 text-sm font-medium text-ink-muted underline decoration-ink-faint underline-offset-4 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                >
                  Lihat resume
                </a>
              )}
            </div>
          </Reveal>

          <Reveal delay={4}>
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-ink-faint pt-6">
              {profile.location && (
                <p className="inline-flex items-center gap-2 text-sm text-ink-muted">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-ink"
                  />
                  {profile.location}
                </p>
              )}
            </div>
          </Reveal>
        </Reveal>

        <Reveal
          delay={2}
          className="group/avatar relative mx-auto w-full max-w-[26rem] md:justify-self-end"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-4 rounded-panel border border-ink-faint duration-700 group-hover/avatar:-rotate-2 group-hover/avatar:scale-[1.03] group-hover/avatar:border-ink/30 motion-reduce:transition-none transition-all"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-panel border border-ink-faint bg-paper-soft shadow-sm transition-all duration-700 group-hover/avatar:-translate-y-2 group-hover/avatar:rotate-1 group-hover/avatar:shadow-2xl motion-reduce:transition-none">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={`Potret ${profile.full_name}`}
                className="h-full w-full object-cover grayscale transition-[filter,transform] duration-700 group-hover/avatar:scale-105 group-hover/avatar:grayscale-0 motion-reduce:transition-none transition-all"
              />
            ) : (
              <div
                aria-label={`Inisial ${initials}`}
                className="flex h-full flex-col items-center justify-center"
              >
                <span
                  aria-hidden="true"
                  className="select-none text-[clamp(7rem,20vw,13rem)] font-semibold leading-none tracking-[-0.12em] text-ink"
                >
                  {initials}
                </span>
                <span className="mt-5 text-xs font-medium uppercase tracking-[0.2em] text-ink-soft">
                  Fullstack developer
                </span>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-paper/90 px-5 py-4 backdrop-blur-md">
              <div>
                <p className="text-sm font-semibold text-ink">
                  {profile.full_name}
                </p>
                <p className="mt-1 text-xs text-ink-muted">
                  {profile.location ?? "Web developer"}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-lg text-paper"
              >
                ↗
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
