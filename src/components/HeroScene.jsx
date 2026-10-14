import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import * as THREE from 'three';
import { Sculpture } from './Sculpture';
import { ErrorBoundary } from './ErrorBoundary';
import { WebGLFallback } from './WebGLFallback';

/**
 * Procedural PBR Studio Environment (100% Offline, Zero External Requests)
 * Generates an HDRI equirectangular reflection map on the GPU without external CDN dependencies.
 */
function ProceduralEnvironment() {
  const { gl, scene } = useThree();

  useEffect(() => {
    try {
      const pmremGenerator = new THREE.PMREMGenerator(gl);
      pmremGenerator.compileEquirectangularShader();
      const room = new RoomEnvironment();
      const envTexture = pmremGenerator.fromScene(room, 0.04).texture;
      scene.environment = envTexture;

      return () => {
        scene.environment = null;
        envTexture.dispose();
        pmremGenerator.dispose();
      };
    } catch (e) {
      console.warn('ProceduralEnvironment generation fallback to direct lighting:', e);
    }
  }, [gl, scene]);

  return null;
}

/**
 * Lightweight Geometric Wireframe Loader while the 17MB STL parses
 */
function SculptureLoader() {
  const meshRef = useRef();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 1.5;
      meshRef.current.rotation.x += delta * 0.8;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.55, 2]} />
        <meshBasicMaterial color="#9EDCFF" wireframe />
      </mesh>
    </group>
  );
}

/**
 * Camera & Controls Reset Controller
 */
function SceneContent({ reducedMotion, impulseCount, controlsRef }) {
  return (
    <>
      {/* Precision Studio Lighting */}
      {/* 1. Warm Key Light (4500K) */}
      <directionalLight
        position={[4, 5, 4.5]}
        intensity={3.4}
        color="#FFF4E6"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* 2. Ice-Blue Grazing Rim Light (9500K) */}
      <directionalLight
        position={[-5, 3, -4.5]}
        intensity={4.8}
        color="#9EDCFF"
      />

      {/* 3. Subtle Under-Fill Light */}
      <directionalLight
        position={[2, -4, 2]}
        intensity={1.8}
        color="#8B96A5"
      />

      {/* 4. Front Fill Light for Joint Definition */}
      <directionalLight
        position={[-2, 2, 5]}
        intensity={2.2}
        color="#E4EBF2"
      />

      {/* Ambient Base Level — Brightened to ensure no parts drop into background black */}
      <ambientLight intensity={1.3} color="#454D58" />

      {/* Procedural Offline Reflections */}
      <ProceduralEnvironment />

      {/* The Central Metallic Sculpture with Loader Fallback */}
      <Suspense fallback={<SculptureLoader />}>
        <Sculpture reducedMotion={reducedMotion} impulseCount={impulseCount} />
      </Suspense>

      {/* Interactive Orbit Drag Controls */}
      <OrbitControls
        ref={controlsRef}
        enableZoom={false} // Crucial: preserves normal page scroll
        enablePan={false}
        rotateSpeed={0.8}
        enableDamping={true}
        dampingFactor={0.06}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(Math.PI * 3) / 4}
      />
    </>
  );
}

export function HeroScene({ impulseCount, onCanvasClick, resetTrigger }) {
  const controlsRef = useRef();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  // Check WebGL availability
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setIsSupported(false);
      }
    } catch (e) {
      setIsSupported(false);
    }

    // Check prefers-reduced-motion media query
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (e) => setReducedMotion(e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  // Handle Reset View Trigger
  useEffect(() => {
    if (resetTrigger > 0 && controlsRef.current) {
      controlsRef.current.reset();
    }
  }, [resetTrigger]);

  if (!isSupported) {
    return <WebGLFallback />;
  }

  return (
    <ErrorBoundary fallback={<WebGLFallback />}>
      <div
        className="hero-canvas-container"
        onClick={onCanvasClick}
        role="region"
        aria-label="Interactive 3D Engineering Sculpture Viewport. Drag to rotate, click for rotational impulse."
      >
        <Canvas
          camera={{ position: [0, 0, 5.2], fov: 42 }}
          dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2)]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          onCreated={({ gl }) => {
            gl.setClearColor('#0B0D10', 0); // transparent background to blend seamlessly
          }}
        >
          <SceneContent
            reducedMotion={reducedMotion}
            impulseCount={impulseCount}
            controlsRef={controlsRef}
          />
        </Canvas>
      </div>
    </ErrorBoundary>
  );
}
