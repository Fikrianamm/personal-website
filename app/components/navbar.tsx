import { useEffect, useState } from "react";

const navLinks = [
  { to: "#home", label: "Beranda" },
  { to: "#about", label: "Tentang" },
  { to: "#skills", label: "Keahlian" },
  { to: "#experience", label: "Pengalaman" },
  { to: "#projects", label: "Proyek" },
  { to: "#contact", label: "Kontak" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled((current) => {
        const next = window.scrollY > 24;
        return current === next ? current : next;
      });
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-out motion-reduce:transition-none ${
        isScrolled
          ? "border-ink-faint bg-paper/60 shadow-sm backdrop-blur-xl"
          : "border-transparent bg-paper"
      }`}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setIsOpen(false);
        }
      }}
    >
      <nav
        aria-label="Navigasi utama"
        className={`container-wide flex items-center justify-between transition-[padding] duration-300 ease-out motion-reduce:transition-none ${
          isScrolled ? "py-3" : "py-5"
        }`}
      >
        <a
          href="#home"
          onClick={() => setIsOpen(false)}
          className="group inline-flex min-h-11 items-center gap-2 rounded-sm text-xl font-semibold tracking-tight text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          <span>Fikri Anam.</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <a
                href={link.to}
                className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-ink-muted transition-colors duration-200 hover:bg-paper-soft hover:text-ink active:bg-ink/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-faint text-ink transition-colors hover:bg-paper-soft active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:hidden"
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            {isOpen
              ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6l12 12M18 6L6 18"
                />
              )
              : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 7h16M4 12h16M4 17h16"
                />
              )}
          </svg>
        </button>
      </nav>

      <div
        id="mobile-navigation"
        className={`border-t border-ink-faint px-4 pb-4 pt-3 lg:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-1 sm:grid-cols-3">
          {navLinks.map((link) => (
            <li key={link.to}>
              <a
                href={link.to}
                onClick={() => setIsOpen(false)}
                className="flex min-h-11 items-center rounded-card px-3 text-sm font-medium text-ink-muted transition-colors hover:bg-paper-soft hover:text-ink active:bg-ink/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
