import { useRef, useEffect, useMemo, useCallback, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/* ─── VS Code Screen Texture ─────────────────────────────────────── */

function createScreenTexture(): THREE.CanvasTexture {
  const w = 640;
  const h = 280;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;

  // Background – VS Code dark
  ctx.fillStyle = "#1e1e1e";
  ctx.fillRect(0, 0, w, h);

  // Activity bar (left edge)
  ctx.fillStyle = "#333333";
  ctx.fillRect(0, 0, 30, h);
  [30, 60, 90, 120, 150].forEach((y) => {
    ctx.fillStyle = "#858585";
    ctx.fillRect(8, y, 14, 14);
  });

  // File explorer sidebar
  ctx.fillStyle = "#252526";
  ctx.fillRect(30, 0, 120, h);
  ctx.fillStyle = "#cccccc";
  ctx.font = "bold 9px monospace";
  ctx.fillText("EXPLORER", 36, 16);

  const files = [
    { name: "▼ src", color: "#c5c5c5" },
    { name: "  ▼ components", color: "#c5c5c5" },
    { name: "    App.tsx", color: "#519aba" },
    { name: "    Hero.tsx", color: "#519aba" },
    { name: "    Navbar.tsx", color: "#519aba" },
    { name: "    Contact.tsx", color: "#519aba" },
    { name: "  index.css", color: "#563d7c" },
    { name: "  main.tsx", color: "#519aba" },
    { name: "package.json", color: "#cbcb41" },
    { name: "tsconfig.json", color: "#519aba" },
    { name: "vite.config.ts", color: "#519aba" },
  ];
  files.forEach((f, i) => {
    ctx.fillStyle = f.color;
    ctx.font = "8px monospace";
    ctx.fillText(f.name, 36, 34 + i * 13);
  });

  // Editor tabs bar
  ctx.fillStyle = "#2d2d2d";
  ctx.fillRect(150, 0, w - 150, 22);
  ctx.fillStyle = "#1e1e1e";
  ctx.fillRect(150, 0, 85, 22);
  ctx.fillStyle = "#ffffff";
  ctx.font = "9px monospace";
  ctx.fillText("Hero.tsx", 160, 14);
  ctx.fillStyle = "#969696";
  ctx.fillText("App.tsx", 248, 14);
  ctx.fillText("index.css", 310, 14);

  // Code lines
  const codeLines = [
    { text: 'import { motion } from "framer-motion";', color: "#c586c0" },
    { text: 'import { Canvas } from "@react-three/fiber";', color: "#c586c0" },
    { text: 'import { Briefcase, Mail } from "lucide-react";', color: "#c586c0" },
    { text: "", color: "" },
    { text: "const HeroSection = () => {", color: "#569cd6" },
    { text: "  return (", color: "#c586c0" },
    { text: '    <section className="relative min-h-screen">', color: "#569cd6" },
    { text: "      <motion.div", color: "#569cd6" },
    { text: '        initial={{ opacity: 0, y: 40 }}', color: "#9cdcfe" },
    { text: '        animate={{ opacity: 1, y: 0 }}', color: "#9cdcfe" },
    { text: '        transition={{ duration: 0.8 }}', color: "#9cdcfe" },
    { text: "      >", color: "#d4d4d4" },
    { text: '        <h1 className="text-7xl font-bold">', color: "#569cd6" },
    { text: "          Hi, I'm Aditya Patole", color: "#d4d4d4" },
  ];

  codeLines.forEach((line, i) => {
    ctx.fillStyle = "#6e7681";
    ctx.font = "8px monospace";
    ctx.fillText(String(i + 1).padStart(3, " "), 154, 38 + i * 12);
    if (!line.text) return;
    ctx.fillStyle = line.color;
    ctx.fillText(line.text, 178, 38 + i * 12);
  });

  // Terminal divider
  const termY = h - 80;
  ctx.fillStyle = "#007acc";
  ctx.fillRect(150, termY, w - 150, 1);

  // Terminal area
  ctx.fillStyle = "#1e1e1e";
  ctx.fillRect(150, termY + 1, w - 150, 79);
  ctx.fillStyle = "#2d2d2d";
  ctx.fillRect(150, termY + 1, w - 150, 15);
  ctx.fillStyle = "#cccccc";
  ctx.font = "8px monospace";
  ctx.fillText("TERMINAL", 158, termY + 11);

  const termLines = [
    { text: "$ npm run dev", color: "#4ec9b0" },
    { text: "", color: "" },
    { text: "> portfolio@1.0.0 dev", color: "#d4d4d4" },
    { text: "> vite", color: "#d4d4d4" },
    { text: "", color: "" },
    { text: "  VITE v5.4.19  ready in 312 ms", color: "#4ec9b0" },
    { text: "  ➜  Frontend URL: 10.10.801:80", color: "#6a9955" },
  ];
  termLines.forEach((line, i) => {
    if (!line.text) return;
    ctx.fillStyle = line.color;
    ctx.font = "8px monospace";
    ctx.fillText(line.text, 158, termY + 28 + i * 10);
  });

  // Status bar
  ctx.fillStyle = "#007acc";
  ctx.fillRect(0, h - 14, w, 14);
  ctx.fillStyle = "#ffffff";
  ctx.font = "7px monospace";
  ctx.fillText("UTF-8   TypeScript React   Ln 7, Col 12   Spaces: 2", 10, h - 4);

  const tex = new THREE.CanvasTexture(c);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}

/* ─── RGB Fan Texture ────────────────────────────────────────────── */

function createRGBFanTexture(hue: number): THREE.CanvasTexture {
  const s = 64;
  const c = document.createElement("canvas");
  c.width = s;
  c.height = s;
  const ctx = c.getContext("2d")!;

  ctx.fillStyle = "#111111";
  ctx.fillRect(0, 0, s, s);

  // Fan ring glow
  const grad = ctx.createRadialGradient(s / 2, s / 2, 4, s / 2, s / 2, s / 2 - 4);
  grad.addColorStop(0, `hsla(${hue}, 80%, 15%, 0.3)`);
  grad.addColorStop(0.5, `hsla(${hue}, 90%, 50%, 0.5)`);
  grad.addColorStop(0.8, `hsla(${hue}, 80%, 40%, 0.3)`);
  grad.addColorStop(1, "transparent");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(s / 2, s / 2, s / 2 - 2, 0, Math.PI * 2);
  ctx.fill();

  // Fan blades
  ctx.strokeStyle = `hsla(${hue}, 70%, 30%, 0.6)`;
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 7; i++) {
    const angle = (i / 7) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(s / 2, s / 2);
    ctx.lineTo(s / 2 + Math.cos(angle) * (s / 2 - 6), s / 2 + Math.sin(angle) * (s / 2 - 6));
    ctx.stroke();
  }

  // Center hub
  ctx.beginPath();
  ctx.arc(s / 2, s / 2, 6, 0, Math.PI * 2);
  ctx.fillStyle = "#222222";
  ctx.fill();

  const tex = new THREE.CanvasTexture(c);
  tex.minFilter = THREE.LinearFilter;
  return tex;
}

/* ─── Workstation Scene ──────────────────────────────────────────── */

function WorkstationScene() {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  const screenTexture = useMemo(() => createScreenTexture(), []);
  const fanTex1 = useMemo(() => createRGBFanTexture(142), []); // green
  const fanTex2 = useMemo(() => createRGBFanTexture(213), []); // blue
  const fanTex3 = useMemo(() => createRGBFanTexture(280), []); // purple

  useEffect(() => {
    return () => {
      screenTexture.dispose();
      fanTex1.dispose();
      fanTex2.dispose();
      fanTex3.dispose();
    };
  }, [screenTexture, fanTex1, fanTex2, fanTex3]);

  const handlePointerMove = useCallback(
    (e: { clientX: number; clientY: number }) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      targetRotation.current.x = -ny * 0.14; // ±8°
      targetRotation.current.y = nx * 0.21;   // ±12°
    },
    [],
  );

  useEffect(() => {
    window.addEventListener("mousemove", handlePointerMove);
    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, [handlePointerMove]);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotation.current.x,
      0.04,
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation.current.y,
      0.04,
    );
  });

  const platformColor = "#1c1c1e";
  const deviceColor = "#1a1a1a";
  const bezelColor = "#0d0d0d";
  const speakerColor = "#151515";
  const padColor = "#1a1a22";

  // Use suppressed size to avoid lint warning
  void size;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>

      {/* ═══ Premium Floating Platform (no legs, Apple showcase style) ═══ */}
      <RoundedBox args={[6.6, 0.1, 2.8]} position={[0, -1.15, 0]} radius={0.04} smoothness={4}>
        <meshStandardMaterial color={platformColor} roughness={0.25} metalness={0.8} />
      </RoundedBox>
      {/* Platform edge highlight (thin bright strip) */}
      <mesh position={[0, -1.1, 1.39]}>
        <boxGeometry args={[6.5, 0.02, 0.01]} />
        <meshStandardMaterial color="#333340" roughness={0.3} metalness={0.9} />
      </mesh>
      {/* Subtle under-glow */}
      <mesh position={[0, -1.21, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5.5, 2.2]} />
        <meshBasicMaterial color="#22c55e" transparent opacity={0.03} />
      </mesh>

      {/* ═══ Ultrawide Monitor ═══ */}
      {/* Bezel */}
      <RoundedBox args={[3.8, 1.65, 0.07]} position={[0, 0.05, -0.8]} radius={0.03} smoothness={4}>
        <meshStandardMaterial color={bezelColor} roughness={0.2} metalness={0.8} />
      </RoundedBox>
      {/* Screen */}
      <mesh position={[0, 0.07, -0.763]}>
        <planeGeometry args={[3.55, 1.45]} />
        <meshBasicMaterial map={screenTexture} />
      </mesh>
      {/* Chin (bottom bezel thicker) */}
      <mesh position={[0, -0.76, -0.8]}>
        <boxGeometry args={[3.78, 0.03, 0.072]} />
        <meshStandardMaterial color="#111111" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Monitor stand neck */}
      <RoundedBox args={[0.18, 0.55, 0.12]} position={[0, -0.82, -0.65]} radius={0.02} smoothness={4}>
        <meshStandardMaterial color={bezelColor} roughness={0.2} metalness={0.85} />
      </RoundedBox>
      {/* Monitor stand base */}
      <RoundedBox args={[0.9, 0.04, 0.45]} position={[0, -1.09, -0.55]} radius={0.02} smoothness={4}>
        <meshStandardMaterial color={bezelColor} roughness={0.2} metalness={0.85} />
      </RoundedBox>

      {/* ═══ Extended Mouse Pad ═══ */}
      <RoundedBox args={[3.2, 0.02, 1.1]} position={[0, -1.09, 0.35]} radius={0.01} smoothness={4}>
        <meshStandardMaterial color={padColor} roughness={0.9} metalness={0} />
      </RoundedBox>
      {/* Pad stitched edge (subtle highlight) */}
      <mesh position={[0, -1.075, 0.35]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.22, 1.12]} />
        <meshStandardMaterial color="#252530" roughness={0.8} transparent opacity={0.4} />
      </mesh>

      {/* ═══ Mechanical Keyboard ═══ */}
      <RoundedBox args={[1.9, 0.08, 0.55]} position={[0, -1.04, 0.25]} radius={0.02} smoothness={4}>
        <meshStandardMaterial color="#1d1d20" roughness={0.4} metalness={0.5} />
      </RoundedBox>
      {/* Key caps - rows */}
      {[0, 1, 2, 3, 4].map((row) => (
        <group key={`krow-${row}`}>
          {Array.from({ length: 14 }, (_, col) => (
            <mesh key={`key-${row}-${col}`} position={[-0.78 + col * 0.115, -0.995, 0.04 + row * 0.1]}>
              <boxGeometry args={[0.09, 0.02, 0.075]} />
              <meshStandardMaterial
                color={row === 0 && col < 12 ? "#2a2a2e" : "#252528"}
                roughness={0.6}
                metalness={0.3}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* ═══ Mouse ═══ */}
      <group position={[1.2, -1.03, 0.35]}>
        <RoundedBox args={[0.22, 0.1, 0.35]} radius={0.05} smoothness={4}>
          <meshStandardMaterial color="#1e1e21" roughness={0.35} metalness={0.5} />
        </RoundedBox>
        {/* Mouse scroll wheel */}
        <mesh position={[0, 0.05, -0.06]}>
          <cylinderGeometry args={[0.015, 0.015, 0.06, 12]} />
          <meshStandardMaterial color="#444444" roughness={0.5} metalness={0.6} />
        </mesh>
        {/* Mouse center line */}
        <mesh position={[0, 0.055, 0]}>
          <boxGeometry args={[0.004, 0.001, 0.25]} />
          <meshStandardMaterial color="#333333" roughness={0.4} />
        </mesh>
      </group>

      {/* ═══ Left Speaker ═══ */}
      <group position={[-2.35, -0.65, -0.3]}>
        <RoundedBox args={[0.4, 0.9, 0.35]} radius={0.03} smoothness={4}>
          <meshStandardMaterial color={speakerColor} roughness={0.5} metalness={0.4} />
        </RoundedBox>
        {/* Speaker cone upper */}
        <mesh position={[0.01, 0.15, 0.18]}>
          <circleGeometry args={[0.12, 24]} />
          <meshStandardMaterial color="#222222" roughness={0.7} metalness={0.3} />
        </mesh>
        {/* Speaker cone center */}
        <mesh position={[0.01, 0.15, 0.181]}>
          <circleGeometry args={[0.04, 16]} />
          <meshStandardMaterial color="#333333" roughness={0.5} metalness={0.4} />
        </mesh>
        {/* Tweeter */}
        <mesh position={[0.01, -0.15, 0.18]}>
          <circleGeometry args={[0.06, 20]} />
          <meshStandardMaterial color="#1e1e1e" roughness={0.6} metalness={0.4} />
        </mesh>
        {/* Speaker base led */}
        <mesh position={[0, -0.38, 0.18]}>
          <circleGeometry args={[0.015, 12]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={1.5} />
        </mesh>
      </group>

      {/* ═══ Right Speaker ═══ */}
      <group position={[2.35, -0.65, -0.3]}>
        <RoundedBox args={[0.4, 0.9, 0.35]} radius={0.03} smoothness={4}>
          <meshStandardMaterial color={speakerColor} roughness={0.5} metalness={0.4} />
        </RoundedBox>
        <mesh position={[-0.01, 0.15, 0.18]}>
          <circleGeometry args={[0.12, 24]} />
          <meshStandardMaterial color="#222222" roughness={0.7} metalness={0.3} />
        </mesh>
        <mesh position={[-0.01, 0.15, 0.181]}>
          <circleGeometry args={[0.04, 16]} />
          <meshStandardMaterial color="#333333" roughness={0.5} metalness={0.4} />
        </mesh>
        <mesh position={[-0.01, -0.15, 0.18]}>
          <circleGeometry args={[0.06, 20]} />
          <meshStandardMaterial color="#1e1e1e" roughness={0.6} metalness={0.4} />
        </mesh>
        <mesh position={[0, -0.38, 0.18]}>
          <circleGeometry args={[0.015, 12]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={1.5} />
        </mesh>
      </group>

      {/* ═══ PC Cabinet (on the right side of desk) ═══ */}
      <group position={[2.7, -0.4, -0.15]}>
        {/* Main case body */}
        <RoundedBox args={[0.65, 1.4, 1.2]} radius={0.03} smoothness={4}>
          <meshStandardMaterial color={deviceColor} roughness={0.35} metalness={0.65} />
        </RoundedBox>

        {/* Glass side panel (slightly inset, tinted) */}
        <mesh position={[-0.331, 0, 0]}>
          <planeGeometry args={[1.15, 1.3]} />
          <meshPhysicalMaterial
            color="#0a1628"
            transparent
            opacity={0.5}
            roughness={0.05}
            metalness={0.1}
            transmission={0.4}
          />
        </mesh>

        {/* Internal components visible through glass */}
        {/* Motherboard backplate */}
        <mesh position={[-0.28, 0, 0]}>
          <planeGeometry args={[1.0, 1.1]} />
          <meshStandardMaterial color="#0f1520" roughness={0.8} />
        </mesh>

        {/* RGB Fan 1 (top) */}
        <mesh position={[-0.27, 0.35, -0.3]}>
          <planeGeometry args={[0.32, 0.32]} />
          <meshBasicMaterial map={fanTex1} transparent />
        </mesh>
        {/* RGB Fan 2 (middle) */}
        <mesh position={[-0.27, 0, -0.3]}>
          <planeGeometry args={[0.32, 0.32]} />
          <meshBasicMaterial map={fanTex2} transparent />
        </mesh>
        {/* RGB Fan 3 (bottom) */}
        <mesh position={[-0.27, -0.35, -0.3]}>
          <planeGeometry args={[0.32, 0.32]} />
          <meshBasicMaterial map={fanTex3} transparent />
        </mesh>

        {/* GPU (horizontal slab) */}
        <mesh position={[-0.2, -0.1, 0.2]}>
          <boxGeometry args={[0.35, 0.06, 0.55]} />
          <meshStandardMaterial color="#1a1a22" roughness={0.4} metalness={0.6} />
        </mesh>

        {/* RAM sticks */}
        {[0, 1, 2, 3].map((i) => (
          <mesh key={`ram-${i}`} position={[-0.2, 0.3, 0.15 + i * 0.06]}>
            <boxGeometry args={[0.3, 0.02, 0.04]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#1a2a1a" : "#1a1a2a"}
              emissive={i % 2 === 0 ? "#22c55e" : "#3b82f6"}
              emissiveIntensity={0.3}
            />
          </mesh>
        ))}

        {/* Internal RGB ambient glow */}
        <pointLight position={[-0.15, 0, 0]} intensity={0.15} color="#22c55e" distance={2} />

        {/* Front panel power button */}
        <mesh position={[0.331, 0.55, 0]}>
          <circleGeometry args={[0.025, 16]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={2} />
        </mesh>

        {/* Front panel USB ports */}
        {[0.42, 0.38].map((y, i) => (
          <mesh key={`usb-${i}`} position={[0.331, y, 0]}>
            <planeGeometry args={[0.06, 0.02]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
        ))}

        {/* Front panel mesh ventilation */}
        {Array.from({ length: 8 }, (_, i) => (
          <mesh key={`vent-${i}`} position={[0.331, -0.3 + i * 0.07, 0]}>
            <planeGeometry args={[0.5, 0.015]} />
            <meshStandardMaterial color="#222222" />
          </mesh>
        ))}
      </group>

      {/* ═══ Subtle platform reflection ═══ */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.19, 0]}>
        <planeGeometry args={[6.8, 3]} />
        <meshStandardMaterial
          color={platformColor}
          roughness={0.9}
          metalness={0.05}
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}

/* ─── Exported Workstation Canvas ────────────────────────────────── */

const Workstation = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsMounted(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMounted(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (!isMounted) return null;

  return (
    <Canvas
      camera={{ position: [0, 2.2, 6.8], fov: 32 }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 6]} intensity={0.7} castShadow={false} />
      <directionalLight position={[-3, 3, 4]} intensity={0.25} />
      <directionalLight position={[0, -1, 3]} intensity={0.1} />
      <Environment preset="city" environmentIntensity={0.12} />
      <WorkstationScene />
    </Canvas>
  );
};

export default Workstation;
