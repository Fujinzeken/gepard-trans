"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "./use-reduced-motion";

/**
 * Procedural, stylized Class-8 semi (Cascadia-inspired sleeper cab) with a
 * swappable trailer. Built from primitives on purpose: no model download,
 * no licensing questions. At promotion this component is the single slot
 * where a purchased, DRACO-compressed glTF replaces the primitive mesh.
 */

export type TrailerType = "dry-van" | "reefer" | "flatbed";

/* [x, z] positions — y is the wheel radius */
const WHEELS: Array<[number, number]> = [
  [3.7, 1.02],
  [3.7, -1.02], // steer axle
  [0.2, 1.06],
  [0.2, -1.06], // drive tandem
  [-1.1, 1.06],
  [-1.1, -1.06],
  [-6.9, 1.06],
  [-6.9, -1.06], // trailer tandem
  [-7.9, 1.06],
  [-7.9, -1.06],
];

const PAINT = {
  metalness: 0.55,
  roughness: 0.28,
  clearcoat: 0.7,
  clearcoatRoughness: 0.18,
} as const;

function Wheel({
  pos,
  wheelRef,
}: {
  pos: [number, number];
  wheelRef: (g: THREE.Group | null) => void;
}) {
  return (
    <group position={[pos[0], 0.55, pos[1]]} ref={wheelRef}>
      {/* tire torus — profile reads as a real tire, axis along Z */}
      <mesh>
        <torusGeometry args={[0.41, 0.14, 18, 32]} />
        <meshStandardMaterial color="#17191d" roughness={0.92} metalness={0.05} />
      </mesh>
      {/* rim */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, pos[1] > 0 ? 0.1 : -0.1]}>
        <cylinderGeometry args={[0.3, 0.3, 0.16, 24]} />
        <meshStandardMaterial color="#b7bec7" metalness={0.9} roughness={0.22} />
      </mesh>
      {/* hub */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, pos[1] > 0 ? 0.19 : -0.19]}>
        <cylinderGeometry args={[0.1, 0.1, 0.04, 16]} />
        <meshStandardMaterial color="#8b93a0" metalness={0.85} roughness={0.3} />
      </mesh>
    </group>
  );
}

function Tractor({ paint }: { paint: string }) {
  return (
    <group>
      {/* hood — beveled */}
      <RoundedBox args={[1.5, 0.9, 2.0]} radius={0.08} smoothness={4} position={[3.85, 1.25, 0]}>
        <meshPhysicalMaterial color={paint} {...PAINT} />
      </RoundedBox>
      {/* grille */}
      <mesh position={[4.61, 1.15, 0]}>
        <boxGeometry args={[0.03, 0.62, 1.6]} />
        <meshStandardMaterial color="#14181e" roughness={0.5} metalness={0.5} />
      </mesh>
      {/* bumper */}
      <mesh position={[4.72, 0.62, 0]}>
        <boxGeometry args={[0.25, 0.34, 2.2]} />
        <meshStandardMaterial color="#c9ced6" metalness={0.75} roughness={0.3} />
      </mesh>
      {/* headlights */}
      <mesh position={[4.72, 0.86, 0.75]}>
        <boxGeometry args={[0.06, 0.12, 0.34]} />
        <meshStandardMaterial color="#fff7df" emissive="#fff3c4" emissiveIntensity={1.6} />
      </mesh>
      <mesh position={[4.72, 0.86, -0.75]}>
        <boxGeometry args={[0.06, 0.12, 0.34]} />
        <meshStandardMaterial color="#fff7df" emissive="#fff3c4" emissiveIntensity={1.6} />
      </mesh>
      {/* cab — beveled */}
      <RoundedBox args={[2.2, 2.3, 2.4]} radius={0.1} smoothness={4} position={[2.1, 1.95, 0]}>
        <meshPhysicalMaterial color={paint} {...PAINT} />
      </RoundedBox>
      {/* roof fairing */}
      <mesh position={[2.2, 3.35, 0]} rotation={[0, 0, 0.18]}>
        <boxGeometry args={[2.0, 0.5, 2.2]} />
        <meshStandardMaterial color={paint} {...PAINT} />
      </mesh>
      {/* windshield (raked back) */}
      <mesh position={[3.21, 2.5, 0]} rotation={[0, 0, 0.12]}>
        <boxGeometry args={[0.05, 1.0, 2.1]} />
        <meshStandardMaterial color="#10141a" roughness={0.08} metalness={0.9} />
      </mesh>
      {/* side windows */}
      <mesh position={[2.6, 2.5, 1.21]}>
        <boxGeometry args={[1.0, 0.7, 0.03]} />
        <meshStandardMaterial color="#10141a" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[2.6, 2.5, -1.21]}>
        <boxGeometry args={[1.0, 0.7, 0.03]} />
        <meshStandardMaterial color="#10141a" roughness={0.1} metalness={0.9} />
      </mesh>
      {/* exhaust stacks */}
      <mesh position={[1.12, 2.1, 1.28]}>
        <cylinderGeometry args={[0.09, 0.09, 2.4, 16]} />
        <meshStandardMaterial color="#c9ced6" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[1.12, 2.1, -1.28]}>
        <cylinderGeometry args={[0.09, 0.09, 2.4, 16]} />
        <meshStandardMaterial color="#c9ced6" metalness={0.85} roughness={0.25} />
      </mesh>
      {/* fuel tanks (axis along X) */}
      <mesh position={[2.0, 0.8, 1.18]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.34, 0.34, 1.3, 20]} />
        <meshStandardMaterial color="#c9ced6" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[2.0, 0.8, -1.18]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.34, 0.34, 1.3, 20]} />
        <meshStandardMaterial color="#c9ced6" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* chassis rails */}
      <mesh position={[-1.5, 0.62, 0.5]}>
        <boxGeometry args={[11.8, 0.16, 0.14]} />
        <meshStandardMaterial color="#1a1f27" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[-1.5, 0.62, -0.5]}>
        <boxGeometry args={[11.8, 0.16, 0.14]} />
        <meshStandardMaterial color="#1a1f27" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* fifth-wheel plate */}
      <mesh position={[-0.4, 0.85, 0]}>
        <boxGeometry args={[1.4, 0.08, 1.6]} />
        <meshStandardMaterial color="#232935" metalness={0.4} roughness={0.6} />
      </mesh>
    </group>
  );
}

function BrandStripe({ x, y, z }: { x: number; y: number; z: number }) {
  return (
    <mesh position={[x, y, z]}>
      <boxGeometry args={[8.4, 0.12, 0.02]} />
      <meshStandardMaterial color="#ffb000" emissive="#ffb000" emissiveIntensity={0.6} roughness={0.4} />
    </mesh>
  );
}

function GearAndBar() {
  return (
    <group>
      <mesh position={[-8.0, 0.75, 0]}>
        <boxGeometry args={[0.08, 0.08, 2.2]} />
        <meshStandardMaterial color="#39424f" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[-2.6, 0.65, 0.7]}>
        <boxGeometry args={[0.12, 0.9, 0.12]} />
        <meshStandardMaterial color="#39424f" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[-2.6, 0.65, -0.7]}>
        <boxGeometry args={[0.12, 0.9, 0.12]} />
        <meshStandardMaterial color="#39424f" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}

function DryVan() {
  return (
    <group>
      {/* dry-van body — beveled */}
      <RoundedBox args={[8.6, 2.5, 2.5]} radius={0.06} smoothness={4} position={[-3.9, 2.2, 0]}>
        <meshStandardMaterial color="#e8ebee" roughness={0.45} metalness={0.15} />
      </RoundedBox>
      <mesh position={[-8.21, 2.2, 0]}>
        <boxGeometry args={[0.02, 2.3, 2.3]} />
        <meshStandardMaterial color="#c6ccd3" roughness={0.6} metalness={0.2} />
      </mesh>
      <BrandStripe x={-3.9} y={1.35} z={1.26} />
      <BrandStripe x={-3.9} y={1.35} z={-1.26} />
      <GearAndBar />
    </group>
  );
}

function Reefer() {
  return (
    <group>
      <RoundedBox args={[8.6, 2.5, 2.5]} radius={0.06} smoothness={4} position={[-3.9, 2.2, 0]}>
        <meshStandardMaterial color="#f4f6f8" roughness={0.4} metalness={0.1} />
      </RoundedBox>
      {/* refrigeration unit at the front wall */}
      <mesh position={[0.62, 2.6, 0]}>
        <boxGeometry args={[0.5, 1.5, 2.1]} />
        <meshStandardMaterial color="#2b313a" roughness={0.5} metalness={0.4} />
      </mesh>
      <mesh position={[0.88, 2.6, 0]}>
        <boxGeometry args={[0.04, 0.9, 1.6]} />
        <meshStandardMaterial color="#15171a" roughness={0.9} />
      </mesh>
      <BrandStripe x={-3.9} y={1.35} z={1.26} />
      <BrandStripe x={-3.9} y={1.35} z={-1.26} />
      <GearAndBar />
    </group>
  );
}

function Flatbed() {
  return (
    <group>
      {/* deck */}
      <mesh position={[-3.9, 1.1, 0]}>
        <boxGeometry args={[8.6, 0.22, 2.5]} />
        <meshStandardMaterial color="#262d38" roughness={0.6} metalness={0.5} />
      </mesh>
      {/* headboard */}
      <mesh position={[0.32, 1.75, 0]}>
        <boxGeometry args={[0.08, 1.1, 2.4]} />
        <meshStandardMaterial color="#39424f" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* crates — beveled */}
      <RoundedBox args={[2.6, 1.4, 2.1]} radius={0.04} smoothness={3} position={[-2.6, 1.91, 0]}>
        <meshStandardMaterial color="#8a6a44" roughness={0.85} />
      </RoundedBox>
      <RoundedBox args={[1.8, 1.1, 2.0]} radius={0.04} smoothness={3} position={[-5.9, 1.76, 0]}>
        <meshStandardMaterial color="#96754c" roughness={0.85} />
      </RoundedBox>
      {/* signal straps */}
      {(
        [
          [-3.4, 1.95, 1.75],
          [-1.8, 1.95, 1.75],
          [-6.4, 1.8, 1.35],
        ] as Array<[number, number, number]>
      ).map(([x, y, h], i) => (
        <mesh key={i} position={[x, y, 0]}>
          <boxGeometry args={[0.06, h, 2.16]} />
          <meshStandardMaterial color="#ffb000" emissive="#ffb000" emissiveIntensity={0.4} roughness={0.5} />
        </mesh>
      ))}
      {/* landing gear (reuse) */}
      <mesh position={[-2.6, 0.65, 0.7]}>
        <boxGeometry args={[0.12, 0.9, 0.12]} />
        <meshStandardMaterial color="#39424f" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[-2.6, 0.65, -0.7]}>
        <boxGeometry args={[0.12, 0.9, 0.12]} />
        <meshStandardMaterial color="#39424f" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}

function Trailer({ type }: { type: TrailerType }) {
  const reduced = useReducedMotion();
  const ref = useRef<THREE.Group>(null);
  const t = useRef(0);
  useFrame((_, dt) => {
    if (reduced || !ref.current || t.current > 0.3) return;
    t.current += dt;
    const p = Math.min(t.current / 0.3, 1);
    const e = 1 - Math.pow(1 - p, 3); // ease-out cubic
    ref.current.scale.setScalar(0.9 + 0.1 * e);
    ref.current.position.y = -0.18 * (1 - e);
  });
  return (
    <group ref={ref}>
      {type === "dry-van" && <DryVan />}
      {type === "reefer" && <Reefer />}
      {type === "flatbed" && <Flatbed />}
    </group>
  );
}

export function Truck({
  paint = "#232b38",
  trailer = "dry-van",
  rolling = false,
  speed = 18,
}: {
  paint?: string;
  trailer?: TrailerType;
  rolling?: boolean;
  speed?: number;
}) {
  const wheelRefs = useRef<Array<THREE.Group | null>>([]);
  useFrame((_, dt) => {
    if (!rolling) return;
    for (const w of wheelRefs.current) if (w) w.rotation.z -= dt * speed;
  });
  return (
    <group>
      <Tractor paint={paint} />
      <group key={trailer}>
        <Trailer type={trailer} />
      </group>
      {WHEELS.map((p, i) => (
        <Wheel
          key={i}
          pos={p}
          wheelRef={(g) => {
            wheelRefs.current[i] = g;
          }}
        />
      ))}
    </group>
  );
}

