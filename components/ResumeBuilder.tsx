"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Download, RefreshCw, Wand2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const defaultResumeData = {
    name: "Amaan Ahmad",
    title: "AI-Native Full-Stack Engineer",
    contact: {
        email: "iamaanahmad@cit.org.in",
        linkedin: "linkedin.com/in/iamaanshaikh",
        github: "github.com/iamaanahmad",
        location: "India"
    },
    summary: "Innovative Full-Stack Engineer and Web3 Builder leveraging advanced AI tools to accelerate development. Proven track record in building scalable dApps, AI agents, and community-driven platforms.",
    skills: ["TypeScript", "React", "Next.js", "Rust", "Solana", "Node.js", "Tailwind CSS", "PostgreSQL", "Docker", "AWS"],
    experience: [
        {
            role: "Founder & Tech Lead",
            company: "CIT India",
            period: "2023 - Present",
            description: "Leading digital transformation initiatives and building secure platforms for startups. Managing a team of developers and designers."
        },
        {
            role: "Community Leader",
            company: "Free Fire Community",
            period: "2021 - Present",
            description: "Grew and managing a community of 450K+ members. implemented automated moderation bots and engagement strategies."
        }
    ],
    projects: [
        {
            name: "Meteora Fee Router",
            tech: "Rust, Solana",
            description: "Production-grade Solana program for automated fee distribution using Streamflow integration."
        },
        {
            name: "Kiro Verse",
            tech: "AI, Ethereum",
            description: "AI-powered interactive learning environment with intelligent code mentorship."
        }
    ]
};

export default function ResumeBuilder() {
    const [resumeData, setResumeData] = useState(defaultResumeData);
    const [isGenerating, setIsGenerating] = useState(false);
    const resumeRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (!resumeRef.current) return;

        const canvas = await html2canvas(resumeRef.current, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("Amaan_Ahmad_Resume.pdf");
    };

    const handleAIGenerate = () => {
        setIsGenerating(true);
        // Simulate AI generation
        setTimeout(() => {
            setResumeData({
                ...resumeData,
                summary: "Results-driven Engineer with a passion for decentralized technologies. Expert in shipping production-ready code at 10x speed using AI-assisted workflows."
            });
            setIsGenerating(false);
        }, 1500);
    };

    return (
        <section id="resume" className="py-20 bg-muted/30">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-2">AI Resume Builder</h2>
                        <p className="text-muted-foreground">Generate an ATS-optimized resume instantly.</p>
                    </div>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <button
                            onClick={handleAIGenerate}
                            disabled={isGenerating}
                            className="flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary hover:bg-secondary/20 rounded-lg transition-colors"
                        >
                            {isGenerating ? <RefreshCw className="animate-spin" size={18} /> : <Wand2 size={18} />}
                            {isGenerating ? "Generating..." : "Enhance with AI"}
                        </button>
                        <button
                            onClick={handleDownload}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors"
                        >
                            <Download size={18} />
                            Download PDF
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Editor Side */}
                    <div className="space-y-6 bg-card p-6 rounded-xl border border-border">
                        <h3 className="text-xl font-semibold mb-4">Edit Details</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                                <input
                                    type="text"
                                    value={resumeData.name}
                                    onChange={(e) => setResumeData({ ...resumeData, name: e.target.value })}
                                    className="w-full mt-1 p-2 bg-background border border-border rounded-md focus:ring-1 focus:ring-primary outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Professional Title</label>
                                <input
                                    type="text"
                                    value={resumeData.title}
                                    onChange={(e) => setResumeData({ ...resumeData, title: e.target.value })}
                                    className="w-full mt-1 p-2 bg-background border border-border rounded-md focus:ring-1 focus:ring-primary outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Professional Summary</label>
                                <textarea
                                    value={resumeData.summary}
                                    onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                                    rows={4}
                                    className="w-full mt-1 p-2 bg-background border border-border rounded-md focus:ring-1 focus:ring-primary outline-none resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Preview Side */}
                    <div className="overflow-hidden rounded-xl border border-border shadow-lg">
                        <div
                            ref={resumeRef}
                            className="bg-white text-black p-8 min-h-[600px] text-sm"
                            style={{ fontFamily: 'Arial, sans-serif' }}
                        >
                            <header className="border-b-2 border-gray-800 pb-4 mb-6">
                                <h1 className="text-3xl font-bold uppercase tracking-wider mb-1">{resumeData.name}</h1>
                                <p className="text-gray-600 font-medium mb-2">{resumeData.title}</p>
                                <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                                    <span>{resumeData.contact.email}</span> •
                                    <span>{resumeData.contact.linkedin}</span> •
                                    <span>{resumeData.contact.github}</span> •
                                    <span>{resumeData.contact.location}</span>
                                </div>
                            </header>

                            <section className="mb-6">
                                <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-3 pb-1">Professional Summary</h2>
                                <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
                            </section>

                            <section className="mb-6">
                                <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-3 pb-1">Technical Skills</h2>
                                <div className="flex flex-wrap gap-2">
                                    {resumeData.skills.map((skill, i) => (
                                        <span key={i} className="bg-gray-100 px-2 py-1 rounded text-xs font-medium text-gray-700">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            <section className="mb-6">
                                <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-3 pb-1">Experience</h2>
                                <div className="space-y-4">
                                    {resumeData.experience.map((exp, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="font-bold">{exp.role}</h3>
                                                <span className="text-xs text-gray-500">{exp.period}</span>
                                            </div>
                                            <p className="text-xs font-medium text-gray-600 mb-1">{exp.company}</p>
                                            <p className="text-gray-700">{exp.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-3 pb-1">Key Projects</h2>
                                <div className="space-y-3">
                                    {resumeData.projects.map((proj, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="font-bold">{proj.name}</h3>
                                                <span className="text-xs text-gray-500">{proj.tech}</span>
                                            </div>
                                            <p className="text-gray-700">{proj.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
