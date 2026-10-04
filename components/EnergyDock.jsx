"use client";
import { soundEngine } from "@/utils/audio";

/**
 * EnergyDock — Cyberpunk Core State Switcher.
 * Allows user to shift the quantum energy state of the ASTRA core:
 * - VIOLET: Default harmonic resonance
 * - EMERALD: High-efficiency algorithmic matrix
 * - SOLAR: High-energy thermal plasma
 * - OVERDRIVE: Supercharged hyper-flux speed
 */
export default function EnergyDock({ activeMode = "violet", onModeChange }) {
  const modes = [
    {
      id: "violet",
      name: "IONIC",
      color: "#a855f7",
      glow: "rgba(168, 85, 247, 0.4)",
      desc: "Default Plasma Flux",
    },
    {
      id: "emerald",
      name: "CYBER",
      color: "#10b981",
      glow: "rgba(16, 185, 129, 0.4)",
      desc: "Matrix Efficiency",
    },
    {
      id: "solar",
      name: "SOLAR",
      color: "#f59e0b",
      glow: "rgba(245, 158, 11, 0.4)",
      desc: "Thermal Radiation",
    },
    {
      id: "overdrive",
      name: "OVERDRIVE",
      color: "#ec4899",
      glow: "rgba(236, 72, 153, 0.5)",
      desc: "Maximum Velocity",
    },
  ];

  const handleSelect = (modeId) => {
    soundEngine.playModeShift(modeId);
    if (onModeChange) onModeChange(modeId);
  };

  return (
    <aside
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 p-1.5 rounded-full bg-[#08080f]/80 backdrop-blur-xl border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
      aria-label="Quantum Core Energy Mode Controller"
      role="toolbar"
    >
      <div className="hidden sm:flex items-center px-3 pl-4 border-r border-white/10">
        <span className="font-mono-custom text-[9px] tracking-[0.25em] text-white/40 uppercase">
          ENERGY STATE
        </span>
      </div>

      <div className="flex items-center gap-1">
        {modes.map((m) => {
          const isActive = activeMode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => handleSelect(m.id)}
              onMouseEnter={() => soundEngine.playHover()}
              data-cursor="open"
              className={`relative px-3.5 py-1.5 rounded-full transition-all duration-300 font-mono-custom text-[10px] tracking-wider uppercase flex items-center gap-2 ${
                isActive
                  ? "bg-white/10 text-white border border-white/25 shadow-lg"
                  : "text-white/40 hover:text-white/80 hover:bg-white/5"
              }`}
              style={{
                boxShadow: isActive ? `0 0 15px ${m.glow}` : "none",
              }}
              title={m.desc}
            >
              <span
                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: m.color,
                  boxShadow: isActive ? `0 0 8px ${m.color}` : "none",
                }}
              />
              <span>{m.name}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
