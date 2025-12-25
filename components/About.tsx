"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function About() {
    return (
        <section id="about" className="py-20 md:py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                        <div className="relative rounded-2xl overflow-hidden border border-border bg-card/50 backdrop-blur-sm aspect-square md:aspect-[4/5]">
                            <Image
                                src="https://github.com/iamaanahmad.png"
                                alt="Amaan Ahmad"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">
                                Digital Architect & <br />
                                <span className="text-primary">Web3 Innovator</span>
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                I'm Amaan Ahmad, a visionary builder bridging the gap between traditional tech and the decentralized future.
                                With a passion for AI-driven development, I craft digital experiences that are not just functional but revolutionary.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-card border border-border rounded-xl">
                                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                                    <span className="text-2xl">🚀</span> Mission
                                </h3>
                                <p className="text-muted-foreground">
                                    To democratize technology by building accessible, scalable, and secure solutions that empower individuals and businesses in the Web3 era.
                                </p>
                            </div>

                            <div className="p-4 bg-card border border-border rounded-xl">
                                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                                    <span className="text-2xl">👁️</span> Vision
                                </h3>
                                <p className="text-muted-foreground">
                                    A future where AI and Blockchain converge to create autonomous, transparent, and efficient systems for the global economy.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Link href="#contact">
                                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
                                    Work With Me <ArrowRight size={18} />
                                </button>
                            </Link>
                            <Link href="#resume">
                                <button className="px-6 py-3 border border-border bg-background hover:bg-muted rounded-lg font-medium transition-colors">
                                    View Resume
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
