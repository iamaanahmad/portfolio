"use client";

import { motion } from "framer-motion";
import { Zap, Clock, Code, Cpu } from "lucide-react";

const timelineData = [
    {
        year: "Traditional Dev",
        human: "Writes boilerplate manually",
        ai: "Generates entire scaffold in seconds",
        icon: Code,
        gain: "10x Speed"
    },
    {
        year: "Debugging",
        human: "Stares at StackOverflow for hours",
        ai: "Fixes bugs instantly with context",
        icon: Zap,
        gain: "Zero Downtime"
    },
    {
        year: "Learning",
        human: "Reads documentation linearly",
        ai: "Synthesizes docs + examples instantly",
        icon: Clock,
        gain: "Instant Mastery"
    },
    {
        year: "Shipping",
        human: "Weeks for MVP",
        ai: "Hours to Production",
        icon: Cpu,
        gain: "Market Dominance"
    }
];

export default function Timeline() {
    return (
        <section className="py-32 relative bg-background overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">
                        AI vs <span className="text-muted-foreground line-through decoration-red-500 decoration-4">Human</span> <span className="text-accent">Cyborg</span>
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        How I use AI to outpace entire engineering teams.
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Center Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-accent to-secondary opacity-30 hidden md:block" />

                    <div className="space-y-12 md:space-y-24">
                        {timelineData.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Card Side */}
                                <div className="flex-1 w-full">
                                    <div className="bg-card border border-border p-8 rounded-2xl hover:border-primary/50 transition-colors group">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="p-3 bg-primary/20 rounded-lg text-primary group-hover:scale-110 transition-transform">
                                                <item.icon size={24} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-foreground">{item.year}</h3>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3 opacity-50">
                                                <span className="text-red-500">✕</span>
                                                <p className="text-muted-foreground">{item.human}</p>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="text-green-500">✓</span>
                                                <p className="text-foreground font-medium">{item.ai}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Center Point */}
                                <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-background border-2 border-accent rounded-full shadow-[0_0_20px_rgba(0,224,255,0.5)]">
                                    <span className="text-xs font-bold text-accent">{index + 1}</span>
                                </div>

                                {/* Empty Side for layout balance */}
                                <div className="flex-1 w-full text-center md:text-left">
                                    <div className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary ${index % 2 === 0 ? "md:text-left" : "md:text-right"
                                        }`}>
                                        {item.gain}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
