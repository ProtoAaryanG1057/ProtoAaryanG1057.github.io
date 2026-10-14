import React, { useRef, useMemo } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import * as THREE from 'three';

/**
 * FORM / FIELD — FlexWalk V2 3D CAD Model Viewport
 *
 * Renders the full 50 cm bipedal lower-body robotics assembly exported from Onshape.
 * Provides high-precision normal shading, metallic PBR alloy materials,
 * subtle idle kinematics, pointer parallax, and interactive impulses.
 */
export function Sculpture({ reducedMotion = false, impulseCount = 0 }) {
  const groupRef = useRef();
  const rawGeometry = useLoader(STLLoader, './models/Flexwalk_V2.stl');

  // Compute clean normals and center the geometry around (0, 0, 0)
  const geometry = useMemo(() => {
    if (!rawGeometry) return null;
    const g = rawGeometry.clone();
    g.computeVertexNormals();
    g.center();
    return g;
  }, [rawGeometry]);

  // Rotational impulse state
  const impulseRot = useRef({ x: 0, y: 0, velX: 0, velY: 0 });
  const prevImpulseCount = useRef(impulseCount);

  // Trigger rotational impulse when impulseCount increases
  if (impulseCount !== prevImpulseCount.current) {
    prevImpulseCount.current = impulseCount;
    impulseRot.current.velY += 0.85;
    impulseRot.current.velX += 0.25;
  }

  // Material: High-sheen precision metallic aerospace alloy with crisp PBR reflection highlights
  const cadMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D8E4EF'),
      metalness: 0.92,
      roughness: 0.20,
      envMapIntensity: 2.5,
      side: THREE.DoubleSide,
    });
  }, []);

  // Animation Loop with Pointer Tracking & Impulse Damping
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Damped rotational impulse decay
    impulseRot.current.velX *= 0.92;
    impulseRot.current.velY *= 0.92;
    impulseRot.current.x += impulseRot.current.velX * delta * 4;
    impulseRot.current.y += impulseRot.current.velY * delta * 4;

    if (!reducedMotion) {
      const time = state.clock.getElapsedTime();

      // Ambient subtle drift and natural breath
      const ambientY = Math.sin(time * 0.35) * 0.15 + time * 0.04;
      const ambientBob = Math.sin(time * 0.65) * 0.025;

      // Pointer tracking (subtle ~12 degree parallax)
      const targetMouseX = state.pointer.x * 0.24;
      const targetMouseY = -state.pointer.y * 0.16;

      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        ambientBob,
        0.05
      );

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetMouseY + impulseRot.current.x,
        0.06
      );

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        ambientY + targetMouseX + impulseRot.current.y,
        0.06
      );
    } else {
      groupRef.current.rotation.x = impulseRot.current.x;
      groupRef.current.rotation.y = impulseRot.current.y;
    }
  });

  if (!geometry) return null;

  return (
    <group ref={groupRef} dispose={null} position={[0, -0.05, 0]}>
      {/* CAD Model: rotated -90deg on X to stand vertical in Three.js coordinates (+Z in CAD = +Y in Three.js) */}
      <mesh
        geometry={geometry}
        material={cadMaterial}
        castShadow
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.0055, 0.0055, 0.0055]}
      />
    </group>
  );
}
