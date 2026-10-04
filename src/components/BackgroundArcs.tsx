import React from "react";

// Static, filter-free: feGaussianBlur + a perpetual transform animation forced a
// full-viewport re-rasterize every frame, which crawls under software rendering.
// Glow is faked with a wide low-opacity stroke under each arc.
const arcs = [
  { d: "M-100,200 Q400,100 1100,500", opacity: 0.5 },
  { d: "M-100,800 Q500,400 1100,900", opacity: 0.3 },
  { d: "M200,-100 Q800,500 200,1100", opacity: 0.2 }
];

export const BackgroundArcs: React.FC = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: -1,
        background: "var(--gf-color-background, #000000)",
        pointerEvents: "none",
        overflow: "hidden"
      }}
    >
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0
        }}
        fill="none"
        stroke="var(--gf-color-accent, #e879f9)"
      >
        {arcs.map(({ d, opacity }) => (
          <g key={d} opacity={opacity}>
            <path d={d} strokeWidth="10" opacity="0.25" />
            <path d={d} strokeWidth="2" />
          </g>
        ))}
      </svg>
    </div>
  );
};
