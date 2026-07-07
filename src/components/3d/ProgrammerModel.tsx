import { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, useAnimations, OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

export function ProgrammerScene() {
  const { scene, animations } = useGLTF("/programmer.glb");
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

  // Rotate 180 deg around X to fix upside-down issue and center it
  return (
    <group ref={modelRef} position={[0, -0.5, 0]} scale={4} rotation={[Math.PI, Math.PI, 0]}>
      <primitive object={scene} />
    </group>
  );
}

const ProgrammerModel = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} />
      <directionalLight position={[-5, 5, 5]} intensity={1} />
      <Environment preset="city" environmentIntensity={0.8} />
      
      <ProgrammerScene />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
};

export default ProgrammerModel;

useGLTF.preload("/programmer.glb");
