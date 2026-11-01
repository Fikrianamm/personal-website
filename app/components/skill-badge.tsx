import type { Skill } from "~/types/database";

interface SkillBadgeProps {
  skill: Skill;
}

const categoryColors: Record<string, string> = {
  Frontend:
    "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-950 dark:text-blue-300 dark:ring-blue-400/20",
  Backend:
    "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-950 dark:text-green-300 dark:ring-green-400/20",
  Tools:
    "bg-purple-50 text-purple-700 ring-purple-600/20 dark:bg-purple-950 dark:text-purple-300 dark:ring-purple-400/20",
  Database:
    "bg-orange-50 text-orange-700 ring-orange-600/20 dark:bg-orange-950 dark:text-orange-300 dark:ring-orange-400/20",
};

const defaultColor =
  "bg-gray-50 text-gray-700 ring-gray-600/20 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-400/20";

export function SkillBadge({ skill }: SkillBadgeProps) {
  const colorClasses = categoryColors[skill.category] ?? defaultColor;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ring-1 ring-inset ${colorClasses}`}
    >
      {skill.icon_url ? (
        <img
          src={skill.icon_url}
          alt=""
          className="h-4 w-4 object-contain"
          aria-hidden="true"
        />
      ) : (
        <span
          className="flex h-5 w-5 items-center justify-center rounded-full bg-current/10 text-xs font-bold"
          aria-hidden="true"
        >
          {skill.name.charAt(0).toUpperCase()}
        </span>
      )}
      {skill.name}
    </span>
  );
}
