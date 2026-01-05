import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text3D, Center, Sparkles, Float, Environment, PerspectiveCamera } from "@react-three/drei";
import { useRef, useState, useMemo, useEffect, Suspense } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

function Particles({ count = 200 }) {
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

function BartText({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const textSize = isMobile ? 1.8 : 3;
  
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
          size={textSize}
          height={0.4}
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

function Scene({ isMobile }: { isMobile: boolean }) {
  const cameraZ = isMobile ? 12 : 8;
  
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, cameraZ]} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#475569" />
      <BartText isMobile={isMobile} />
      <Sparkles 
        count={isMobile ? 80 : 150} 
        scale={isMobile ? 8 : 12} 
        size={isMobile ? 3 : 4} 
        speed={0.4} 
        opacity={0.5} 
        color="#ffffff" 
      />
      <Environment preset="city" />
    </>
  );
}

function FallbackDisplay() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-background to-secondary/30">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h2 className="text-5xl sm:text-7xl md:text-9xl font-display font-black tracking-tighter text-foreground">
          BART
        </h2>
        <p className="text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.5em] text-muted-foreground mt-4">
          Bar Coin Protocol
        </p>
      </motion.div>
    </div>
  );
}

export default function BartFormation() {
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
      }
    } catch (e) {
      setWebGLSupported(false);
    }
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!webGLSupported || hasError) {
    return (
      <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] relative overflow-hidden bg-gradient-to-b from-transparent to-background/20 rounded-xl border border-white/10">
        <FallbackDisplay />
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] relative overflow-hidden bg-gradient-to-b from-transparent to-background/20 rounded-xl border border-white/10">
      <div className="absolute inset-0 z-0">
        <Canvas 
          gl={{ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false }}
          onCreated={() => {}}
          onError={() => setHasError(true)}
        >
          <Suspense fallback={null}>
            <Scene isMobile={isMobile} />
          </Suspense>
        </Canvas>
      </div>
      
      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 text-center pointer-events-none z-10">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.5em] text-muted-foreground"
        >
          Bar Coin Protocol
        </motion.p>
      </div>
    </div>
  );
}
