import type { Experience } from "~/types/database";

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

function formatDate(dateString: string): string {
  const date = new Date(`${dateString.slice(0, 10)}T00:00:00`);
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

export function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const {
    company,
    role,
    description,
    start_date,
    end_date,
    company_logo_url,
    skills,
  } = experience;

  const dateRange = `${formatDate(start_date)} — ${
    end_date ? formatDate(end_date) : "Sekarang"
  }`;

  return (
    <article className="grid gap-5 py-7 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6 md:grid-cols-[4rem_minmax(0,1fr)_auto] md:gap-8 md:py-9">
      <p
        aria-hidden="true"
        className="text-sm font-medium tabular-nums text-ink-soft"
      >
        {String(index).padStart(2, "0")}
      </p>

      <div className="flex min-w-0 items-start gap-4">
        {company_logo_url
          ? (
            <img
              src={company_logo_url}
              alt=""
              className="h-12 w-12 shrink-0 rounded-card object-contain"
              aria-hidden="true"
            />
          )
          : (
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-card bg-ink text-base font-semibold text-paper"
              aria-hidden="true"
            >
              {company.charAt(0).toUpperCase()}
            </div>
          )}

        <div className="min-w-0">
          <h3 className="text-lg font-semibold leading-snug tracking-tight text-ink sm:text-xl">
            {role}
          </h3>
          <p className="mt-1 text-sm font-medium text-ink-muted">{company}</p>
          {description && (
            <p className="mt-4 max-w-2xl text-sm leading-7 text-ink-muted">
              {description}
            </p>
          )}
          {skills && (
            <p className="mt-4 text-xs font-medium leading-6 text-ink-soft">
              {skills}
            </p>
          )}
        </div>
      </div>

      <p className="pl-16 text-xs font-medium text-ink-soft sm:col-start-2 sm:pl-16 md:col-start-auto md:pl-0 md:pt-1 md:text-right">
        {dateRange}
      </p>
    </article>
  );
}
