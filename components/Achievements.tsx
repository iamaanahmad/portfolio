"use client";

import { motion } from "framer-motion";
import { Award, Users, BookOpen, Code, Trophy, Briefcase } from "lucide-react";

const achievements = [
    {
        icon: Briefcase,
        title: "Founder @ CIT India",
        description: "Leading digital transformation for startups & businesses",
        color: "from-orange-500 to-red-500",
        badge: "🏢"
    },
    {
        icon: Users,
        title: "Community Leader",
        description: "450K+ members in Free Fire Community",
        color: "from-blue-500 to-cyan-500",
        badge: "👥"
    },
    {
        icon: BookOpen,
        title: "Published Author",
        description: "3+ books on Amazon (AI, Tech, Economics)",
        color: "from-yellow-500 to-orange-500",
        badge: "📚"
    },
    {
        icon: Trophy,
        title: "Hackathon Winner",
        description: "Omnichain Voyager - LayerZero NFT RPG",
        color: "from-purple-500 to-pink-500",
        badge: "🏆"
    },
    {
        icon: Code,
        title: "Open Source Contributor",
        description: "29+ public repositories, 12+ stars",
        color: "from-green-500 to-emerald-500",
        badge: "💻"
    },
    {
        icon: Award,
        title: "Google Local Guide",
        description: "1M+ views on contributions",
        color: "from-red-500 to-pink-500",
        badge: "🗺️"
    },
];

const organizations = [
    {
        name: "CIT India",
        role: "Founder & Tech Lead",
        description: "Building secure digital platforms for businesses",
        link: "https://www.cit.org.in/",
        logo: "🏢",
        impact: "10+ clients served"
    },
    {
        name: "Free Fire Community",
        role: "Admin & Moderator",
        description: "Leading 450K+ gaming community",
        link: "https://www.freefirecommunity.com/",
        logo: "🎮",
        impact: "450K+ members"
    },
    {
        name: "Amazon Author",
        role: "Published Writer",
        description: "Books on AI, Tech & Economics",
        link: "https://www.amazon.com/stores/Amaan-Ahmad/author/B0F9TNJJVL",
        logo: "📖",
        impact: "3+ publications"
    },
];

export default function Achievements() {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">
                        Achievements & <span className="text-primary">Leadership</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Building communities, shipping products, and making an impact
                    </p>
                </motion.div>

                {/* Achievement Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {achievements.map((achievement, index) => {
                        const Icon = achievement.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className="relative group"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-r ${achievement.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
                                <div className="relative bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className={`p-3 rounded-lg bg-gradient-to-r ${achievement.color}`}>
                                            <Icon className="text-white" size={24} />
                                        </div>
                                        <div className="text-4xl">{achievement.badge}</div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                                    <p className="text-muted-foreground">{achievement.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Organizations */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h3 className="text-3xl font-bold mb-8 text-center">
                        Organizations & <span className="text-primary">Affiliations</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {organizations.map((org, index) => (
                            <motion.a
                                key={index}
                                href={org.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all cursor-pointer"
                            >
                                <div className="text-6xl mb-4 text-center">{org.logo}</div>
                                <h4 className="text-xl font-bold mb-2 text-center">{org.name}</h4>
                                <p className="text-sm text-primary font-medium mb-2 text-center">{org.role}</p>
                                <p className="text-sm text-muted-foreground mb-3 text-center">{org.description}</p>
                                <div className="text-center">
                                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                                        {org.impact}
                                    </span>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* Certifications & Recognition */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-card border border-border rounded-2xl p-8"
                >
                    <h3 className="text-2xl font-bold mb-6 text-center">
                        Certifications & <span className="text-primary">Recognition</span>
                    </h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            { name: "GitHub Developer", icon: "🐙", color: "bg-gray-700" },
                            { name: "Amazon Author", icon: "📚", color: "bg-orange-600" },
                            { name: "Google Local Guide", icon: "🗺️", color: "bg-blue-600" },
                            { name: "ORCID Verified", icon: "🎓", color: "bg-green-600" },
                            { name: "Open Source", icon: "💚", color: "bg-emerald-600" },
                            { name: "Web3 Builder", icon: "⛓️", color: "bg-purple-600" },
                        ].map((cert, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.1 }}
                                className={`${cert.color} text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 shadow-lg`}
                            >
                                <span>{cert.icon}</span>
                                <span className="text-sm">{cert.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Fun Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4"
                >
                    {[
                        { label: "Coffee Consumed", value: "∞", icon: "☕" },
                        { label: "Lines of Code", value: "500K+", icon: "💻" },
                        { label: "Late Night Commits", value: "Many", icon: "🌙" },
                        { label: "Bugs Fixed", value: "∞", icon: "🐛" },
                        { label: "Projects Shipped", value: "29+", icon: "🚀" },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-4 text-center border border-primary/20"
                        >
                            <div className="text-3xl mb-2">{stat.icon}</div>
                            <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                            <div className="text-xs text-muted-foreground">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
