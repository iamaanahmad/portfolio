"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Star, GitFork, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const projectCategories = {
    blockchain: [
        {
            title: "Meteora Fee Router",
            description: "Production-grade Solana program for automated fee distribution with Streamflow integration and Anchor framework.",
            tags: ["Rust", "Solana", "DeFi", "Anchor"],
            stats: { stars: 12, forks: 5 },
            links: { github: "https://github.com/iamaanahmad/meteora-fee-router", demo: "#" },
            color: "from-orange-500 to-red-500",
            featured: true
        },
        {
            title: "Alpenglow Verifier",
            description: "Mathematical proof of Solana's Alpenglow consensus with 100% verification success using TLA+ formal verification.",
            tags: ["TypeScript", "Blockchain", "TLA+"],
            stats: { stars: 2, forks: 0 },
            links: { github: "https://github.com/iamaanahmad/alpenglow-verifier", demo: "#" },
            color: "from-blue-500 to-cyan-500"
        },
        {
            title: "Omnichain Voyager",
            description: "Cross-chain NFT RPG game using LayerZero protocol. Hackathon winner with multi-chain gameplay.",
            tags: ["LayerZero", "NFT", "Gaming"],
            stats: { stars: 1, forks: 1 },
            links: { github: "https://github.com/iamaanahmad/omnichain-voyager", demo: "#" },
            color: "from-purple-500 to-pink-500"
        },
        {
            title: "The Solana Sentinel",
            description: "Real-time AI-driven risk analysis for Solana tokens with Nosana AI integration and security monitoring.",
            tags: ["AI", "Solana", "Security"],
            stats: { stars: 0, forks: 0 },
            links: { github: "https://github.com/iamaanahmad/The-Solana-Sentinel", demo: "#" },
            color: "from-green-500 to-emerald-500"
        },
    ],
    ai: [
        {
            title: "Kiro Verse",
            description: "World's first AI-powered interactive learning environment with intelligent code mentorship and blockchain credentials.",
            tags: ["AI", "Education", "Ethereum"],
            stats: { stars: 15, forks: 4 },
            links: { github: "https://github.com/iamaanahmad/kiro-verse", demo: "#" },
            color: "from-green-500 to-emerald-500",
            featured: true
        },
        {
            title: "AIArtify",
            description: "Revolutionary AI art creation with 5-node jury system powered by LazAI for quality assurance.",
            tags: ["AI", "NFT", "Generative"],
            stats: { stars: 0, forks: 0 },
            links: { github: "https://github.com/iamaanahmad/AIArtify", demo: "#" },
            color: "from-pink-500 to-purple-500"
        },
        {
            title: "Local Boost AI",
            description: "AI marketing strategist for local businesses using Google Gemini for automated content generation.",
            tags: ["Gemini", "Marketing", "AI"],
            stats: { stars: 0, forks: 0 },
            links: { github: "https://github.com/iamaanahmad/Local-Boost-AI", demo: "#" },
            color: "from-blue-500 to-indigo-500"
        },
        {
            title: "D-AI Content Summarizer",
            description: "Instant URL & text summarization with real-time content processing using Gemini API.",
            tags: ["AI", "Web3", "Gemini"],
            stats: { stars: 1, forks: 1 },
            links: { github: "https://github.com/iamaanahmad/D-AI-Content-Summarizer", demo: "#" },
            color: "from-yellow-500 to-orange-500"
        },
    ],
    community: [
        {
            title: "CodeCup HQ",
            description: "Gamified coding challenges on Solana blockchain. Community-driven ecosystem for developer competitions.",
            tags: ["Web3", "Solana", "Gamification"],
            stats: { stars: 8, forks: 2 },
            links: { github: "https://github.com/iamaanahmad/CodeCupHQ", demo: "#" },
            color: "from-purple-500 to-pink-500",
            featured: true
        },
        {
            title: "FreeFireItems",
            description: "Comprehensive Free Fire item database with 5,000+ in-game items and interactive explorer.",
            tags: ["Database", "Gaming", "JSON"],
            stats: { stars: 6, forks: 3 },
            links: { github: "https://github.com/iamaanahmad/FreeFireItems", demo: "#" },
            color: "from-red-500 to-orange-500"
        },
        {
            title: "Gaza Aid Trust",
            description: "Community-powered crisis map & aid platform with direct aid distribution and trust-based system.",
            tags: ["Social Impact", "Community"],
            stats: { stars: 0, forks: 0 },
            links: { github: "https://github.com/iamaanahmad/gaza-aid-trust", demo: "#" },
            color: "from-pink-500 to-red-500"
        },
    ]
};

export default function Projects() {
    const [selectedCategory, setSelectedCategory] = useState<keyof typeof projectCategories>("blockchain");
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const allProjects = Object.values(projectCategories).flat();
    const featuredProjects = allProjects.filter(p => p.featured);

    return (
        <section id="projects" className="py-32 relative z-10">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">
                        Featured <span className="text-primary">Projects</span>
                    </h2>
                    <p className="text-muted-foreground text-xl max-w-2xl">
                        29+ open source projects across Web3, AI, and community tools. Building the future, one commit at a time.
                    </p>
                </motion.div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-4 mb-12">
                    {[
                        { key: "blockchain", label: "⛓️ Blockchain & DeFi", count: projectCategories.blockchain.length },
                        { key: "ai", label: "🤖 AI & ML", count: projectCategories.ai.length },
                        { key: "community", label: "🌍 Community & Tools", count: projectCategories.community.length },
                    ].map((category) => (
                        <motion.button
                            key={category.key}
                            onClick={() => setSelectedCategory(category.key as keyof typeof projectCategories)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-6 py-3 rounded-full font-medium transition-all ${selectedCategory === category.key
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50"
                                : "bg-card border border-border hover:border-primary/50"
                                }`}
                        >
                            {category.label} ({category.count})
                        </motion.button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projectCategories[selectedCategory].map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            onHoverStart={() => setHoveredIndex(index)}
                            onHoverEnd={() => setHoveredIndex(null)}
                            className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300"
                        >
                            {/* Gradient Background Effect */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                            <div className="p-8 relative z-10 h-full flex flex-col">
                                {project.featured && (
                                    <div className="absolute top-4 right-4">
                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-xs font-bold">
                                            <Zap size={12} />
                                            FEATURED
                                        </span>
                                    </div>
                                )}

                                <div className="flex justify-between items-start mb-6">
                                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <div className="flex gap-3">
                                        <Link href={project.links.github} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                                            <Github size={20} />
                                        </Link>
                                        <Link href={project.links.demo} className="text-muted-foreground hover:text-foreground transition-colors">
                                            <ExternalLink size={20} />
                                        </Link>
                                    </div>
                                </div>

                                <p className="text-muted-foreground mb-8 flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="px-3 py-1 text-xs font-medium bg-secondary/10 text-secondary-foreground rounded-full border border-border">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Star size={16} className="text-yellow-500" />
                                        <span>{project.stats.stars}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <GitFork size={16} className="text-blue-500" />
                                        <span>{project.stats.forks}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Projects CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <Link
                        href="https://github.com/iamaanahmad?tab=repositories"
                        target="_blank"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105"
                    >
                        <Github size={24} />
                        View All 29+ Projects on GitHub
                        <ExternalLink size={20} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
