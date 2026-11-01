import type { Experience } from "~/types/database";

interface ExperienceCardProps {
  experience: Experience;
}

const months = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const { company, role, description, start_date, end_date, company_logo_url } =
    experience;

  const dateRange = `${formatDate(start_date)} - ${end_date ? formatDate(end_date) : "Sekarang"}`;

  return (
    <div className="relative pl-8 pb-10 last:pb-0">
      {/* Timeline line */}
      <div className="absolute top-0 left-[7px] h-full w-px bg-gray-200 last:hidden dark:bg-gray-700" />

      {/* Timeline dot */}
      <div className="absolute top-1 left-0 h-[15px] w-[15px] rounded-full border-[3px] border-primary-500 bg-white dark:bg-gray-950" />

      <div className="flex gap-4">
        {/* Company logo */}
        <div className="hidden shrink-0 sm:block">
          {company_logo_url ? (
            <img
              src={company_logo_url}
              alt={company}
              className="h-12 w-12 rounded-lg border border-gray-200 object-contain dark:border-gray-700"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-lg font-bold text-primary-600 dark:bg-primary-950 dark:text-primary-400">
              {company.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {role}
          </h3>
          <p className="mt-0.5 text-sm font-medium text-primary-600 dark:text-primary-400">
            {company}
          </p>
          <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
            {dateRange}
          </p>
          {description && (
            <p className="mt-3 leading-relaxed text-gray-600 dark:text-gray-300">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
