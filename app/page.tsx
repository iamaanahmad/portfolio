"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import {
  Box, Github, ExternalLink, ChevronRight, Zap,
  Mail, MapPin, Send, Linkedin, Twitter, Star, GitFork,
  Menu, X, ArrowUpRight, Code2, Sparkles, Globe, Cpu,
  Search, BookOpen, Languages, Copy, Check, ArrowUp,
  ShieldCheck, Layers, FileText, Feather
} from 'lucide-react';

interface ParticleObj {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

function createParticle(width: number, height: number): ParticleObj {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 1.5 + 0.5,
    speedX: (Math.random() - 0.5) * 0.4,
    speedY: (Math.random() - 0.5) * 0.4,
    opacity: Math.random() * 0.5 + 0.1,
  };
}

function updateParticle(p: ParticleObj, width: number, height: number) {
  p.x += p.speedX;
  p.y += p.speedY;
  if (p.x > width) p.x = 0;
  if (p.x < 0) p.x = width;
  if (p.y > height) p.y = 0;
  if (p.y < 0) p.y = height;
}

function drawParticle(ctx: CanvasRenderingContext2D, p: ParticleObj) {
  ctx.fillStyle = `rgba(6, 182, 212, ${p.opacity})`;
  ctx.fillRect(p.x, p.y, p.size, p.size);
}

// ============================================================
//  CONFIG — single source of truth for personal data
// ============================================================
const PROFILE = {
  name: "Amaan Ahmad",
  role: "Full-Stack AI, Web3 & Developer Tooling Engineer",
  handle: "iamaanahmad",
  tagline:
    "Founder @ CIT India. Author & Content Writer. I build production-grade AI agents, Solana protocols, Codex tooling, and provide Multilingual AI & Translation services — shipping products that scale.",
  location: "New Delhi, India",
  email: "amaan@cit.org.in",
  resume: "/Resume.Techie.pdf",
  photo: "/amaan-photo.jpg",
  links: {
    github: "https://github.com/iamaanahmad",
    linkedin: "https://www.linkedin.com/in/iamaanshaikh",
    twitter: "https://x.com/i_amaanahmad",
    company: "https://www.cit.org.in/",
    amazonAuthor: "https://www.amazon.com/author/amaan",
    amazonBooks: "http://amazon.com/stores/author/B0F9TNJJVL/allbooks",
    knowledgeSense: "https://www.knowledgesense.in/author/administer/",
  },
};

// ============================================================
//  HOOKS & UTILITIES
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
    "relative px-6 py-3 rounded-md font-mono text-sm uppercase tracking-wider transition-colors duration-300 border overflow-hidden group cursor-pointer";
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
    "LOADING_GITHUB_DATA & AUTHOR_PROFILE...",
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
          className="mt-8 text-[10px] uppercase tracking-widest text-slate-600 hover:text-cyan-400 transition-colors cursor-pointer"
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

    const count = window.innerWidth < 768 ? 45 : 90;
    const particles: ParticleObj[] = Array.from({ length: count }, () => createParticle(canvas.width, canvas.height));

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

      particles.forEach((p) => {
        updateParticle(p, canvas.width, canvas.height);
        drawParticle(ctx, p);
      });

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
//  PROJECT DATA & TYPES
// ============================================================
const TechBadge = ({ text }: { text: string }) => (
  <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-mono font-bold bg-slate-800/80 text-cyan-300 border border-slate-700 uppercase tracking-wider mr-1.5 mb-1.5">
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
  longDesc?: string;
}

const statusStyle = (status: string) => {
  switch (status) {
    case 'Production': return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    case 'Research': return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
    case 'Social Impact': return 'bg-pink-500/15 text-pink-300 border-pink-500/30';
    case 'Language AI': return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
    default: return 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30';
  }
};

const ProjectCard = ({ project, index, onSelect }: { project: Project; index: number; onSelect: (p: Project) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: (index % 3) * 0.08, duration: 0.4 }}
    className="glow-card group relative bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 rounded-lg transition-all duration-300 overflow-hidden flex flex-col h-full"
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

      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors font-mono flex items-center justify-between">
        <span className="flex items-center gap-2">
          {project.title}
        </span>
        <button
          onClick={() => onSelect(project)}
          aria-label={`View details for ${project.title}`}
          className="p-1 rounded text-slate-500 hover:text-cyan-400 hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <ArrowUpRight className="w-5 h-5 text-cyan-400" />
        </button>
      </h3>

      <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
        {project.desc}
      </p>

      <div className="flex flex-wrap mb-5">
        {project.tech.map((t) => <TechBadge key={t} text={t} />)}
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-slate-800 pt-4 mt-auto">
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-mono text-cyan-300 hover:text-white flex items-center gap-1.5"
        >
          {project.link.includes('github.com') ? <Github size={13} /> : <ExternalLink size={13} />}
          {project.link.includes('github.com') ? 'REPOS' : 'LIVE'}
        </a>
        <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
          {typeof project.stars === 'number' && project.stars > 0 && (
            <span className="flex items-center gap-1"><Star size={12} className="text-yellow-500 fill-yellow-500/20" /> {project.stars}</span>
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

const ProjectModal = ({ project, onClose }: { project: Project | null; onClose: () => void }) => {
  if (!project) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-slate-900 border border-cyan-500/40 rounded-lg max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden font-mono text-slate-200"
        >
          <CornerBrackets />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${statusStyle(project.status)}`}>
              {project.status}
            </span>
            <span className="text-xs text-cyan-500 uppercase tracking-widest">{project.metric}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">{project.title}</h3>

          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            {project.longDesc || project.desc}
          </p>

          <div className="mb-6">
            <h4 className="text-xs text-slate-500 uppercase tracking-wider mb-2">Technologies & Architecture:</h4>
            <div className="flex flex-wrap">
              {project.tech.map((t) => <TechBadge key={t} text={t} />)}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-800 pt-6">
            <div className="flex items-center gap-4 text-xs text-slate-400">
              {typeof project.stars === 'number' && (
                <span className="flex items-center gap-1"><Star size={14} className="text-yellow-500" /> {project.stars} Stars</span>
              )}
              {typeof project.forks === 'number' && (
                <span className="flex items-center gap-1"><GitFork size={14} /> {project.forks} Forks</span>
              )}
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2 rounded bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition-colors flex items-center gap-2"
            >
              Open Link <ExternalLink size={14} />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ============================================================
//  INTERACTIVE CLI TERMINAL COMPONENT (Internal Scroll Fixed)
// ============================================================
const InteractiveTerminal = ({ onToast }: { onToast: (msg: string) => void }) => {
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output'; text: string }>>([
    { type: 'output', text: "Amaan Ahmad CLI [Version 3.2.0]" },
    { type: 'output', text: "Type 'help' to list available system commands." },
  ]);
  const [inputVal, setInputVal] = useState('');
  const terminalScrollRef = useRef<HTMLDivElement>(null);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const newHistory = [...history, { type: 'input' as const, text: `$ ${cmd}` }];

    switch (trimmed) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `COMMANDS:
  whoami    - Print executive profile & mission
  projects  - List top open-source repositories & products
  skills    - Display technical arsenal & language translation skills
  books     - View published Amazon eBooks & KnowledgeSense articles
  contact   - Display email & social endpoints
  resume    - Download technical resume PDF
  github    - Open GitHub profile in new tab
  sudo hire - Quick hire directive
  clear     - Clear terminal buffer`,
        });
        break;
      case 'whoami':
        newHistory.push({
          type: 'output',
          text: "Amaan Ahmad — Founder @ CIT India. AI/Web3 Engineer, Amazon Author & KnowledgeSense Content Writer. 70+ public repos on GitHub, community leader of 450K+ members.",
        });
        break;
      case 'projects':
        newHistory.push({
          type: 'output',
          text: "TOP REPOS:\n- kiro-pro-free (167★) - Educational Kiro IDE tool\n- everything-kiro (26★) - Complete Kiro IDE agents & configs\n- everything-antigravity - Google Antigravity IDE ecosystem\n- everything-codex (2★) - Codex skills, plugins & AGENTS.md\n- AgentMarket - On-chain AI agent marketplace (Solana)\n- Alpenglow Verifier (4★) - Solana consensus TLA+ verification",
        });
        break;
      case 'skills':
        newHistory.push({
          type: 'output',
          text: "TECH STACK: TypeScript, Python, Rust, Solana, Next.js, Gemini, Codex, TLA+, MCP.\nTRANSLATION SKILLS: Data Annotation, AI Model Training, Transliteration, Subtitling across Hindi, Urdu, English & Arabic.",
        });
        break;
      case 'books':
      case 'writing':
        newHistory.push({
          type: 'output',
          text: `PUBLISHING & ARTICLES:\n- Amazon Kindle Author: ${PROFILE.links.amazonAuthor}\n- KnowledgeSense Writer: ${PROFILE.links.knowledgeSense}`,
        });
        break;
      case 'resume':
        window.open(PROFILE.resume, '_blank');
        newHistory.push({ type: 'output', text: "Downloading resume PDF..." });
        break;
      case 'contact':
        newHistory.push({
          type: 'output',
          text: `Email: ${PROFILE.email}\nGitHub: ${PROFILE.links.github}\nLinkedIn: ${PROFILE.links.linkedin}\nTwitter: ${PROFILE.links.twitter}`,
        });
        break;
      case 'github':
        window.open(PROFILE.links.github, '_blank');
        newHistory.push({ type: 'output', text: "Opening GitHub profile..." });
        break;
      case 'sudo hire':
        onToast("Redirecting to contact form...");
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        newHistory.push({ type: 'output', text: "ACCESS GRANTED: Opening contact form." });
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      default:
        newHistory.push({
          type: 'output',
          text: `command not found: ${trimmed}. Type 'help' for available commands.`,
        });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  // Scroll internal terminal box only — NOT window scrollIntoView
  useEffect(() => {
    if (terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="rounded-md bg-[#0c0c0c] border border-slate-800 overflow-hidden font-mono text-sm shadow-2xl relative flex flex-col h-[420px]">
      <CornerBrackets />
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
          <span className="text-slate-500 text-xs ml-2">amaan@cit-india: ~ interactive shell</span>
        </div>
        <span className="text-[10px] text-cyan-500/60 uppercase">CLI 3.2</span>
      </div>

      <div ref={terminalScrollRef} className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-3 text-slate-300">
        {history.map((item, i) => (
          <div key={i} className={item.type === 'input' ? 'text-cyan-400 font-bold' : 'text-slate-400 whitespace-pre-wrap leading-relaxed'}>
            {item.text}
          </div>
        ))}
      </div>

      {/* Command suggestion buttons */}
      <div className="px-4 py-2 border-t border-slate-800/60 bg-slate-950/60 flex items-center gap-2 overflow-x-auto text-[11px]">
        <span className="text-slate-500 shrink-0 font-bold">Quick:</span>
        {['whoami', 'projects', 'skills', 'books', 'resume', 'contact', 'sudo hire', 'clear'].map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => handleCommand(cmd)}
            className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 hover:bg-cyan-500 hover:text-black transition-colors shrink-0 cursor-pointer"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Input row */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCommand(inputVal);
        }}
        className="flex items-center px-4 py-3 bg-slate-900 border-t border-slate-800"
      >
        <span className="text-emerald-500 mr-2 font-bold">➜</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type command ('help', 'projects', 'skills', 'books', 'resume')..."
          className="w-full bg-transparent text-white focus:outline-none font-mono text-sm placeholder:text-slate-600"
        />
        <button type="submit" className="text-slate-500 hover:text-cyan-400 cursor-pointer">
          <ChevronRight size={16} />
        </button>
      </form>
    </div>
  );
};

const ExperienceTimeline = () => {
  const items = [
    { year: "2026", role: "AI & Developer Tooling Lead", desc: "Author of kiro-pro-free (167★), everything-kiro (26★), and everything-antigravity. Architecting multi-agent workflow packs around skills, plugins, hooks, AGENTS.md, and MCP." },
    { year: "2025", role: "Founder @ CIT India", desc: "Building secure digital platforms, Solana protocols, and enterprise software. Shipped AgentMarket, FirstStep SDK, and formal verification frameworks." },
    { year: "2024", role: "Web3 & AI Verification Engineer", desc: "Formally verified Solana Alpenglow consensus via TLA+ with 100% mathematical success rate across 70+ public GitHub repos." },
    { year: "2023", role: "Multilingual AI & Translation Specialist", desc: "Specializing in Data Annotation, AI Model Training, Transliteration, Subtitling, and localization across Hindi, Urdu, English, and Arabic." },
    { year: "2022", role: "Community Lead & Full-Stack Developer", desc: "Scaled the Free Fire Community to 450K+ members and created FreeFireItems explorer with open data APIs." },
  ];

  return (
    <div className="relative border-l border-slate-800 ml-4 space-y-8 py-2">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="relative pl-8 group"
        >
          <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-600 group-hover:bg-cyan-500 group-hover:border-cyan-400 transition-colors" />
          <div className="font-mono text-xs text-cyan-500 mb-1">{item.year}</div>
          <h4 className="text-lg font-bold text-white mb-1">{item.role}</h4>
          <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
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
          className="px-6 py-3 rounded-full bg-slate-900/60 border border-cyan-500/20 text-cyan-300 font-mono text-sm whitespace-nowrap backdrop-blur-md hover:bg-cyan-500/10 hover:border-cyan-400/50 hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.05)] flex items-center gap-2.5"
        >
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
          {tech}
        </div>
      ))}
    </div>
  </div>
);

// ============================================================
//  REAL CURATED GITHUB PROJECTS & CATEGORIES
// ============================================================
const aiProjects: Project[] = [
  {
    title: "kiro-pro-free",
    desc: "Educational open-source developer tool demonstrating IDE techniques, machine ID reset, and auto-update management for Kiro IDE.",
    tech: ["Python", "Kiro IDE", "Developer Tools", "Agentic Tooling"],
    status: "Production",
    link: "https://github.com/iamaanahmad/kiro-pro-free",
    metric: "167★ Stars", stars: 167, forks: 46,
    longDesc: "kiro-pro-free is a widely popular open-source educational utility built for Kiro IDE power users. Features automatic machine ID resetting, auto-update management, and token optimization.",
  },
  {
    title: "everything-kiro",
    desc: "The complete ecosystem of Kiro IDE configs, custom agents, skills, hooks, and MCP integrations for developer productivity.",
    tech: ["Kiro IDE", "MCP", "Skills", "Hooks", "LLM"],
    status: "Production",
    link: "https://github.com/iamaanahmad/everything-kiro",
    metric: "26★ Stars", stars: 26, forks: 9,
    longDesc: "Comprehensive collection of agent workflows, custom MCP servers, automation hooks, and developer skills tailored for Kiro IDE environment.",
  },
  {
    title: "everything-antigravity",
    desc: "The definitive collection of production-ready agents, skills, and configurations for Google's Antigravity IDE.",
    tech: ["Antigravity", "AI Agents", "Skills", "Developer Tools"],
    status: "Production",
    link: "https://github.com/iamaanahmad/everything-antigravity",
    metric: "Antigravity IDE", stars: 1,
    longDesc: "Specialized skill packs, background agent workflows, and automation rules engineered specifically for Google Antigravity IDE.",
  },
  {
    title: "everything-codex",
    desc: "Production-ready Codex workflows built around skills, plugins, AGENTS.md, hooks, and MCP for repo setup and agent automation.",
    tech: ["Codex", "AGENTS.md", "Plugins", "MCP", "Skills"],
    status: "Production",
    link: "https://github.com/iamaanahmad/everything-codex",
    metric: "Codex Ops", stars: 2, forks: 1,
    longDesc: "Battle-tested Codex infrastructure including AGENTS.md standards, custom plugins, execution hooks, and MCP server integrations.",
  },
  {
    title: "AgoraCare",
    desc: "Voice-first healthcare companion that helps elderly users and caregivers manage medications and appointments through natural conversation.",
    tech: ["TypeScript", "Agora", "Healthcare AI", "Voice AI"],
    status: "Production",
    link: "https://github.com/iamaanahmad/AgoraCare",
    metric: "Voice AI",
    longDesc: "AI voice assistant using real-time audio streams to aid patients in medication tracking, symptom logging, and emergency contact alerts.",
  },
  {
    title: "ClinAssist Gemini",
    desc: "Gemini-powered clinical AI assistant converting patient histories and voice notes into structured insights safely and explainably.",
    tech: ["TypeScript", "Gemini", "Healthcare AI"],
    status: "Research",
    link: "https://github.com/iamaanahmad/ClinAssistGemini",
    metric: "Clinical AI",
  },
  {
    title: "AI Resume Maker",
    desc: "AI-powered resume builder for creating ATS-friendly resumes with instant formatting. Free and open source.",
    tech: ["Next.js", "Gemini", "ATS", "React"],
    status: "Production",
    link: "https://freeresumebuilderai.hindustan.site/",
    metric: "ATS-Ready",
  },
  {
    title: "Certificate Generator",
    desc: "Open-source web tool for bulk certificate generation, custom layouts, and AI-assisted credential verification.",
    tech: ["TypeScript", "Gemini", "Canvas"],
    status: "Production",
    link: "https://iamaanahmad.github.io/CertificateGenerator/",
    metric: "Bulk Gen",
  },
];

const web3Projects: Project[] = [
  {
    title: "AgentMarket",
    desc: "Decentralized marketplace to hire autonomous AI agents on Solana with native SOL micro-payments and smart contract verification.",
    tech: ["Python", "Solana", "Smart Contracts", "AI Marketplace"],
    status: "Production",
    link: "https://github.com/iamaanahmad/agentmarket",
    metric: "Solana AI", stars: 1,
    longDesc: "An on-chain protocol where autonomous AI agents register capabilities, execute requested tasks, and verify deliverables via Solana smart contracts.",
  },
  {
    title: "FirstStep SDK",
    desc: "Open-source Solana SDK removing Web3 onboarding friction through guest accounts, embedded wallets, and sponsored gas transactions.",
    tech: ["TypeScript", "Solana", "SDK", "Web3 UX"],
    status: "Production",
    link: "https://github.com/iamaanahmad/firststep",
    metric: "Web3 SDK",
    longDesc: "Developer framework for Web3 apps on Solana that allows instant friction-free user onboarding without requiring upfront wallet setup.",
  },
  {
    title: "Alpenglow Verifier",
    desc: "Mathematical proof of Solana's Alpenglow consensus protocol with 100% verification success using TLA+ formal methods.",
    tech: ["TLA+", "Formal Verification", "Solana", "Consensus"],
    status: "Research",
    link: "https://github.com/iamaanahmad/alpenglow-verifier",
    metric: "100% Verified", stars: 4,
    longDesc: "Formal mathematical specification and model verification of Solana's Alpenglow protocol using TLA+ to prove fault tolerance guarantees.",
  },
  {
    title: "AIArtify",
    desc: "Generative AI art platform validated by a 5-node consensus AI jury with prompt metadata stored permanently on-chain.",
    tech: ["TypeScript", "LazAI", "Solana", "NFT"],
    status: "Production",
    link: "https://ai-artify.xyz/",
    metric: "AI Jury",
  },
  {
    title: "AI Smart Contract Generator",
    desc: "Generates production-ready Solidity smart contracts from natural language prompts with security checks.",
    tech: ["TypeScript", "Gemini", "Solidity", "Web3"],
    status: "Production",
    link: "https://iamaanahmad.github.io/ai-smart-contract-generator/",
    metric: "Dev Tool",
  },
  {
    title: "CodeCup HQ",
    desc: "Web3 competitive coding platform on Solana featuring live coding duels, automated scoring, and on-chain badges.",
    tech: ["Solana", "Web3", "Next.js", "Community"],
    status: "Production",
    link: "https://www.codecup.cc/",
    metric: "Code Battles",
  },
];

const web2Projects: Project[] = [
  {
    title: "git-indexer",
    desc: "A beautiful command-line and web tool to explore GitHub profiles, repositories, and files with syntax highlighting and interactive menus.",
    tech: ["TypeScript", "GitHub API", "CLI", "HTML"],
    status: "Production",
    link: "https://github.com/iamaanahmad/git-indexer",
    metric: "CLI Tool", stars: 0,
    longDesc: "Command-line and browser tool designed for developers to index, preview, and inspect remote GitHub code repositories seamlessly.",
  },
  {
    title: "ReviewQR-Pro",
    desc: "Generate custom printable QR code posters for Google Business Profiles to boost authentic customer reviews.",
    tech: ["TypeScript", "Google Business", "QR Code"],
    status: "Production",
    link: "https://github.com/iamaanahmad/ReviewQR-Pro",
    metric: "Business Tool", stars: 2,
  },
  {
    title: "FreeFireItems Explorer",
    desc: "Comprehensive database and interactive browser for 5,000+ Free Fire in-game items with open data REST APIs.",
    tech: ["HTML", "Open Data", "REST API"],
    status: "Production",
    link: "https://arsenal.freefirecommunity.com/",
    metric: "5K+ Items", stars: 16, forks: 12,
  },
  {
    title: "CIT India",
    desc: "Digital agency platform delivering web development, cloud architectures, AI tools, and enterprise software solutions.",
    tech: ["Next.js", "Enterprise", "Agency"],
    status: "Production",
    link: "https://www.cit.org.in/",
    metric: "Global Agency",
  },
  {
    title: "Free Fire Community",
    desc: "Connecting gamers worldwide — a 450K+ member gaming Q&A and content ecosystem.",
    tech: ["WordPress", "Community", "Gaming"],
    status: "Production",
    link: "https://www.freefirecommunity.com/",
    metric: "450K+ Members",
  },
  {
    title: "Eventola",
    desc: "No-code event microsite builder converting event details into conversion-optimized landing pages instantly.",
    tech: ["TypeScript", "Appwrite", "SaaS"],
    status: "Production",
    link: "https://eventola.appwrite.network/",
    metric: "SaaS Platform", stars: 1,
  },
  {
    title: "Gaza Aid Trust",
    desc: "Community-powered crisis map and humanitarian direct aid coordination platform.",
    tech: ["Next.js", "Humanitarian", "Maps"],
    status: "Social Impact",
    link: "https://gaza-aid-trust.vercel.app/",
    metric: "Crisis Aid", stars: 2,
  },
  {
    title: "UPI Payment Gateway",
    desc: "Zero-fee Indian UPI payment QR & link generator for freelancers and local businesses.",
    tech: ["Next.js", "FinTech", "UPI"],
    status: "Production",
    link: "https://upipg.cit.org.in/",
    metric: "Instant Pay", stars: 1,
  },
];

const translationServices: Project[] = [
  {
    title: "Multilingual AI Model Training",
    desc: "Curating high-quality evaluation benchmarks, domain-specific terminologies, and dialectal nuances for LLMs in South Asian & Middle Eastern languages.",
    tech: ["AI Training", "LLM Alignment", "Hindi", "Urdu", "Arabic"],
    status: "Language AI",
    link: PROFILE.links.github,
    metric: "Model Tuning",
    longDesc: "Fine-tuning and evaluating Large Language Models for high accuracy in Hindi, Urdu, Arabic, and English context comprehension.",
  },
  {
    title: "Data Annotation & RLHF",
    desc: "Precision dataset curation, prompt-response annotation, toxicity filtering, and RLHF alignment across Hindi, Urdu, Arabic, and English.",
    tech: ["Data Annotation", "RLHF", "Dataset Curation", "Quality Control"],
    status: "Language AI",
    link: PROFILE.links.github,
    metric: "RLHF Datasets",
  },
  {
    title: "Contextual Transliteration & Subtitling",
    desc: "High-speed phonetic transliteration and video subtitling preserving cultural context, idiom fidelity, and emotional tone.",
    tech: ["Transliteration", "Subtitling", "Audio-Visual", "Localization"],
    status: "Language AI",
    link: PROFILE.links.github,
    metric: "Media Subtitles",
  },
  {
    title: "Cross-Language Translation & Localization",
    desc: "Human-in-the-loop professional translation for technical documentation, legal agreements, software UI, and media content.",
    tech: ["Translation", "Hindi", "Urdu", "Arabic", "English"],
    status: "Language AI",
    link: PROFILE.links.github,
    metric: "100% Contextual",
  },
];

type Category = 'ai' | 'web3' | 'web2' | 'translation';

const PROJECT_GROUPS: Record<Category, { label: string; icon: React.ReactNode; data: Project[] }> = {
  ai: { label: "AI & Tooling", icon: <Sparkles size={14} />, data: aiProjects },
  web3: { label: "Web3 / Solana", icon: <Cpu size={14} />, data: web3Projects },
  web2: { label: "Web & SaaS", icon: <Globe size={14} />, data: web2Projects },
  translation: { label: "AI Translation & Annotation", icon: <Languages size={14} />, data: translationServices },
};

// ============================================================
//  STATS
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
//  TOAST NOTIFICATION
// ============================================================
const Toast = ({ message }: { message: string | null }) => (
  <AnimatePresence>
    {message && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-6 right-6 z-[120] bg-slate-900 border border-cyan-500 text-cyan-300 font-mono text-xs px-4 py-3 rounded shadow-xl flex items-center gap-2"
      >
        <Check size={14} className="text-emerald-400" />
        {message}
      </motion.div>
    )}
  </AnimatePresence>
);

// ============================================================
//  SCROLL TO TOP BUTTON
// ============================================================
const ScrollToTopButton = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="fixed bottom-6 left-6 z-40 w-11 h-11 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shadow-lg hover:border-cyan-400 hover:bg-cyan-500 hover:text-black transition-all cursor-pointer"
    >
      <ArrowUp size={16} />
      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 36 36">
        <path
          className="text-slate-800"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="text-cyan-400"
          strokeDasharray={`${scrollProgress}, 100`}
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
    </button>
  );
};

// ============================================================
//  MAIN COMPONENT
// ============================================================
export default function Home() {
  const [booted, setBooted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [category, setCategory] = useState<Category>('ai');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [gh, setGh] = useState<{ repos: number; followers: number; stars: number } | null>(null);
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const stackRow1 = ["TypeScript", "Rust", "Python", "Solidity", "Next.js", "React", "Tailwind CSS"];
  const stackRow2 = ["Solana", "Anchor", "Gemini AI", "TLA+", "Node.js", "Appwrite", "Codex", "MCP"];

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Live GitHub stats
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${PROFILE.handle}`);
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) setGh({ repos: data.public_repos ?? 74, followers: data.followers ?? 23, stars: 220 });
      } catch { /* fallback */ }
    })();
    return () => { cancelled = true; };
  }, []);

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
    { value: 3, suffix: '+', label: 'Amazon eBooks' },
  ];

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#author', label: 'Books & Writing' },
    { href: '#translation', label: 'Translation' },
    { href: '#stack', label: 'Stack' },
    { href: '#contact', label: 'Contact' },
  ];

  // Smooth scroll handler with offset for navbar
  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    const targetId = id.replace('#', '');
    const el = document.getElementById(targetId);
    if (el) {
      const yOffset = -80; // height of fixed navbar
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  // Filter projects by current category and search query
  const rawProjects = PROJECT_GROUPS[category].data;
  const filteredProjects = rawProjects.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.tech.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <>
      <AnimatePresence>
        {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      </AnimatePresence>

      <Toast message={toastMsg} />
      <ScrollToTopButton />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden relative">
        <Scanlines />

        <div className="fixed top-0 left-0 p-4 z-40 font-mono text-[10px] text-cyan-500/40 pointer-events-none hidden md:block">
          SYS.VER.3.2 // AMAAN AHMAD
        </div>

        {/* Scroll progress */}
        <motion.div className="fixed top-0 left-0 right-0 h-0.5 bg-cyan-500 origin-left z-[55] shadow-[0_0_10px_#06b6d4]" style={{ scaleX }} />

        {/* Navbar */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-[#050505]/90 backdrop-blur-md py-3 border-white/10' : 'py-5 bg-transparent border-transparent'}`}>
          <div className="container mx-auto px-6 flex justify-between items-center">
            <a href="#top" onClick={(e) => { e.preventDefault(); scrollTo('#top'); }} className="flex items-center gap-1 font-mono font-bold text-xl tracking-tighter cursor-pointer">
              <span className="text-cyan-500">&lt;</span>Amaan<span className="text-cyan-500">/&gt;</span>
            </a>

            <div className="hidden md:flex items-center gap-6">
              <div className="flex gap-6 text-xs font-mono uppercase tracking-widest text-slate-400">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                    className="hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    /{l.label}
                  </a>
                ))}
              </div>
              <a
                href={PROFILE.resume}
                download="Amaan_Ahmad_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs font-mono hover:bg-emerald-500 hover:text-black transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <FileText size={13} /> Resume
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
                className="px-4 py-1.5 rounded bg-cyan-500 text-black text-xs font-mono font-bold hover:bg-cyan-400 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Hire Me
              </a>
            </div>

            <button className="md:hidden text-white cursor-pointer" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
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
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                      className="text-left hover:text-cyan-400 transition-colors cursor-pointer"
                    >
                      /{l.label}
                    </a>
                  ))}
                  <a
                    href={PROFILE.resume}
                    download="Amaan_Ahmad_Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="text-left text-emerald-400 flex items-center gap-2"
                  >
                    <FileText size={14} /> /Download Resume
                  </a>
                  <a
                    href="#contact"
                    onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
                    className="text-left text-cyan-400"
                  >
                    /Hire Me
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* HERO SECTION WITH AMAAN'S PHOTO & RESUME DOWNLOAD */}
        <section id="top" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 border-b border-white/5">
          <ParticleField />
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
              
              {/* Left Column: Text & CTAs */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                  <div className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-mono uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    Available for Hire & AI/Web3 Collaborations
                  </div>
                </motion.div>

                <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-4 leading-[0.98]">
                  <DecryptedText text="AMAAN AHMAD" className="text-white block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 block mt-2 text-2xl sm:text-3xl md:text-4xl">
                    {PROFILE.role}
                  </span>
                </h1>

                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                  className="text-base md:text-lg text-slate-400 max-w-2xl mb-8 leading-relaxed"
                >
                  {PROFILE.tagline}
                </motion.p>

                {/* Primary Actions including Download Resume */}
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10 w-full sm:w-auto">
                  <MagneticButton variant="primary" onClick={() => scrollTo('#projects')}>
                    Explore Projects <ChevronRight size={16} />
                  </MagneticButton>
                  <a
                    href={PROFILE.resume}
                    download="Amaan_Ahmad_Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="relative px-6 py-3 rounded-md font-mono text-sm uppercase tracking-wider transition-all duration-300 border bg-emerald-500/10 border-emerald-500/50 text-emerald-300 hover:bg-emerald-500 hover:text-black flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                  >
                    <FileText size={16} /> Download Resume
                  </a>
                  <MagneticButton variant="secondary" onClick={() => scrollTo('#contact')}>
                    <Mail size={16} /> Get in Touch
                  </MagneticButton>
                </div>

                {/* Social row */}
                <div className="flex items-center gap-3 flex-wrap justify-center lg:justify-start">
                  {[
                    { icon: <Github size={16} />, href: PROFILE.links.github, label: 'GitHub' },
                    { icon: <Linkedin size={16} />, href: PROFILE.links.linkedin, label: 'LinkedIn' },
                    { icon: <Twitter size={16} />, href: PROFILE.links.twitter, label: 'Twitter' },
                    { icon: <BookOpen size={16} />, href: PROFILE.links.amazonAuthor, label: 'Amazon Author' },
                    { icon: <Feather size={16} />, href: PROFILE.links.knowledgeSense, label: 'KnowledgeSense' },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      title={s.label}
                      className="px-3 py-2 rounded-md border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/50 hover:-translate-y-0.5 transition-all flex items-center gap-2 text-xs font-mono"
                    >
                      {s.icon}
                      <span>{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Right Column: Beautiful Cyberpunk Framed Photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative shrink-0"
              >
                <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.25)] group bg-slate-900">
                  <CornerBrackets />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={PROFILE.photo}
                    alt={PROFILE.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded border border-cyan-500/30 text-cyan-300">
                    <span className="flex items-center gap-1.5 font-bold">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      FOUNDER @ CIT INDIA
                    </span>
                    <span className="text-slate-400">NEW DELHI, IN</span>
                  </div>
                </div>

                {/* Floating Micro-Badge */}
                <div className="absolute -top-3 -right-3 bg-cyan-500 text-black font-mono text-[10px] font-bold px-3 py-1 rounded-full shadow-lg border border-cyan-300 uppercase tracking-widest hidden sm:block">
                  AI & Web3 Architect
                </div>
              </motion.div>

            </div>
          </div>

          <div className="absolute bottom-6 left-0 w-full px-6 hidden lg:flex justify-between text-[10px] font-mono text-slate-600 uppercase tracking-widest">
            <span>Repos: {gh?.repos ?? 74}+ (167★ Top)</span>
            <span>Community: 450K+</span>
            <span>Focus: AI Agents · Solana · Tooling · Translation</span>
            <span>Location: New Delhi, IN</span>
          </div>
        </section>

        {/* ABOUT & INTERACTIVE CLI TERMINAL */}
        <section id="about" className="py-24 md:py-32 relative border-b border-white/5 bg-[#080808]">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
              {/* Interactive Terminal */}
              <div className="w-full lg:w-1/2">
                <InteractiveTerminal onToast={showToast} />
              </div>

              {/* Narrative + stats + timeline */}
              <div className="w-full lg:w-1/2">
                <div className="text-cyan-500 font-mono text-xs uppercase tracking-widest mb-2">/ Executive Profile</div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Architecting software & <span className="text-cyan-500">intelligent agent ecosystems</span>
                </h2>
                <p className="text-slate-400 mb-8 text-base leading-relaxed">
                  Founder of <strong className="text-white">CIT India</strong>, open-source creator behind popular tools like{' '}
                  <strong className="text-cyan-300">kiro-pro-free (167★)</strong> and <strong className="text-cyan-300">everything-kiro (26★)</strong>, published author on Amazon, content writer at KnowledgeSense, and community leader of 450K+ members. I craft agentic tooling, formally verify Solana consensus, and deliver high-precision AI translation services.
                </p>

                <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                  {stats.map((s) => <StatCard key={s.label} stat={s} start={statsInView} />)}
                </div>

                <ExperienceTimeline />
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS WITH IMPROVED CATEGORY FILTER BAR */}
        <section id="projects" className="py-24 md:py-32 border-b border-white/5 bg-[#050505] relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-cyan-900/5 blur-[120px] pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10">
              <div>
                <div className="text-cyan-500 font-mono text-xs uppercase tracking-widest mb-2">/ Featured Work & Tooling</div>
                <h2 className="text-3xl md:text-5xl font-bold">Curated Repos & Services</h2>
              </div>

              {/* Improved Category Filter Box UI (Agency Design System) */}
              <div className="w-full lg:w-auto bg-slate-900/80 border border-slate-800 p-1.5 rounded-xl shadow-2xl backdrop-blur-md relative overflow-hidden">
                <CornerBrackets />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 font-mono text-xs">
                  {(Object.keys(PROJECT_GROUPS) as Category[]).map((key) => {
                    const isSelected = category === key;
                    const group = PROJECT_GROUPS[key];
                    return (
                      <button
                        key={key}
                        onClick={() => setCategory(key)}
                        className={`relative px-4 py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border ${
                          isSelected
                            ? 'bg-cyan-500 text-black border-cyan-400 font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                            : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        <span>{group.icon}</span>
                        <span className="truncate">{group.label}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${isSelected ? 'bg-black/20 text-black' : 'bg-slate-800 text-slate-400'}`}>
                          {group.data.length}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Search bar & statistics */}
            <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/40 p-4 border border-slate-800 rounded-md">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by tech or keyword (e.g. Solana, MCP, Kiro)..."
                  className="w-full bg-slate-950 border border-slate-800 pl-9 pr-4 py-2 text-xs text-white rounded font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-400 w-full sm:w-auto justify-between">
                <span>Showing {filteredProjects.length} of {rawProjects.length} entries</span>
                <MagneticButton variant="outline" className="text-[11px] py-1.5 px-3" onClick={() => window.open(`${PROFILE.links.github}?tab=repositories`, '_blank')}>
                  <Code2 size={13} /> View All Repos
                </MagneticButton>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((p, i) => (
                  <ProjectCard
                    key={`${category}-${p.title}`}
                    project={p}
                    index={i}
                    onSelect={(proj) => setSelectedProject(proj)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* AMAZON AUTHOR & KNOWLEDGESENSE WRITING SECTION */}
        <section id="author" className="py-24 md:py-32 bg-[#080808] border-b border-white/5 relative">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 border border-yellow-500/30 rounded-full bg-yellow-500/5 text-yellow-400 text-xs font-mono uppercase tracking-widest">
                <BookOpen size={14} /> Publications & Editorial Writing
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Published Author & Content Writer</h2>
              <p className="text-slate-400 text-base md:text-lg">
                Authoring technical handbooks on the <strong className="text-white">Amazon Kindle Store</strong> and publishing articles on <strong className="text-cyan-300">KnowledgeSense</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Amazon Kindle Author Card */}
              <div className="bg-slate-900/60 border border-yellow-500/30 hover:border-yellow-500/60 rounded-xl p-6 sm:p-8 relative overflow-hidden font-mono transition-colors flex flex-col justify-between">
                <CornerBrackets />
                <div>
                  <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-md text-yellow-400">
                        <BookOpen size={24} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg">Amazon Kindle Store</h4>
                        <p className="text-slate-500 text-xs">Author Handle: Amaan Ahmad</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-yellow-500/10 text-yellow-400 px-2.5 py-1 rounded border border-yellow-500/30 font-bold">KINDLE AUTHOR</span>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                    Author of technical books and developer reference manuals published globally on the Amazon Kindle store.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-800/80">
                  <a
                    href={PROFILE.links.amazonAuthor}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded bg-yellow-500 text-black font-bold text-xs hover:bg-yellow-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen size={14} /> Amazon Author Profile <ArrowUpRight size={13} />
                  </a>
                  <a
                    href={PROFILE.links.amazonBooks}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded border border-slate-700 text-slate-300 text-xs hover:border-white hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    eBooks Store <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              {/* KnowledgeSense Content Writer Card */}
              <div className="bg-slate-900/60 border border-cyan-500/30 hover:border-cyan-500/60 rounded-xl p-6 sm:p-8 relative overflow-hidden font-mono transition-colors flex flex-col justify-between">
                <CornerBrackets />
                <div>
                  <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-md text-cyan-400">
                        <Feather size={24} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg">KnowledgeSense</h4>
                        <p className="text-slate-500 text-xs">Editorial Content Writer</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2.5 py-1 rounded border border-cyan-500/30 font-bold">CONTENT WRITER</span>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                    Content writer and editor at KnowledgeSense crafting in-depth articles, technology tutorials, and insightful guides.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <a
                    href={PROFILE.links.knowledgeSense}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Feather size={14} /> KnowledgeSense Author Page <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRANSLATION & MULTILINGUAL AI SKILLS SECTION */}
        <section id="translation" className="py-24 md:py-32 bg-[#050505] border-b border-white/5 relative">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 border border-purple-500/30 rounded-full bg-purple-500/5 text-purple-400 text-xs font-mono uppercase tracking-widest">
                <Languages size={14} /> Language & AI Model Training
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Multilingual AI & Translation Specialist</h2>
              <p className="text-slate-400 text-base md:text-lg">
                Specialized in human-in-the-loop AI training, high-accuracy dataset annotation, transliteration, and contextual translation across <strong className="text-white">Hindi, Urdu, English, and Arabic</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Data Annotation",
                  icon: <ShieldCheck className="text-purple-400" size={24} />,
                  desc: "Precision dataset curation, text classification, and RLHF prompt-response pair evaluation for multilingual LLMs.",
                  tags: ["Hindi", "Urdu", "Arabic", "RLHF"],
                },
                {
                  title: "AI Model Training",
                  icon: <Cpu className="text-cyan-400" size={24} />,
                  desc: "Benchmarking and fine-tuning language models for cultural accuracy, idiom preservation, and domain terminology.",
                  tags: ["LLM Tuning", "NLP", "Quality Control"],
                },
                {
                  title: "Transliteration & Subtitling",
                  icon: <Layers className="text-emerald-400" size={24} />,
                  desc: "Contextual phonetic transliteration and video subtitling ensuring visual synchronization and emotional resonance.",
                  tags: ["Subtitling", "Audio-Visual", "Phonetics"],
                },
                {
                  title: "Language Translation",
                  icon: <Languages className="text-yellow-400" size={24} />,
                  desc: "Context-aware translation across Hindi, Urdu, English, and Arabic for technical docs, legal terms, and software UI.",
                  tags: ["Hindi", "Urdu", "Arabic", "English"],
                },
              ].map((serv, idx) => (
                <div key={idx} className="bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 rounded-lg p-6 flex flex-col transition-all duration-300 group">
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-md w-fit mb-4 group-hover:scale-110 transition-transform">
                    {serv.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 font-mono">{serv.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-6 flex-1">{serv.desc}</p>
                  <div className="flex flex-wrap gap-1.5 border-t border-slate-800/80 pt-4">
                    {serv.tags.map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STACK MARQUEE */}
        <section id="stack" className="py-24 md:py-32 bg-[#080808] relative overflow-hidden border-b border-white/5">
          <div className="container mx-auto px-6 text-center relative z-10 mb-12">
            <h4 className="text-cyan-500 font-mono text-xs uppercase tracking-widest mb-4">/ Technical Arsenal</h4>
            <h2 className="text-3xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">
              High-Velocity Technology Stack
            </h2>
          </div>
          <div className="relative w-full overflow-hidden space-y-6">
            <TechMarquee items={stackRow1} />
            <TechMarquee items={stackRow2} reverse />
            <div className="absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-[#080808] to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-[#080808] to-transparent pointer-events-none" />
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-24 md:py-32 bg-[#050505] relative">
          <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <div className="text-center mb-14">
              <div className="inline-block px-3 py-1 mb-4 border border-cyan-500/30 rounded-full bg-cyan-500/5 text-cyan-400 text-xs font-mono uppercase tracking-widest">
                / Get in Touch
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Let&apos;s build the future together</h2>
              <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
                Have a project, open-source initiative, or need AI/Web3 software development or translation services? Reach out directly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-md text-cyan-500"><Mail size={22} /></div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">Email</h4>
                    <p className="text-slate-400 text-sm mb-2">Primary contact point.</p>
                    <div className="flex items-center gap-2">
                      <a href={`mailto:${PROFILE.email}`} className="text-cyan-400 font-mono hover:text-white transition-colors break-all text-sm">{PROFILE.email}</a>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(PROFILE.email);
                          showToast("Email address copied to clipboard!");
                        }}
                        title="Copy Email"
                        className="p-1 text-slate-500 hover:text-cyan-300 transition-colors cursor-pointer"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-md text-purple-500"><MapPin size={22} /></div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">Location</h4>
                    <p className="text-slate-400 text-sm">{PROFILE.location}</p>
                    <p className="text-slate-500 text-xs mt-1 font-mono">Available worldwide remotely</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-md text-yellow-500"><BookOpen size={22} /></div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">Author & Social Endpoints</h4>
                    <p className="text-slate-400 text-sm mb-2">Connect across platforms.</p>
                    <div className="flex flex-wrap gap-3 font-mono text-xs">
                      <a href={PROFILE.links.amazonAuthor} target="_blank" rel="noreferrer" className="text-yellow-400 hover:text-white">Amazon Author</a>
                      <span className="text-slate-700">·</span>
                      <a href={PROFILE.links.knowledgeSense} target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-white">KnowledgeSense</a>
                      <span className="text-slate-700">·</span>
                      <a href={PROFILE.links.github} target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-white">GitHub</a>
                      <span className="text-slate-700">·</span>
                      <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-white">LinkedIn</a>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={PROFILE.resume}
                    download="Amaan_Ahmad_Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-mono text-xs hover:bg-emerald-500 hover:text-black transition-colors"
                  >
                    <FileText size={16} /> Download Full Resume PDF
                  </a>
                </div>
              </div>

              <div className="space-y-4 p-6 bg-slate-900/40 border border-white/10 rounded-lg relative overflow-hidden">
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
                    rows={4} placeholder="Describe your project, software need, or translation request..." value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 p-3 text-sm text-white rounded focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                  />
                </div>
                <MagneticButton
                  className="w-full flex justify-center items-center gap-2 cursor-pointer"
                  onClick={() => {
                    const subject = encodeURIComponent(`Inquiry from ${formData.name || 'Portfolio Visitor'}`);
                    const body = encodeURIComponent(`Hi Amaan,\n\n${formData.message}\n\n---\nFrom: ${formData.name}\nEmail: ${formData.email}`);
                    window.open(`mailto:${PROFILE.email}?subject=${subject}&body=${body}`, '_blank');
                    showToast("Opening your default mail client...");
                  }}
                >
                  <Send size={16} /> Send Message
                </MagneticButton>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-10 border-t border-white/5 bg-[#050505] font-mono text-xs text-slate-500">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              &copy; {new Date().getFullYear()} {PROFILE.name} ·{' '}
              <a href={PROFILE.links.company} target="_blank" rel="noreferrer" className="hover:text-cyan-400">CIT India</a>
            </div>
            <div className="flex gap-6 flex-wrap">
              <a href={PROFILE.links.amazonAuthor} target="_blank" rel="noreferrer" className="hover:text-yellow-400">AMAZON AUTHOR</a>
              <a href={PROFILE.links.knowledgeSense} target="_blank" rel="noreferrer" className="hover:text-cyan-400">KNOWLEDGESENSE</a>
              <a href={PROFILE.links.github} target="_blank" rel="noreferrer" className="hover:text-cyan-400">GITHUB</a>
              <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-400">LINKEDIN</a>
              <a href={PROFILE.links.twitter} target="_blank" rel="noreferrer" className="hover:text-cyan-400">TWITTER</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
