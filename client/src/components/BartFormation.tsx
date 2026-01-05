import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, Center, Sparkles, Float, Environment, PerspectiveCamera } from "@react-three/drei";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

function Particles({ count = 200 }) {
  // Generate random particles that float around
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 5;
      p[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return p;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#888888"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
}

function BartText() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Subtle rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Center>
        <Text3D
          ref={meshRef}
          font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
          size={3}
          height={0.5}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          BART
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.8}
            roughness={0.2}
            emissive="#333333"
            emissiveIntensity={0.2}
          />
        </Text3D>
      </Center>
    </Float>
  );
}

export default function BartFormation() {
  return (
    <div className="w-full h-[600px] relative overflow-hidden bg-gradient-to-b from-transparent to-background/20 rounded-xl border border-white/10">
      <div className="absolute inset-0 z-0">
        <Canvas gl={{ antialias: true, alpha: true }}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#475569" />
          
          <BartText />
          
          <Sparkles 
            count={150} 
            scale={12} 
            size={4} 
            speed={0.4} 
            opacity={0.5} 
            color="#ffffff" 
          />
          
          <Environment preset="city" />
        </Canvas>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none z-10">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-sm uppercase tracking-[0.5em] text-muted-foreground"
        >
          Bar Coin Protocol
        </motion.p>
      </div>
    </div>
  );
}
