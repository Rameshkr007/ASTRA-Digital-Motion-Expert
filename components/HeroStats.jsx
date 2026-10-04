"use client";

/**
 * HeroStats — animated metric display at the bottom of hero.
 * Three fictional design/performance metrics.
 */
export default function HeroStats() {
  const stats = [
    { index: "01", value: "92%", label: "Interaction" },
    { index: "02", value: "3.8x", label: "Faster Response" },
    { index: "03", value: "68%", label: "Visual Engagement" },
  ];

  return (
    <div
      className="flex flex-col md:flex-row gap-8 md:gap-0"
      role="list"
      aria-label="Performance metrics"
    >
      {stats.map((stat, i) => (
        <div
          key={stat.index}
          className="metric-item flex items-start gap-4 md:pr-12"
          id={`stat-${i}`}
          style={{ opacity: 0, transform: "translateY(20px)" }}
          role="listitem"
        >
          {/* Separator line */}
          {i > 0 && (
            <div
              className="hidden md:block self-stretch w-px"
              style={{ background: "var(--border)", marginRight: "2rem" }}
              aria-hidden="true"
            />
          )}

          <div className="flex flex-col gap-1">
            <span
              className="font-mono-custom"
              style={{ fontSize: "0.5rem", letterSpacing: "0.25em", color: "var(--text-muted)" }}
              aria-hidden="true"
            >
              {stat.index}
            </span>
            <span
              className="font-display"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "var(--text-primary)" }}
            >
              {stat.value}
            </span>
            <span
              className="font-mono-custom"
              style={{ fontSize: "0.6rem", letterSpacing: "0.18em", color: "var(--text-secondary)", textTransform: "uppercase" }}
            >
              {stat.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
