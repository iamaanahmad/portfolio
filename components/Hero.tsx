"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import Scene from "./Scene";

export default function Hero() {
    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: [
                "AI-Native Full-Stack Engineer",
                "Web3 Builder & DeFi Architect",
                "Blockchain Developer",
                "Community Leader (450K+)",
                "Published Author",
                "10x Developer with AI",
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1500,
            loop: true,
        });

        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            <Scene />

            <div className="z-10 text-center px-4 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h2
                        className="text-sm md:text-lg font-mono text-accent mb-4 tracking-widest uppercase"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        ⚡ Building the Future with AI & Web3
                    </motion.h2>
                    <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tight">
                        I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">Amaan Ahmad</span>
                    </h1>

                    <div className="text-2xl md:text-4xl font-light text-muted-foreground mb-8 h-[60px]">
                        <span ref={el}></span>
                    </div>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
                        Founder @ <span className="text-primary font-semibold">CIT India</span> •
                        Leading <span className="text-secondary font-semibold">450K+ Community</span> •
                        Building with <span className="text-accent font-semibold">Solana, AI & Next.js</span>
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link href="#projects">
                            <button className="px-8 py-4 bg-primary hover:bg-primary/80 text-primary-foreground rounded-full font-bold text-lg transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(153,69,255,0.5)] flex items-center gap-2">
                                <span>🚀</span> View My Work
                            </button>
                        </Link>
                        <Link href="#contact">
                            <button className="px-8 py-4 bg-transparent border-2 border-border hover:bg-accent/10 hover:border-accent text-foreground rounded-full font-bold text-lg transition-all hover:scale-105 backdrop-blur-sm flex items-center gap-2">
                                <span>💬</span> Let's Talk
                            </button>
                        </Link>
                    </div>

                    {/* Quick Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 flex flex-wrap justify-center gap-8 text-sm"
                    >
                        {[
                            { label: "Projects", value: "29+", icon: "💻" },
                            { label: "GitHub Stars", value: "12+", icon: "⭐" },
                            { label: "Community", value: "450K+", icon: "👥" },
                            { label: "Publications", value: "3+", icon: "📚" },
                        ].map((stat, i) => (
                            <div key={i} className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm rounded-full border border-border">
                                <span className="text-xl">{stat.icon}</span>
                                <span className="font-bold text-primary">{stat.value}</span>
                                <span className="text-muted-foreground">{stat.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer z-20"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <Link href="#stats">
                    <div className="p-4 rounded-full border border-border bg-card/50 backdrop-blur-md hover:bg-accent/10 transition-colors">
                        <ArrowDown className="text-accent" size={24} />
                    </div>
                </Link>
            </motion.div>
        </section>
    );
}
