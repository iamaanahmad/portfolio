"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

const skills = [
    "React", "Next.js", "TypeScript", "Rust", "Solana",
    "Web3", "AI Agents", "Tailwind", "Node.js", "PostgreSQL",
    "GraphQL", "Docker", "AWS", "Framer Motion", "Three.js"
];

function Word({ children, position, onClick }: { children: string, position: [number, number, number], onClick: (word: string) => void }) {
    const color = new THREE.Color();
    const fontProps = { font: '/Inter-Bold.woff', fontSize: 2.5, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false };
    const ref = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame(({ camera }) => {
        // Make text face camera
        if (ref.current) {
            ref.current.quaternion.copy(camera.quaternion);
            (ref.current.material as THREE.MeshStandardMaterial).color.lerp(color.set(hovered ? '#00E0FF' : '#9945FF'), 0.1);
        }
    });

    return (
        <Float floatIntensity={5} rotationIntensity={2}>
            <Text
                ref={ref}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => onClick(children)}
                position={position}
                {...fontProps}
                children={children}
            />
        </Float>
    );
}

function Cloud({ count = 4, radius = 20, onSelect }: { count?: number, radius?: number, onSelect: (skill: string) => void }) {
    // Create a spherical distribution of points
    const words = useMemo(() => {
        const temp = [];
        const spherical = new THREE.Spherical();
        const phiSpan = Math.PI / (skills.length + 1);
        const thetaSpan = (Math.PI * 2) / skills.length;

        for (let i = 0; i < skills.length; i++) {
            // Distribute points on a sphere
            spherical.set(radius, phiSpan * (i + 1), thetaSpan * i);
            temp.push([new THREE.Vector3().setFromSpherical(spherical), skills[i]] as const);
        }
        return temp;
    }, [count, radius]);

    return (
        <>
            {words.map(([pos, word], index) => (
                <Word key={index} position={[pos.x, pos.y, pos.z]} onClick={onSelect}>{word}</Word>
            ))}
        </>
    );
}

import { useTheme } from "next-themes";

// ... imports

export default function Skills() {
    const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
    const { theme } = useTheme();
    const fogColor = theme === 'light' ? '#ffffff' : '#030014'; // Adjust fog for light/dark

    return (
        <section id="tech" className="h-screen relative w-full overflow-hidden bg-background">
            <div className="absolute inset-0 z-0">
                <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
                    <fog attach="fog" args={[fogColor, 0, 80]} />
                    <Cloud onSelect={setSelectedSkill} />
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
            </div>

            <div className="absolute top-10 left-10 z-10 pointer-events-none">
                <h2 className="text-6xl font-bold text-foreground/10">SKILLS</h2>
            </div>

            {selectedSkill && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-card/80 backdrop-blur-md p-6 rounded-xl border border-primary/20 z-20 max-w-md text-center"
                >
                    <h3 className="text-2xl font-bold text-primary mb-2">{selectedSkill}</h3>
                    <p className="text-muted-foreground">
                        Expertise in building scalable applications using {selectedSkill}.
                        Integrated into 10+ production projects.
                    </p>
                    <button
                        onClick={() => setSelectedSkill(null)}
                        className="mt-4 text-sm text-muted-foreground hover:text-foreground"
                    >
                        Close
                    </button>
                </motion.div>
            )}

            <div className="absolute bottom-10 right-10 text-muted-foreground text-sm animate-pulse hidden md:block">
                Drag to rotate • Click to explore
            </div>

            {/* Proficiency Matrix */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/90 to-transparent pt-20 pb-10 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        <div>
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <span className="w-2 h-8 bg-primary rounded-full" />
                                Technical Proficiency
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { name: "TypeScript / JavaScript", level: 95 },
                                    { name: "React / Next.js", level: 90 },
                                    { name: "Rust / Solana", level: 85 },
                                    { name: "AI / ML Integration", level: 80 },
                                    { name: "DevSecOps", level: 75 },
                                ].map((skill, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between mb-2 text-sm font-medium">
                                            <span>{skill.name}</span>
                                            <span>{skill.level}%</span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                transition={{ duration: 1, delay: i * 0.1 }}
                                                className="h-full bg-gradient-to-r from-primary to-accent"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="hidden md:block">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <span className="w-2 h-8 bg-secondary rounded-full" />
                                Specialized Stacks
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { title: "Web3", items: ["Solana Anchor", "Wagmi", "Ethers.js", "Hardhat"] },
                                    { title: "AI Engineering", items: ["LangChain", "OpenAI API", "HuggingFace", "Pinecone"] },
                                    { title: "Backend", items: ["Node.js", "PostgreSQL", "Redis", "GraphQL"] },
                                    { title: "Tools", items: ["Docker", "Git", "Vercel", "Cursor"] },
                                ].map((stack, i) => (
                                    <div key={i} className="p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
                                        <h4 className="font-bold text-primary mb-2">{stack.title}</h4>
                                        <ul className="text-sm text-muted-foreground space-y-1">
                                            {stack.items.map((item, j) => (
                                                <li key={j}>• {item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
