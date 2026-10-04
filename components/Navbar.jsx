"use client";

/**
 * Navbar — futuristic minimal navigation with status indicator.
 * Fixed, minimal, with hover underline transitions.
 */
export default function Navbar({ visible = false }) {
  const links = ["EXPERIENCE", "SYSTEM", "ABOUT"];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ opacity: 0 }}
      id="navbar"
      role="banner"
    >
      <nav
        className="flex items-center justify-between px-8 py-6"
        aria-label="Primary navigation"
      >
        {/* Logo */}
        <div className="flex flex-col items-start gap-1">
          <span
            className="font-display text-sm tracking-[0.4em] text-white"
            style={{ fontSize: "0.85rem", letterSpacing: "0.4em" }}
            aria-label="ASTRA"
          >
            ASTRA
          </span>
          <span
            className="font-mono-custom"
            style={{ fontSize: "0.45rem", letterSpacing: "0.25em", color: "var(--text-muted)" }}
          >
            / 01
          </span>
        </div>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-10" role="list">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="nav-link font-mono-custom"
                aria-label={link}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Status */}
        <div className="flex items-center gap-2.5" aria-label="System status: online">
          <div className="status-dot" aria-hidden="true" />
          <span
            className="font-mono-custom"
            style={{ fontSize: "0.55rem", letterSpacing: "0.2em", color: "var(--text-secondary)" }}
          >
            SYSTEM ONLINE
          </span>
        </div>
      </nav>
    </header>
  );
}
