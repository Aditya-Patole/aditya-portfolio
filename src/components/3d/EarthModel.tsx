import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

export function EarthScene() {
  const { scene, animations } = useGLTF("/earth.glb");
  const modelRef = useRef<THREE.Group>(null);
  const { actions } = useAnimations(animations, modelRef);

  useEffect(() => {
    // Play all animations if they exist
    if (actions) {
      Object.values(actions).forEach((action) => {
        if (action) action.play();
      });
    }
  }, [actions]);

  // Rotate the earth slowly
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={modelRef} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}

const EarthModel = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 45 }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 3, 5]} intensity={1} />
      <directionalLight position={[-5, 3, -5]} intensity={0.5} />
      <Environment preset="city" environmentIntensity={0.5} />
      
      <EarthScene />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
      />
    </Canvas>
  );
};

export default EarthModel;

useGLTF.preload("/earth.glb");
