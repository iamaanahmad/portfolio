"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, PerspectiveCamera, Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function GeometricShape({ position, color, geometry }: { position: [number, number, number], color: string, geometry: string }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.005;
            meshRef.current.rotation.y += 0.005;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <mesh ref={meshRef} position={position}>
                {geometry === "torus" && <torusKnotGeometry args={[1, 0.3, 128, 16]} />}
                {geometry === "icosahedron" && <icosahedronGeometry args={[1.5, 0]} />}
                {geometry === "octahedron" && <octahedronGeometry args={[1.2, 0]} />}
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.5}
                    wireframe
                    transparent
                    opacity={0.8}
                />
            </mesh>
        </Float>
    );
}

import { useTheme } from "next-themes";

// ... imports

export default function Scene() {
    const { theme } = useTheme();

    return (
        <div className="absolute inset-0 -z-10 h-screen w-full">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#9945FF" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#14F195" />

                {theme !== 'light' && (
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                )}

                <GeometricShape position={[-4, 2, -5]} color="#9945FF" geometry="torus" />
                <GeometricShape position={[4, -2, -5]} color="#14F195" geometry="icosahedron" />
                <GeometricShape position={[0, 3, -8]} color="#00E0FF" geometry="octahedron" />

                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
