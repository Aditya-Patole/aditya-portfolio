import { useRef, useEffect, useMemo, useCallback, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

/* ─── Earth Texture (dark-themed, high-quality procedural) ────────── */

function createEarthTexture(): THREE.CanvasTexture {
  const w = 1024;
  const h = 512;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;

  // Deep dark ocean — matches portfolio background tone
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, h);
  oceanGrad.addColorStop(0, "#0b1a2e");
  oceanGrad.addColorStop(0.5, "#0f172a");
  oceanGrad.addColorStop(1, "#0b1a2e");
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, w, h);

  // Seeded random for deterministic output
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
    return x - Math.floor(x);
  };

  // Continents with better shapes and more detail
  const continents = [
    // North America
    { cx: 220, cy: 130, rx: 90, ry: 70, rot: -0.15, detail: 18 },
    // Central America
    { cx: 240, cy: 190, rx: 20, ry: 30, rot: 0.3, detail: 8 },
    // South America
    { cx: 290, cy: 300, rx: 50, ry: 90, rot: 0.1, detail: 15 },
    // Europe
    { cx: 520, cy: 110, rx: 55, ry: 40, rot: 0.1, detail: 14 },
    // Africa
    { cx: 540, cy: 260, rx: 60, ry: 95, rot: -0.03, detail: 16 },
    // Middle East
    { cx: 600, cy: 170, rx: 30, ry: 25, rot: 0.2, detail: 8 },
    // Asia
    { cx: 700, cy: 140, rx: 120, ry: 70, rot: 0.08, detail: 22 },
    // India
    { cx: 660, cy: 230, rx: 30, ry: 45, rot: -0.1, detail: 10 },
    // Southeast Asia
    { cx: 770, cy: 240, rx: 35, ry: 30, rot: 0.2, detail: 10 },
    // Japan
    { cx: 830, cy: 140, rx: 12, ry: 30, rot: 0.4, detail: 6 },
    // Australia
    { cx: 810, cy: 330, rx: 50, ry: 38, rot: 0.2, detail: 12 },
    // Greenland
    { cx: 360, cy: 60, rx: 40, ry: 28, rot: -0.1, detail: 8 },
    // Antarctica
    { cx: 512, cy: 480, rx: 200, ry: 30, rot: 0, detail: 12 },
  ];

  continents.forEach((cont) => {
    ctx.save();
    ctx.translate(cont.cx, cont.cy);
    ctx.rotate(cont.rot);

    // Base landmass with multi-stop gradient
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(cont.rx, cont.ry));
    grad.addColorStop(0, "rgba(34, 197, 94, 0.45)");
    grad.addColorStop(0.35, "rgba(34, 197, 94, 0.35)");
    grad.addColorStop(0.65, "rgba(22, 163, 74, 0.2)");
    grad.addColorStop(1, "rgba(20, 130, 60, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(0, 0, cont.rx, cont.ry, 0, 0, Math.PI * 2);
    ctx.fill();

    // Terrain variation — irregular coastline shapes
    for (let i = 0; i < cont.detail; i++) {
      const ox = (seededRandom(cont.cx + i * 17) - 0.5) * cont.rx * 1.4;
      const oy = (seededRandom(cont.cy + i * 31) - 0.5) * cont.ry * 1.4;
      const r = seededRandom(cont.cx * cont.cy + i * 7) * 20 + 6;
      ctx.beginPath();
      ctx.arc(ox, oy, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(34, 197, 94, ${0.08 + seededRandom(i * 13) * 0.18})`;
      ctx.fill();
    }

    // Mountain/highland regions (brighter spots)
    for (let i = 0; i < Math.floor(cont.detail * 0.4); i++) {
      const ox = (seededRandom(cont.cx * 3 + i * 23) - 0.5) * cont.rx * 0.7;
      const oy = (seededRandom(cont.cy * 3 + i * 37) - 0.5) * cont.ry * 0.7;
      const r = seededRandom(cont.cx + cont.cy + i) * 8 + 2;
      ctx.beginPath();
      ctx.arc(ox, oy, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(74, 222, 128, ${0.08 + seededRandom(i * 19) * 0.1})`;
      ctx.fill();
    }

    ctx.restore();
  });

  // City lights (small bright dots on land masses)
  const cityPositions = [
    [230, 150], [200, 120], [280, 290], [530, 120], [550, 250],
    [700, 130], [660, 220], [810, 320], [770, 240], [830, 140],
    [240, 180], [600, 160], [720, 160], [510, 100], [300, 310],
  ];
  cityPositions.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(253, 224, 71, 0.3)";
    ctx.fill();
    // Glow around city
    const glow = ctx.createRadialGradient(x, y, 0, x, y, 6);
    glow.addColorStop(0, "rgba(253, 224, 71, 0.1)");
    glow.addColorStop(1, "transparent");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fill();
  });

  // Latitude / longitude grid lines (very subtle)
  ctx.strokeStyle = "rgba(100, 180, 255, 0.025)";
  ctx.lineWidth = 0.5;
  for (let lat = 0; lat < h; lat += 32) {
    ctx.beginPath();
    ctx.moveTo(0, lat);
    ctx.lineTo(w, lat);
    ctx.stroke();
  }
  for (let lon = 0; lon < w; lon += 32) {
    ctx.beginPath();
    ctx.moveTo(lon, 0);
    ctx.lineTo(lon, h);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}

/* ─── Normal/bump map for surface depth ──────────────────────────── */

function createEarthBumpMap(): THREE.CanvasTexture {
  const w = 512;
  const h = 256;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;

  // Flat ocean (mid-gray = no displacement)
  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, w, h);

  const seededRandom = (seed: number) => {
    const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
    return x - Math.floor(x);
  };

  // Raised continents (lighter = raised)
  const continents = [
    { cx: 110, cy: 65, rx: 45, ry: 35 },
    { cx: 145, cy: 150, rx: 25, ry: 45 },
    { cx: 260, cy: 55, rx: 28, ry: 20 },
    { cx: 270, cy: 130, rx: 30, ry: 48 },
    { cx: 350, cy: 70, rx: 60, ry: 35 },
    { cx: 405, cy: 165, rx: 25, ry: 19 },
    { cx: 180, cy: 30, rx: 20, ry: 14 },
  ];

  continents.forEach((cont) => {
    const grad = ctx.createRadialGradient(cont.cx, cont.cy, 0, cont.cx, cont.cy, Math.max(cont.rx, cont.ry));
    grad.addColorStop(0, "#b0b0b0");
    grad.addColorStop(0.7, "#909090");
    grad.addColorStop(1, "#808080");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(cont.cx, cont.cy, cont.rx, cont.ry, 0, 0, Math.PI * 2);
    ctx.fill();

    // Mountain peaks
    for (let i = 0; i < 5; i++) {
      const ox = cont.cx + (seededRandom(cont.cx + i * 11) - 0.5) * cont.rx * 0.8;
      const oy = cont.cy + (seededRandom(cont.cy + i * 23) - 0.5) * cont.ry * 0.8;
      const r = seededRandom(i * 37) * 6 + 2;
      ctx.beginPath();
      ctx.arc(ox, oy, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${180 + Math.floor(seededRandom(i * 41) * 40)}, ${180 + Math.floor(seededRandom(i * 41) * 40)}, ${180 + Math.floor(seededRandom(i * 41) * 40)})`;
      ctx.fill();
    }
  });

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.minFilter = THREE.LinearFilter;
  return tex;
}

function createCloudTexture(): THREE.CanvasTexture {
  const w = 1024;
  const h = 512;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;

  ctx.clearRect(0, 0, w, h);

  // Wispy cloud bands — more realistic distribution
  // Tropical band
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * w;
    const y = h * 0.35 + (Math.random() - 0.5) * h * 0.3;
    const rw = Math.random() * 120 + 30;
    const rh = Math.random() * 10 + 4;
    ctx.beginPath();
    ctx.ellipse(x, y, rw, rh, Math.random() * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.05 + 0.02})`;
    ctx.fill();
  }
  // Polar bands
  for (let i = 0; i < 25; i++) {
    const x = Math.random() * w;
    const y = Math.random() < 0.5 ? Math.random() * 60 : h - Math.random() * 60;
    const rw = Math.random() * 100 + 40;
    const rh = Math.random() * 12 + 5;
    ctx.beginPath();
    ctx.ellipse(x, y, rw, rh, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.06 + 0.03})`;
    ctx.fill();
  }
  // Scattered individual clouds
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const rw = Math.random() * 60 + 10;
    const rh = Math.random() * 8 + 3;
    ctx.beginPath();
    ctx.ellipse(x, y, rw, rh, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.04 + 0.01})`;
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.minFilter = THREE.LinearFilter;
  return tex;
}

/* ─── Globe Scene ────────────────────────────────────────────────── */

function GlobeScene() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloud1Ref = useRef<THREE.Mesh>(null);
  const cloud2Ref = useRef<THREE.Mesh>(null);
  const cloud3Ref = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const isHovered = useRef(false);
  const timeRef = useRef(0);

  const earthTexture = useMemo(() => createEarthTexture(), []);
  const bumpMap = useMemo(() => createEarthBumpMap(), []);
  const cloudTexture1 = useMemo(() => createCloudTexture(), []);
  const cloudTexture2 = useMemo(() => createCloudTexture(), []);
  const cloudTexture3 = useMemo(() => createCloudTexture(), []);

  useEffect(() => {
    return () => {
      earthTexture.dispose();
      bumpMap.dispose();
      cloudTexture1.dispose();
      cloudTexture2.dispose();
      cloudTexture3.dispose();
    };
  }, [earthTexture, bumpMap, cloudTexture1, cloudTexture2, cloudTexture3]);

  const handlePointerOver = useCallback(() => {
    isHovered.current = true;
  }, []);

  const handlePointerOut = useCallback(() => {
    isHovered.current = false;
  }, []);

  useFrame((_, delta) => {
    timeRef.current += delta;
    const speed = isHovered.current ? 1.5 : 1;

    // Earth rotation
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.06 * delta * speed;
    }

    // Cloud layers — independent orbits, different speeds
    if (cloud1Ref.current) {
      cloud1Ref.current.rotation.y += 0.1 * delta * speed;
      cloud1Ref.current.rotation.x += 0.008 * delta * speed;
    }
    if (cloud2Ref.current) {
      cloud2Ref.current.rotation.y -= 0.05 * delta * speed;
      cloud2Ref.current.rotation.z += 0.012 * delta * speed;
    }
    if (cloud3Ref.current) {
      cloud3Ref.current.rotation.y += 0.07 * delta * speed;
      cloud3Ref.current.rotation.x -= 0.006 * delta * speed;
    }

    // Gentle floating motion
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(timeRef.current * 0.4) * 0.1;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Earth */}
      <Sphere ref={earthRef} args={[1.5, 96, 96]}>
        <meshStandardMaterial
          map={earthTexture}
          bumpMap={bumpMap}
          bumpScale={0.03}
          roughness={0.85}
          metalness={0.05}
        />
      </Sphere>

      {/* Inner atmosphere glow */}
      <Sphere args={[1.52, 64, 64]}>
        <meshPhongMaterial
          color="#3b82f6"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Cloud layer 1 — main equatorial */}
      <Sphere ref={cloud1Ref} args={[1.54, 64, 64]}>
        <meshPhongMaterial
          map={cloudTexture1}
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </Sphere>

      {/* Cloud layer 2 — counter-rotating */}
      <Sphere ref={cloud2Ref} args={[1.57, 48, 48]}>
        <meshPhongMaterial
          map={cloudTexture2}
          transparent
          opacity={0.25}
          depthWrite={false}
        />
      </Sphere>

      {/* Cloud layer 3 — high altitude */}
      <Sphere ref={cloud3Ref} args={[1.61, 48, 48]}>
        <meshPhongMaterial
          map={cloudTexture3}
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </Sphere>

      {/* Outer atmosphere rim — green from portfolio palette */}
      <Sphere args={[1.65, 48, 48]}>
        <meshPhongMaterial
          color="#22c55e"
          transparent
          opacity={0.025}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Blue atmosphere rim */}
      <Sphere args={[1.7, 48, 48]}>
        <meshPhongMaterial
          color="#3b82f6"
          transparent
          opacity={0.02}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

/* ─── Exported Globe Canvas ──────────────────────────────────────── */

const InteractiveGlobe = () => {
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
      camera={{ position: [0, 0, 4.5], fov: 38 }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[-4, 2, 5]} intensity={0.7} color="#ffffff" />
      <directionalLight position={[3, -1, 3]} intensity={0.12} color="#60a5fa" />
      <pointLight position={[-2, 3, 4]} intensity={0.15} color="#22c55e" />
      <pointLight position={[2, -2, 3]} intensity={0.08} color="#3b82f6" />
      <GlobeScene />
    </Canvas>
  );
};

export default InteractiveGlobe;
