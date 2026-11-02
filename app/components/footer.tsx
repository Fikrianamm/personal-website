import type { SocialLinks } from "~/types/database";

interface FooterProps {
  socialLinks?: SocialLinks;
}

export function Footer({ socialLinks }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const links = Object.entries(socialLinks ?? {}).filter(
    ([, url]) => typeof url === "string" && url.length > 0,
  );

  return (
    <footer className="border-t border-ink-faint">
      <div className="container-wide flex flex-col gap-6 py-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-muted">
          © {currentYear} Fikri Taufiqul Anam
        </p>
        <nav aria-label="Media sosial">
          {links.length > 0
            ? (
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {links.map(([platform, url]) => (
                  <li key={platform}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center text-sm font-medium capitalize text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                    >
                      {platform}
                      <span className="sr-only">(buka di tab baru)</span>
                    </a>
                  </li>
                ))}
              </ul>
            )
            : (
              <span className="text-xs text-ink-soft">
                Portfolio personal · Web developer
              </span>
            )}
        </nav>
      </div>
    </footer>
  );
}
