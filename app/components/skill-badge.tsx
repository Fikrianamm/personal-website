import type { Skill } from "~/types/database";

interface SkillBadgeProps {
  skill: Skill;
}

export function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <span className="skill-card__badge inline-flex min-h-10 items-center gap-2 rounded-full border border-ink-faint bg-paper-soft px-3.5 py-2 text-sm font-medium text-ink motion-reduce:transition-none">
      {skill.icon_url
        ? (
          <img
            src={skill.icon_url}
            alt=""
            className="h-4 w-4 object-contain"
            aria-hidden="true"
          />
        )
        : (
          <span
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-[0.65rem] font-semibold text-paper"
            aria-hidden="true"
          >
            {skill.name.charAt(0).toUpperCase()}
          </span>
        )}
      <span>{skill.name}</span>
    </span>
  );
}
