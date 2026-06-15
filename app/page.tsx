"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import {
  Box, Github, ExternalLink, ChevronRight, Zap,
  Mail, MapPin, Send, Linkedin, Twitter, Star, GitFork,
  Menu, X, ArrowUpRight, Code2, Sparkles, Globe, Cpu
} from 'lucide-react';

// ============================================================
//  CONFIG — single source of truth for personal data
// ============================================================
const PROFILE = {
  name: "Amaan Ahmad",
  role: "Full-Stack & AI / Web3 Engineer",
  handle: "iamaanahmad",
  tagline:
    "Founder @ CIT India. I build production-grade products at the intersection of AI, Web3, and the web — and ship them so they actually reach people.",
  location: "New Delhi, India",
  email: "iamaanahmad@cit.org.in",
  links: {
    github: "https://github.com/iamaanahmad",
    linkedin: "https://www.linkedin.com/in/iamaanshaikh",
    twitter: "https://x.com/i_amaanahmad",
    company: "https://www.cit.org.in/",
  },
};

// ============================================================
//  HOOKS & SMALL UTILITIES
// ============================================================
const useScrambleText = (text: string, speed = 45) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (letter === " ") return " ";
            if (index < iterations) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 3;
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, chars]);

  return displayText;
};

const DecryptedText = ({ text, className }: { text: string; className?: string }) => {
  const displayText = useScrambleText(text);
  return <span className={className}>{displayText}</span>;
};

const useCountUp = (end: number, duration = 1500, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start || end <= 0) return;
    let raf = 0;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setCount(end);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, start]);
  return count;
};

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
}

const MagneticButton = ({ children, className, onClick, variant = "primary" }: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.25);
    y.set((clientY - (top + height / 2)) * 0.25);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const baseStyles =
    "relative px-6 py-3 rounded-md font-mono text-sm uppercase tracking-wider transition-colors duration-300 border overflow-hidden group";
  const variants = {
    primary: "bg-cyan-500/10 border-cyan-500 text-cyan-300 hover:text-black",
    secondary: "bg-transparent border-slate-700 text-slate-300 hover:border-white hover:text-white",
    outline: "bg-transparent border-white/15 text-white hover:bg-white/10",
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`${baseStyles} ${variants[variant]} ${className ?? ""}`}
      onClick={onClick}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      {variant === "primary" && (
        <div className="absolute inset-0 -z-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      )}
    </motion.button>
  );
};

// ============================================================
//  VISUAL EFFECTS
// ============================================================
const Scanlines = () => (
  <div className="fixed inset-0 pointer-events-none z-[60] opacity-[0.025] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_3px]" />
);

const CornerBrackets = () => (
  <>
    <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-500/50" />
    <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-cyan-500/50" />
    <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-cyan-500/50" />
    <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cyan-500/50" />
  </>
);

const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  const bootText = [
    "INITIALIZING_CORE_SYSTEMS...",
    "LOADING_KERNEL_MODULES [OK]",
    "CONNECTING_TO_MAINNET...",
    "DECRYPTING_USER_PROFILE...",
    "SYSTEM_READY",
  ];

  useEffect(() => {
    let delay = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    bootText.forEach((line, index) => {
      delay += Math.random() * 180 + 90;
      timers.push(
        setTimeout(() => {
          setLines((prev) => [...prev, line]);
          if (index === bootText.length - 1) timers.push(setTimeout(onComplete, 500));
        }, delay)
      );
    });
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 bg-black z-[100] flex items-center justify-center font-mono text-emerald-400 p-8"
    >
      <div className="w-full max-w-lg">
        <div className="text-cyan-500 mb-4 text-xs">{`> ${PROFILE.handle}@portfolio — secure shell`}</div>
        {lines.map((line, i) => (
          <div key={i} className="mb-1 border-b border-emerald-900/30 pb-1 text-sm">
            <span className="opacity-50 mr-4">{`00${i + 1}`}</span>
            {line}
          </div>
        ))}
        <div className="animate-pulse mt-4">_</div>
        <button
          onClick={onComplete}
          className="mt-8 text-[10px] uppercase tracking-widest text-slate-600 hover:text-cyan-400 transition-colors"
        >
          [ press to skip ]
        </button>
      </div>
    </motion.div>
  );
};

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    resize();

    class Particle {
      x: number; y: number; size: number; speedX: number; speedY: number; opacity: number;
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.speedX; this.y += this.speedY;
        if (this.x > canvas!.width) this.x = 0;
        if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        if (this.y < 0) this.y = canvas!.height;
      }
      draw() {
        ctx!.fillStyle = `rgba(6, 182, 212, ${this.opacity})`;
        ctx!.fillRect(this.x, this.y, this.size, this.size);
      }
    }

    const count = window.innerWidth < 768 ? 45 : 90;
    const particles: Particle[] = Array.from({ length: count }, () => new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      for (let gx = 0; gx < canvas.width; gx += gridSize) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, canvas.height); ctx.stroke();
      }
      for (let gy = 0; gy < canvas.height; gy += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(canvas.width, gy); ctx.stroke();
      }

      particles.forEach((p) => { p.update(); p.draw(); });

      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 110) {
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.12 * (1 - dist / 110)})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        });
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < 160) {
          ctx.strokeStyle = `rgba(20, 241, 149, ${0.25 * (1 - md / 160)})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-70" />;
};

// ============================================================
//  CONTENT COMPONENTS
// ============================================================
const TechBadge = ({ text }: { text: string }) => (
  <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-mono font-bold bg-slate-800/80 text-cyan-300 border border-slate-700 uppercase tracking-wider mr-2 mb-2">
    {text}
  </span>
);

interface Project {
  title: string;
  desc: string;
  tech: string[];
  status: string;
  link: string;
  metric: string;
  stars?: number;
  forks?: number;
}

const statusStyle = (status: string) => {
  switch (status) {
    case 'Production': return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    case 'Research': return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
    case 'Social Impact': return 'bg-pink-500/15 text-pink-300 border-pink-500/30';
    default: return 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30';
  }
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: (index % 3) * 0.08, duration: 0.4 }}
    className="group relative bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 rounded-lg transition-colors duration-300 overflow-hidden flex flex-col"
  >
    <div className="p-6 relative z-10 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-slate-500 text-xs font-mono uppercase">
          <Box size={14} />
          <span>PRJ-{(index + 1).toString().padStart(3, '0')}</span>
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${statusStyle(project.status)}`}>
          {project.status}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors font-mono flex items-center gap-2">
        {project.title}
        <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-cyan-400" />
      </h3>

      <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">
        {project.desc}
      </p>

      <div className="flex flex-wrap mb-5">
        {project.tech.map((t) => <TechBadge key={t} text={t} />)}
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-slate-800 pt-4">
        <a href={project.link} target="_blank" rel="noreferrer" className="text-xs font-mono text-cyan-300 hover:text-white flex items-center gap-1.5">
          {project.link.includes('github.com') ? <Github size={13} /> : <ExternalLink size={13} />}
          {project.link.includes('github.com') ? 'SOURCE' : 'LIVE'}
        </a>
        <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
          {typeof project.stars === 'number' && project.stars > 0 && (
            <span className="flex items-center gap-1"><Star size={12} className="text-yellow-500" /> {project.stars}</span>
          )}
          {typeof project.forks === 'number' && project.forks > 0 && (
            <span className="flex items-center gap-1"><GitFork size={12} /> {project.forks}</span>
          )}
          <span className="flex items-center gap-1 text-cyan-500/80"><Zap size={12} /> {project.metric}</span>
        </div>
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-[1200ms] pointer-events-none" />
  </motion.div>
);

const ExperienceTimeline = () => {
  const items = [
    { year: "2026", role: "Open-Source & AI Tooling", desc: "Author of everything-kiro-ide (17★) and curated agent/skill collections for Kiro, Codex & Antigravity IDEs. Shipping Solana SDKs like FirstStep." },
    { year: "2025", role: "Founder @ CIT India", desc: "Building secure digital platforms for businesses and startups. Shipped DeFi tooling, AI agents, and formally-verified Solana protocols." },
    { year: "2024", role: "Web3 & Solana Developer", desc: "Built on-chain AI marketplaces, NFT tooling, and consensus verification (Alpenglow, TLA+) across 70+ public repositories." },
    { year: "2022", role: "Community & Full-Stack", desc: "Scaled the Free Fire Community to 450K+ members and started shipping production apps with TypeScript, React, and Node.js." },
  ];

  return (
    <div className="relative border-l border-slate-800 ml-4 space-y-9 py-2">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="relative pl-8 group"
        >
          <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-600 group-hover:bg-cyan-500 group-hover:border-cyan-400 transition-colors" />
          <div className="font-mono text-xs text-cyan-500 mb-1">{item.year}</div>
          <h4 className="text-lg font-bold text-white mb-1">{item.role}</h4>
          <p className="text-sm text-slate-400">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  );
};

const TechMarquee = ({ items, reverse = false }: { items: string[]; reverse?: boolean }) => (
  <div className="flex overflow-hidden py-4 group relative select-none">
    <div className={`flex gap-6 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} group-hover:[animation-play-state:paused]`}>
      {[...items, ...items, ...items, ...items].map((tech, i) => (
        <div
          key={`${tech}-${i}`}
          className="px-7 py-3.5 rounded-full bg-slate-900/50 border border-cyan-500/20 text-cyan-300 font-mono text-base whitespace-nowrap backdrop-blur-md hover:bg-cyan-500/10 hover:border-cyan-400/50 hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.05)] flex items-center gap-3"
        >
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
          {tech}
        </div>
      ))}
    </div>
  </div>
);

// ============================================================
//  DATA — projects (curated from real GitHub repositories)
// ============================================================
const web3Projects: Project[] = [
  {
    title: "AgentMarket",
    desc: "Hire trusted AI agents on-chain, pay in SOL, and let smart contracts manage the work. A decentralized marketplace for autonomous agents.",
    tech: ["Python", "Solana", "Smart Contracts"],
    status: "Production",
    link: "https://github.com/iamaanahmad/agentmarket",
    metric: "On-chain AI", stars: 1,
  },
  {
    title: "FirstStep",
    desc: "Open-source SDK & analytics platform that removes Web3 onboarding friction on Solana via guest modes, embedded wallets, and sponsored transactions.",
    tech: ["TypeScript", "Solana", "SDK"],
    status: "Production",
    link: "https://github.com/iamaanahmad/firststep",
    metric: "Web3 UX",
  },
  {
    title: "Alpenglow Verifier",
    desc: "Mathematical proof of Solana's Alpenglow consensus protocol with 100% verification success using TLA+ formal methods.",
    tech: ["TLA+", "Formal Verification", "Solana"],
    status: "Research",
    link: "https://github.com/iamaanahmad/alpenglow-verifier",
    metric: "100% Verified", stars: 4,
  },
  {
    title: "AIArtify",
    desc: "AI art creation validated by a 5-node AI jury (Creative, Technical, Aesthetic, Balanced, QA) with reasoning stored permanently on-chain.",
    tech: ["TypeScript", "LazAI", "NFT"],
    status: "Production",
    link: "https://ai-artify.xyz/",
    metric: "On-chain AI",
  },
  {
    title: "AI Smart Contract Generator",
    desc: "Turn plain English into production-ready Solidity code in seconds, powered by Gemini and security-aware prompting.",
    tech: ["TypeScript", "Gemini", "Solidity"],
    status: "Production",
    link: "https://iamaanahmad.github.io/ai-smart-contract-generator/",
    metric: "Dev Tool",
  },
  {
    title: "CodeCup HQ",
    desc: "Web3 platform turning coding challenges into a community-driven ecosystem on Solana with rewards and live coding battles.",
    tech: ["Solana", "Web3", "Community"],
    status: "Production",
    link: "https://www.codecup.cc/",
    metric: "Community",
  },
];

const aiProjects: Project[] = [
  {
    title: "everything-kiro-ide",
    desc: "The complete collection of Kiro IDE configs, agents, skills, hooks, and MCP integrations for maximum developer productivity.",
    tech: ["Agents", "MCP", "Skills"],
    status: "Production",
    link: "https://github.com/iamaanahmad/everything-kiro-ide",
    metric: "Top Repo", stars: 17, forks: 8,
  },
  {
    title: "AgoraCare",
    desc: "Voice-first healthcare companion that helps elderly users and caregivers manage medications, appointments, and emergencies through natural conversation.",
    tech: ["TypeScript", "Agora", "Healthcare AI"],
    status: "Production",
    link: "https://github.com/iamaanahmad/AgoraCare",
    metric: "Voice AI",
  },
  {
    title: "ClinAssist Gemini",
    desc: "Gemini-powered AI that turns images, voice notes, and long patient histories into structured clinical insights — safely and explainably.",
    tech: ["TypeScript", "Gemini", "Healthcare"],
    status: "Research",
    link: "https://github.com/iamaanahmad/ClinAssistGemini",
    metric: "Clinical AI",
  },
  {
    title: "AI Resume Maker",
    desc: "AI-powered resume builder for creating professional, ATS-friendly resumes. Free forever and open source.",
    tech: ["Next.js", "AI", "ATS"],
    status: "Production",
    link: "https://freeresumebuilderai.hindustan.site/",
    metric: "ATS-Ready",
  },
  {
    title: "everything-codex",
    desc: "50+ production-ready skills, 100+ reusable prompts, and multi-agent workflows for OpenAI Codex-powered development.",
    tech: ["Codex", "Prompts", "Automation"],
    status: "Production",
    link: "https://github.com/iamaanahmad/everything-codex",
    metric: "50+ Skills", stars: 1,
  },
  {
    title: "Certificate Generator",
    desc: "Open-source web app for creating, customizing, and bulk-generating professional certificates with AI assistance.",
    tech: ["TypeScript", "Gemini", "Open Source"],
    status: "Production",
    link: "https://iamaanahmad.github.io/CertificateGenerator/",
    metric: "Bulk Gen",
  },
];

const web2Projects: Project[] = [
  {
    title: "CIT India",
    desc: "Technology made simple — web design, cloud, cybersecurity, digital marketing, and DApps for enterprises worldwide.",
    tech: ["Next.js", "Enterprise", "Agency"],
    status: "Production",
    link: "https://www.cit.org.in/",
    metric: "Global",
  },
  {
    title: "Free Fire Community",
    desc: "Connecting Free Fire players worldwide — a 450K+ member Q&A and content platform for gamers.",
    tech: ["WordPress", "Community", "Gaming"],
    status: "Production",
    link: "https://www.freefirecommunity.com/",
    metric: "450K+ Users",
  },
  {
    title: "FreeFireItems",
    desc: "A comprehensive database and interactive explorer for 5,000+ Free Fire in-game items with open data APIs.",
    tech: ["HTML", "Open Data", "API"],
    status: "Production",
    link: "https://arsenal.freefirecommunity.com/",
    metric: "5K+ Items", stars: 16, forks: 12,
  },
  {
    title: "Eventola",
    desc: "Transform boring event pages into stunning, conversion-optimized microsites. Zero coding, AI-enhanced, real-time.",
    tech: ["TypeScript", "Appwrite", "SaaS"],
    status: "Production",
    link: "https://eventola.appwrite.network/",
    metric: "No-Code", stars: 1,
  },
  {
    title: "Gaza Aid Trust",
    desc: "A community-powered crisis map and direct aid platform for Gaza, built with trust and accessibility at its core.",
    tech: ["Next.js", "Humanitarian", "Maps"],
    status: "Social Impact",
    link: "https://gaza-aid-trust.vercel.app/",
    metric: "Aid", stars: 2,
  },
  {
    title: "UPI Payment Gateway",
    desc: "Free UPI QR code & payment-link generator for India — perfect for freelancers and small businesses.",
    tech: ["Next.js", "FinTech", "UPI"],
    status: "Production",
    link: "https://upipg.cit.org.in/",
    metric: "Payments", stars: 1,
  },
];

type Category = 'ai' | 'web3' | 'web2';
const PROJECT_GROUPS: Record<Category, { label: string; icon: React.ReactNode; data: Project[] }> = {
  ai: { label: "AI & Tooling", icon: <Sparkles size={14} />, data: aiProjects },
  web3: { label: "Web3 / Blockchain", icon: <Cpu size={14} />, data: web3Projects },
  web2: { label: "Web & SaaS", icon: <Globe size={14} />, data: web2Projects },
};

// ============================================================
//  STATS — animated, fed by live GitHub data when available
// ============================================================
interface Stat { value: number; suffix: string; label: string; }

const StatCard = ({ stat, start }: { stat: Stat; start: boolean }) => {
  const count = useCountUp(stat.value, 1600, start);
  return (
    <div className="bg-slate-900/50 p-4 border border-slate-800 rounded-md hover:border-cyan-500/40 transition-colors">
      <div className="text-3xl font-bold text-white font-mono">
        {count}
        <span className="text-cyan-500 text-sm">{stat.suffix}</span>
      </div>
      <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">{stat.label}</div>
    </div>
  );
};

// ============================================================
//  MAIN
// ============================================================
export default function Home() {
  const [booted, setBooted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [category, setCategory] = useState<Category>('ai');
  const [gh, setGh] = useState<{ repos: number; followers: number; stars: number } | null>(null);
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const stackRow1 = ["TypeScript", "Rust", "Python", "Solidity", "Next.js", "React", "Tailwind CSS"];
  const stackRow2 = ["Solana", "Anchor", "Gemini AI", "TLA+", "Node.js", "Appwrite", "Docker", "MCP"];

  // Live GitHub stats (graceful fallback to known values)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${PROFILE.handle}`);
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) setGh({ repos: data.public_repos, followers: data.followers, stars: 0 });
      } catch { /* keep fallback */ }
    })();
    return () => { cancelled = true; };
  }, []);

  // Observe stats section to trigger count-up
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsInView(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [booted]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats: Stat[] = [
    { value: 450, suffix: 'K+', label: 'Community Members' },
    { value: gh?.repos ?? 74, suffix: '+', label: 'Public Repos' },
    { value: gh?.followers ?? 23, suffix: '', label: 'GitHub Followers' },
    { value: 3, suffix: '+', label: 'Published eBooks' },
  ];

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#stack', label: 'Stack' },
    { href: '#contact', label: 'Contact' },
  ];

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    document.getElementById(id.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const projects = PROJECT_GROUPS[category].data;

  return (
    <>
      <AnimatePresence>
        {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      </AnimatePresence>

      <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden relative">
        <Scanlines />

        <div className="fixed top-0 left-0 p-4 z-40 font-mono text-[10px] text-cyan-500/40 pointer-events-none hidden md:block">
          SYS.VER.3.0 // ONLINE
        </div>

        {/* Scroll progress */}
        <motion.div className="fixed top-0 left-0 right-0 h-0.5 bg-cyan-500 origin-left z-[55] shadow-[0_0_10px_#06b6d4]" style={{ scaleX }} />

        {/* Navbar */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-[#050505]/90 backdrop-blur-md py-3 border-white/10' : 'py-5 bg-transparent border-transparent'}`}>
          <div className="container mx-auto px-6 flex justify-between items-center">
            <button onClick={() => scrollTo('#top')} className="flex items-center gap-1 font-mono font-bold text-xl tracking-tighter">
              <span className="text-cyan-500">&lt;</span>Amaan<span className="text-cyan-500">/&gt;</span>
            </button>

            <div className="hidden md:flex items-center gap-8">
              <div className="flex gap-8 text-xs font-mono uppercase tracking-widest text-slate-400">
                {navLinks.map((l) => (
                  <button key={l.href} onClick={() => scrollTo(l.href)} className="hover:text-cyan-400 transition-colors">
                    /{l.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => scrollTo('#contact')}
                className="px-4 py-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono hover:bg-emerald-500 hover:text-black transition-all flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Hire Me
              </button>
            </div>

            <button className="md:hidden text-white" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden bg-[#050505]/95 backdrop-blur-md border-t border-white/10"
              >
                <div className="flex flex-col px-6 py-4 gap-4 font-mono text-sm uppercase tracking-widest text-slate-300">
                  {navLinks.map((l) => (
                    <button key={l.href} onClick={() => scrollTo(l.href)} className="text-left hover:text-cyan-400 transition-colors">
                      /{l.label}
                    </button>
                  ))}
                  <button onClick={() => scrollTo('#contact')} className="text-left text-emerald-400">/Hire Me</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Hero */}
        <section id="top" className="relative min-h-screen flex items-center justify-center pt-20 border-b border-white/5">
          <ParticleField />
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <div className="px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-mono uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  Available for Hire & Collaboration
                </div>
              </motion.div>

              <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.95]">
                <DecryptedText text="AMAAN AHMAD" className="text-white block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 block mt-2 text-3xl sm:text-4xl md:text-6xl">
                  {PROFILE.role}
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
              >
                {PROFILE.tagline}
              </motion.p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center mb-12">
                <MagneticButton variant="primary" onClick={() => scrollTo('#projects')}>
                  View Projects <ChevronRight size={16} />
                </MagneticButton>
                <MagneticButton variant="secondary" onClick={() => scrollTo('#contact')}>
                  <Mail size={16} /> Get in Touch
                </MagneticButton>
              </div>

              {/* Social row */}
              <div className="flex items-center gap-5">
                {[
                  { icon: <Github size={18} />, href: PROFILE.links.github, label: 'GitHub' },
                  { icon: <Linkedin size={18} />, href: PROFILE.links.linkedin, label: 'LinkedIn' },
                  { icon: <Twitter size={18} />, href: PROFILE.links.twitter, label: 'Twitter' },
                ].map((s) => (
                  <a
                    key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                    className="p-2.5 rounded-md border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/50 hover:-translate-y-0.5 transition-all"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-0 w-full px-6 hidden md:flex justify-between text-[10px] font-mono text-slate-600 uppercase tracking-widest">
            <span>Repos: {gh?.repos ?? 74}+</span>
            <span>Community: 450K+</span>
            <span>Focus: AI · Web3 · Web</span>
            <span>Location: New Delhi, IN</span>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-24 md:py-32 relative border-b border-white/5 bg-[#080808]">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
              {/* Terminal */}
              <div className="w-full lg:w-1/2">
                <div className="rounded-md bg-[#0c0c0c] border border-slate-800 overflow-hidden font-mono text-sm shadow-2xl relative">
                  <CornerBrackets />
                  <div className="flex items-center px-4 py-2 bg-slate-900 border-b border-slate-800">
                    <div className="flex gap-2 mr-4">
                      <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>
                    <span className="text-slate-500 text-xs">amaan@cit-india:~</span>
                  </div>
                  <div className="p-6 space-y-4 h-[400px] overflow-y-auto text-slate-300">
                    <div className="opacity-50 text-xs mb-4">Last login: {new Date().toDateString()} on ttys001</div>
                    <div><span className="text-emerald-500 mr-2">➜</span><span className="text-cyan-400">whoami</span></div>
                    <div>
                      <span className="text-emerald-500 mr-2">➜</span><span className="text-cyan-400">cat bio.txt</span>
                      <div className="text-slate-400 mt-1 ml-4 border-l-2 border-slate-800 pl-2">
                        Founder @ CIT India. Building at the intersection of AI, Web3, and the web.
                      </div>
                    </div>
                    <div>
                      <span className="text-emerald-500 mr-2">➜</span><span className="text-cyan-400">ls ./focus</span>
                      <div className="text-slate-400 mt-1 ml-4 border-l-2 border-slate-800 pl-2">
                        ai-agents/ &nbsp; solana-protocols/ &nbsp; dev-tooling/ &nbsp; saas/
                      </div>
                    </div>
                    <div>
                      <span className="text-emerald-500 mr-2">➜</span><span className="text-cyan-400">git log --oneline -1</span>
                      <div className="text-slate-400 mt-1 ml-4 border-l-2 border-slate-800 pl-2">
                        shipped everything-kiro-ide → 17★ · 8 forks
                      </div>
                    </div>
                    <div>
                      <span className="text-emerald-500 mr-2">➜</span><span className="text-cyan-400">echo $MISSION</span>
                      <div className="text-slate-400 mt-1 ml-4 border-l-2 border-slate-800 pl-2">
                        Democratize technology — make advanced tech accessible to everyone, everywhere.
                      </div>
                      <span className="inline-block w-2 h-4 bg-emerald-500 animate-pulse align-middle ml-1" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Narrative + stats + timeline */}
              <div className="w-full lg:w-1/2">
                <div className="text-cyan-500 font-mono text-xs uppercase tracking-widest mb-2">/ About</div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  The architect <span className="text-cyan-500">behind the code</span>
                </h2>
                <p className="text-slate-400 mb-8 text-base md:text-lg leading-relaxed">
                  Founder of <strong className="text-white">CIT India</strong>, community lead for 450K+ gamers, and a
                  prolific open-source builder with <strong className="text-white">70+ public repositories</strong>. I
                  don&apos;t just write code — I orchestrate AI agents, design Solana protocols, and ship developer
                  tooling that other engineers actually use.
                </p>

                <div ref={statsRef} className="grid grid-cols-2 gap-4 mb-10">
                  {stats.map((s) => <StatCard key={s.label} stat={s} start={statsInView} />)}
                </div>

                <ExperienceTimeline />
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-24 md:py-32 border-b border-white/5 bg-[#050505] relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-cyan-900/5 blur-[120px] pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
              <div>
                <div className="text-cyan-500 font-mono text-xs uppercase tracking-widest mb-2">/ Selected Works</div>
                <h2 className="text-3xl md:text-5xl font-bold">Things I&apos;ve Built</h2>
              </div>

              <div className="flex bg-slate-900 border border-slate-800 rounded-md p-1 flex-wrap">
                {(Object.keys(PROJECT_GROUPS) as Category[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => setCategory(key)}
                    className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded transition-all duration-300 flex items-center gap-2 ${
                      category === key ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {PROJECT_GROUPS[key].icon}
                    {PROJECT_GROUPS[key].label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
              <span className="text-xs font-mono text-slate-500">
                Showing {projects.length} {PROJECT_GROUPS[category].label} projects
              </span>
              <MagneticButton variant="outline" className="text-xs" onClick={() => window.open(`${PROFILE.links.github}?tab=repositories`, '_blank')}>
                <Code2 size={14} /> View All {gh?.repos ?? 74}+ Repos
              </MagneticButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {projects.map((p, i) => (
                  <ProjectCard key={`${category}-${p.title}`} project={p} index={i} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Stack */}
        <section id="stack" className="py-24 md:py-32 bg-[#080808] relative overflow-hidden">
          <div className="container mx-auto px-6 text-center relative z-10 mb-12">
            <h4 className="text-cyan-500 font-mono text-xs uppercase tracking-widest mb-4">/ My Arsenal</h4>
            <h2 className="text-3xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">
              High-Velocity Tech Stack
            </h2>
          </div>
          <div className="relative w-full overflow-hidden space-y-6">
            <TechMarquee items={stackRow1} />
            <TechMarquee items={stackRow2} reverse />
            <div className="absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-[#080808] to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-[#080808] to-transparent pointer-events-none" />
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 md:py-32 border-t border-white/5 bg-[#050505] relative">
          <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <div className="text-center mb-14">
              <div className="inline-block px-3 py-1 mb-4 border border-cyan-500/30 rounded-full bg-cyan-500/5 text-cyan-400 text-xs font-mono uppercase tracking-widest">
                / Get in Touch
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Let&apos;s build the future</h2>
              <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
                Have a groundbreaking idea or need to scale existing infrastructure? I&apos;m open to freelance projects,
                collaborations, and full-time roles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-md text-cyan-500"><Mail size={22} /></div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">Email</h4>
                    <p className="text-slate-400 text-sm mb-2">Best way to reach me.</p>
                    <a href={`mailto:${PROFILE.email}`} className="text-cyan-400 font-mono hover:text-white transition-colors break-all">{PROFILE.email}</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-md text-purple-500"><MapPin size={22} /></div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">Location</h4>
                    <p className="text-slate-400 text-sm">{PROFILE.location}</p>
                    <p className="text-slate-500 text-xs mt-1 font-mono">Open to remote worldwide</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-md text-emerald-500"><Linkedin size={22} /></div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">Social</h4>
                    <p className="text-slate-400 text-sm mb-2">Let&apos;s connect professionally.</p>
                    <div className="flex gap-3 font-mono text-sm">
                      <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-white">LinkedIn</a>
                      <span className="text-slate-700">·</span>
                      <a href={PROFILE.links.github} target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-white">GitHub</a>
                      <span className="text-slate-700">·</span>
                      <a href={PROFILE.links.twitter} target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-white">Twitter</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-6 bg-slate-900/20 border border-white/5 rounded-lg relative overflow-hidden">
                <CornerBrackets />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-cyan-500 uppercase">/ Name</label>
                    <input
                      type="text" placeholder="Your name" value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 p-3 text-sm text-white rounded focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-cyan-500 uppercase">/ Email</label>
                    <input
                      type="email" placeholder="you@email.com" value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 p-3 text-sm text-white rounded focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-cyan-500 uppercase">/ Message</label>
                  <textarea
                    rows={4} placeholder="Describe your project..." value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 p-3 text-sm text-white rounded focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                  />
                </div>
                <MagneticButton
                  className="w-full flex justify-center items-center gap-2"
                  onClick={() => {
                    const subject = encodeURIComponent(`Project inquiry from ${formData.name || 'Portfolio Visitor'}`);
                    const body = encodeURIComponent(`Hi Amaan,\n\n${formData.message}\n\n---\nFrom: ${formData.name}\nEmail: ${formData.email}`);
                    window.open(`mailto:${PROFILE.email}?subject=${subject}&body=${body}`, '_blank');
                  }}
                >
                  <Send size={16} /> Send Message
                </MagneticButton>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 border-t border-white/5 bg-[#050505] font-mono text-xs text-slate-500">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              &copy; {new Date().getFullYear()} {PROFILE.name} ·{' '}
              <a href={PROFILE.links.company} target="_blank" rel="noreferrer" className="hover:text-cyan-400">CIT India</a>
            </div>
            <div className="flex gap-6">
              <a href={PROFILE.links.github} target="_blank" rel="noreferrer" className="hover:text-cyan-400">GITHUB</a>
              <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-400">LINKEDIN</a>
              <a href={PROFILE.links.twitter} target="_blank" rel="noreferrer" className="hover:text-cyan-400">X / TWITTER</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
