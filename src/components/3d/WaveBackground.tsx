import { useEffect, useRef } from "react";

/**
 * Animated concentric wave/ring SVG background.
 * Renders behind the 3D workstation in the Hero section.
 * Uses existing portfolio color palette at very low opacity.
 */
const WaveBackground = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.004;
      const svg = svgRef.current;
      if (!svg) return;

      const ellipses = svg.querySelectorAll("ellipse");
      ellipses.forEach((el, i) => {
        const baseRx = 60 + i * 50;
        const baseRy = 40 + i * 35;
        const phase = i * 0.4;
        const rx = baseRx + Math.sin(time + phase) * 8;
        const ry = baseRy + Math.cos(time + phase * 0.7) * 6;
        el.setAttribute("rx", String(rx));
        el.setAttribute("ry", String(ry));
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const rings = Array.from({ length: 7 }, (_, i) => i);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 500 400"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {rings.map((i) => (
        <ellipse
          key={i}
          cx="250"
          cy="200"
          rx={60 + i * 50}
          ry={40 + i * 35}
          fill="none"
          stroke={i % 2 === 0 ? "hsl(142 71% 45%)" : "hsl(213 94% 68%)"}
          strokeWidth="0.5"
          opacity={0.04 + (7 - i) * 0.008}
        />
      ))}
    </svg>
  );
};

export default WaveBackground;
