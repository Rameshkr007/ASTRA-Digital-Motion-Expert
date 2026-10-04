"use client";

/**
 * FloatingLabels — floating text labels that appear during scroll stages.
 * Each label moves independently with parallax via GSAP ScrollTrigger.
 */
export default function FloatingLabels() {
  const labels = [
    { id: "fl-core", text: "CORE", top: "20%", left: "8%" },
    { id: "fl-energy", text: "ENERGY", top: "35%", right: "8%" },
    { id: "fl-motion", text: "MOTION", bottom: "30%", left: "10%" },
    { id: "fl-system", text: "SYSTEM", bottom: "20%", right: "10%" },
  ];

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      id="floating-labels-container"
    >
      {labels.map((label) => (
        <div
          key={label.id}
          id={label.id}
          className="floating-label font-mono-custom"
          style={{
            top: label.top,
            left: label.left,
            right: label.right,
            bottom: label.bottom,
            opacity: 0,
            transform: "translateY(8px)",
          }}
        >
          {label.text}
        </div>
      ))}

      {/* Connecting lines (SVG overlay) */}
      <svg
        id="connect-svg"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0 }}
        aria-hidden="true"
      >
        <line
          id="connect-line-1"
          x1="12%" y1="22%"
          x2="42%" y2="45%"
          stroke="rgba(124,91,245,0.15)"
          strokeWidth="0.8"
          strokeDasharray="4,6"
        />
        <line
          id="connect-line-2"
          x1="88%" y1="38%"
          x2="58%" y2="45%"
          stroke="rgba(0,212,255,0.12)"
          strokeWidth="0.8"
          strokeDasharray="4,6"
        />
        <line
          id="connect-line-3"
          x1="14%" y1="72%"
          x2="44%" y2="55%"
          stroke="rgba(74,158,255,0.12)"
          strokeWidth="0.8"
          strokeDasharray="4,6"
        />
        <line
          id="connect-line-4"
          x1="86%" y1="78%"
          x2="56%" y2="55%"
          stroke="rgba(124,91,245,0.12)"
          strokeWidth="0.8"
          strokeDasharray="4,6"
        />
      </svg>
    </div>
  );
}
