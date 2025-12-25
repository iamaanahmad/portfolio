"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Code2, Cpu, Database, Cloud, Shield, Sparkles } from "lucide-react";

const techCategories = [
    {
        icon: Code2,
        title: "Languages",
        color: "from-blue-500 to-cyan-500",
        skills: [
            { name: "TypeScript", level: 95, icon: "⚡" },
            { name: "JavaScript", level: 95, icon: "🟨" },
            { name: "Rust", level: 85, icon: "🦀" },
            { name: "Python", level: 75, icon: "🐍" },
            { name: "Solidity", level: 70, icon: "💎" },
        ]
    },
    {
        icon: Cpu,
        title: "Frameworks",
        color: "from-purple-500 to-pink-500",
        skills: [
            { name: "React/Next.js", level: 90, icon: "⚛️" },
            { name: "Node.js", level: 88, icon: "🟢" },
            { name: "Anchor", level: 80, icon: "⚓" },
            { name: "Express", level: 85, icon: "🚂" },
            { name: "TailwindCSS", level: 92, icon: "🎨" },
        ]
    },
    {
        icon: Database,
        title: "Blockchain & Web3",
        color: "from-orange-500 to-red-500",
        skills: [
            { name: "Solana", level: 88, icon: "◎" },
            { name: "Ethereum", level: 72, icon: "Ξ" },
            { name: "LayerZero", level: 70, icon: "🔗" },
            { name: "DeFi Protocols", level: 85, icon: "💰" },
            { name: "Smart Contracts", level: 80, icon: "📜" },
        ]
    },
    {
        icon: Sparkles,
        title: "AI & ML",
        color: "from-green-500 to-emerald-500",
        skills: [
            { name: "OpenAI API", level: 85, icon: "🤖" },
            { name: "Google Gemini", level: 88, icon: "✨" },
            { name: "LLM Integration", level: 82, icon: "🧠" },
            { name: "Prompt Engineering", level: 90, icon: "💬" },
            { name: "Generative AI", level: 80, icon: "🎨" },
        ]
    },
    {
        icon: Cloud,
        title: "Cloud & DevOps",
        color: "from-yellow-500 to-orange-500",
        skills: [
            { name: "Firebase", level: 85, icon: "🔥" },
            { name: "AWS", level: 72, icon: "☁️" },
            { name: "Vercel", level: 90, icon: "▲" },
            { name: "Docker", level: 75, icon: "🐳" },
            { name: "CI/CD", level: 78, icon: "🔄" },
        ]
    },
    {
        icon: Shield,
        title: "Security & Tools",
        color: "from-red-500 to-pink-500",
        skills: [
            { name: "DevSecOps", level: 75, icon: "🛡️" },
            { name: "Git/GitHub", level: 95, icon: "📦" },
            { name: "Security Audits", level: 70, icon: "🔒" },
            { name: "Testing", level: 80, icon: "🧪" },
            { name: "PostgreSQL", level: 82, icon: "🐘" },
        ]
    },
];

export default function TechStack() {
    const [selectedCategory, setSelectedCategory] = useState(0);

    return (
        <section className="py-20 relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">
                        Tech <span className="text-primary">Arsenal</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Full-stack expertise across Web3, AI, and modern development
                    </p>
                </motion.div>

                {/* Category Pills */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {techCategories.map((category, index) => {
                        const Icon = category.icon;
                        return (
                            <motion.button
                                key={index}
                                onClick={() => setSelectedCategory(index)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${selectedCategory === index
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50"
                                        : "bg-card border border-border hover:border-primary/50"
                                    }`}
                            >
                                <Icon size={20} />
                                {category.title}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Skills Display */}
                <motion.div
                    key={selectedCategory}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-card border border-border rounded-2xl p-8"
                >
                    <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${techCategories[selectedCategory].color} text-white font-bold mb-8`}>
                        {techCategories[selectedCategory].title}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {techCategories[selectedCategory].skills.map((skill, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="space-y-2"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-medium flex items-center gap-2">
                                        <span className="text-2xl">{skill.icon}</span>
                                        {skill.name}
                                    </span>
                                    <span className="text-primary font-bold">{skill.level}%</span>
                                </div>
                                <div className="h-3 bg-muted rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${skill.level}%` }}
                                        transition={{ duration: 1, delay: index * 0.1 }}
                                        className={`h-full bg-gradient-to-r ${techCategories[selectedCategory].color}`}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Overall Proficiency */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {[
                        { label: "Languages", count: "8+", icon: "💻" },
                        { label: "Frameworks", count: "15+", icon: "🛠️" },
                        { label: "Blockchains", count: "3+", icon: "⛓️" },
                        { label: "Years Coding", count: "5+", icon: "📅" },
                    ].map((stat, index) => (
                        <div key={index} className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                            <div className="text-4xl mb-2">{stat.icon}</div>
                            <div className="text-3xl font-bold text-primary mb-1">{stat.count}</div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
