"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { getGithubStats } from "@/lib/github";
import { Award, BookOpen, Users, Code } from "lucide-react";

const defaultStats = [
    { label: "Public Repos", value: 47, suffix: "+" },
    { label: "GitHub Stars", value: 120, suffix: "+" },
    { label: "Followers", value: 500, suffix: "+" },
    { label: "Smart Contracts", value: 28, suffix: "" },
];

const badges = [
    { icon: Users, text: "Community Leader (450K+)", color: "text-blue-500", bg: "bg-blue-500/10" },
    { icon: BookOpen, text: "Published Author (Amazon)", color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { icon: Award, text: "Hackathon Winner", color: "text-purple-500", bg: "bg-purple-500/10" },
    { icon: Code, text: "Open Source Contributor", color: "text-green-500", bg: "bg-green-500/10" },
];

function Counter({ value, duration = 2 }: { value: number, duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const totalFrames = Math.round(duration * 60);
            let frame = 0;

            const counter = setInterval(() => {
                frame++;
                const progress = frame / totalFrames;
                setCount(Math.round(end * progress));

                if (frame === totalFrames) {
                    clearInterval(counter);
                }
            }, 1000 / 60);

            return () => clearInterval(counter);
        }
    }, [isInView, value, duration]);

    return <span ref={ref}>{count}</span>;
}

export default function Stats() {
    const [stats, setStats] = useState(defaultStats);

    useEffect(() => {
        async function fetchStats() {
            const data = await getGithubStats("iamaanahmad");
            if (data) {
                setStats([
                    { label: "Public Repos", value: data.repos, suffix: "" },
                    { label: "GitHub Stars", value: data.stars, suffix: "" },
                    { label: "Followers", value: data.followers, suffix: "" },
                    { label: "Smart Contracts", value: 28, suffix: "" }, // Hardcoded for now
                ]);
            }
        }
        fetchStats();
    }, []);

    return (
        <section id="stats" className="py-20 relative z-10 bg-background/50 backdrop-blur-sm border-y border-border">
            <div className="max-w-7xl mx-auto px-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="text-center group"
                        >
                            <h3 className="text-4xl md:text-6xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                <Counter value={stat.value} />
                                {stat.suffix}
                            </h3>
                            <p className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Social Proof Badges */}
                <div className="flex flex-wrap justify-center gap-6">
                    {badges.map((badge, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className={`flex items-center gap-3 px-6 py-3 rounded-full border border-border ${badge.bg}`}
                        >
                            <badge.icon className={badge.color} size={20} />
                            <span className="font-medium text-foreground">{badge.text}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
