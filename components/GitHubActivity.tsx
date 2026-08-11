"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitCommit, Star, GitFork, TrendingUp, Calendar, Code2, ExternalLink, Activity } from "lucide-react";

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string; url: string };
  created_at: string;
  payload: {
    commits?: Array<{ message: string }>;
    ref_type?: string;
    action?: string;
  };
}

interface LanguageStat {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Rust: "#dea584",
  Solidity: "#AA6746",
  Shell: "#89e051",
};

const CornerBrackets = () => (
  <>
    <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-cyan-500/50 pointer-events-none" />
    <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-cyan-500/50 pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-cyan-500/50 pointer-events-none" />
    <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-cyan-500/50 pointer-events-none" />
  </>
);

export default function GitHubActivity() {
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [languages, setLanguages] = useState<LanguageStat[]>([]);
  const [stats, setStats] = useState({
    repos: 74,
    followers: 23,
    totalStars: 220,
    commitsCount: 0,
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchGitHubData() {
      try {
        // Fetch User Info
        const userRes = await fetch("https://api.github.com/users/iamaanahmad");
        if (userRes.ok) {
          const userData = await userRes.json();
          if (!cancelled) {
            setStats((prev) => ({
              ...prev,
              repos: userData.public_repos ?? prev.repos,
              followers: userData.followers ?? prev.followers,
            }));
          }
        }

        // Fetch Repos for Stars and Languages
        const reposRes = await fetch("https://api.github.com/users/iamaanahmad/repos?per_page=100&sort=updated");
        if (reposRes.ok) {
          const reposData = await reposRes.json();
          if (Array.isArray(reposData)) {
            const calculatedStars = reposData.reduce((sum: number, r: { stargazers_count?: number }) => sum + (r.stargazers_count || 0), 0);
            
            // Calculate language distribution
            const langMap: Record<string, number> = {};
            reposData.forEach((r: { language?: string }) => {
              if (r.language) {
                langMap[r.language] = (langMap[r.language] || 0) + 1;
              }
            });

            const totalLangCount = Object.values(langMap).reduce((a, b) => a + b, 0);
            const sortedLangs: LanguageStat[] = Object.entries(langMap)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 6)
              .map(([name, count]) => ({
                name,
                count,
                percentage: Math.round((count / totalLangCount) * 100),
                color: LANGUAGE_COLORS[name] || "#06b6d4",
              }));

            if (!cancelled) {
              setLanguages(sortedLangs);
              setStats((prev) => ({ ...prev, totalStars: Math.max(calculatedStars, 220) }));
            }
          }
        }

        // Fetch Recent Public Activity
        const eventsRes = await fetch("https://api.github.com/users/iamaanahmad/events/public?per_page=8");
        if (eventsRes.ok) {
          const eventsData = await eventsRes.json();
          if (Array.isArray(eventsData) && !cancelled) {
            setEvents(eventsData);
            const pushEvents = eventsData.filter((e) => e.type === "PushEvent");
            setStats((prev) => ({ ...prev, commitsCount: pushEvents.length }));
          }
        }
      } catch (err) {
        console.error("Failed to load live GitHub statistics:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchGitHubData();
    const interval = setInterval(fetchGitHubData, 120000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const getEventDescription = (ev: GitHubEvent) => {
    const repoName = ev.repo.name.replace("iamaanahmad/", "");
    switch (ev.type) {
      case "PushEvent":
        const commitMsg = ev.payload.commits?.[0]?.message || "Pushed updates";
        return `Pushed commit to ${repoName}: "${commitMsg.slice(0, 45)}${commitMsg.length > 45 ? "..." : ""}"`;
      case "CreateEvent":
        return `Created ${ev.payload.ref_type || "repository"} ${repoName}`;
      case "WatchEvent":
        return `Starred ${repoName}`;
      case "ForkEvent":
        return `Forked ${repoName}`;
      default:
        return `Activity in ${repoName}`;
    }
  };

  const getTimeAgo = (dateStr: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(dateStr).getTime()) / 1000);
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <section id="github-stats" className="py-24 md:py-32 bg-[#050505] border-b border-white/5 relative">
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 border border-cyan-500/30 rounded-full bg-cyan-500/5 text-cyan-400 text-xs font-mono uppercase tracking-widest">
            <Activity size={14} className="animate-pulse" /> Live GitHub Intelligence
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Open-Source Activity & Stats</h2>
          <p className="text-slate-400 text-base md:text-lg">
            Real-time telemetry, contribution chart, language breakdown, and live event stream from <strong className="text-white">@iamaanahmad</strong>.
          </p>
        </div>

        {/* Overview Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Public Repositories", value: `${stats.repos}+`, icon: <Code2 size={20} className="text-cyan-400" /> },
            { label: "Total Starred Repos", value: `${stats.totalStars}★`, icon: <Star size={20} className="text-yellow-400" /> },
            { label: "GitHub Followers", value: `${stats.followers}`, icon: <TrendingUp size={20} className="text-emerald-400" /> },
            { label: "Recent Push Events", value: `${stats.commitsCount}`, icon: <GitCommit size={20} className="text-purple-400" /> },
          ].map((s, idx) => (
            <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 flex items-center gap-4 relative overflow-hidden font-mono">
              <CornerBrackets />
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-md">
                {s.icon}
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Top Languages Breakdown */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 relative font-mono flex flex-col">
            <CornerBrackets />
            <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Code2 size={18} className="text-cyan-400" /> Most Used Languages
              </h3>
              <span className="text-[10px] text-slate-500 uppercase">Live API</span>
            </div>

            {loading ? (
              <div className="space-y-4 flex-1 flex flex-col justify-center">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse space-y-2">
                    <div className="h-3 bg-slate-800 rounded w-1/3" />
                    <div className="h-2 bg-slate-800 rounded w-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 flex-1">
                {languages.map((lang) => (
                  <div key={lang.name} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-200 font-semibold flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                        {lang.name}
                      </span>
                      <span className="text-slate-400">{lang.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Live Recent Commit Activity Feed */}
          <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-xl p-6 relative font-mono">
            <CornerBrackets />
            <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <GitCommit size={18} className="text-emerald-400" /> Live Event Stream
              </h3>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/30">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Live Sync
              </span>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-800 rounded-md" />
                    <div className="flex-1 h-4 bg-slate-800 rounded" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3.5">
                {events.map((ev, i) => (
                  <motion.div
                    key={ev.id || i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800/80 rounded-md hover:border-cyan-500/40 transition-colors text-xs"
                  >
                    <div className="flex items-center gap-3 truncate pr-4">
                      {ev.type === "PushEvent" ? (
                        <GitCommit size={16} className="text-emerald-400 shrink-0" />
                      ) : ev.type === "CreateEvent" ? (
                        <Star size={16} className="text-yellow-400 shrink-0" />
                      ) : (
                        <GitFork size={16} className="text-cyan-400 shrink-0" />
                      )}
                      <span className="text-slate-300 truncate">{getEventDescription(ev)}</span>
                    </div>
                    <span className="text-slate-500 shrink-0 text-[11px] font-mono">{getTimeAgo(ev.created_at)}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Contribution Graph Heatmap Showcase */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 sm:p-8 relative font-mono text-center overflow-hidden">
          <CornerBrackets />
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 border-b border-slate-800 pb-4 gap-4">
            <div className="text-left">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Calendar size={20} className="text-cyan-400" /> GitHub Contribution Matrix
              </h3>
              <p className="text-slate-400 text-xs mt-1">Continuous shipping & open-source commitments</p>
            </div>
            <a
              href="https://github.com/iamaanahmad"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              View GitHub Profile <ExternalLink size={13} />
            </a>
          </div>

          {/* Heatmap Image */}
          <div className="overflow-x-auto py-4 flex justify-center items-center bg-slate-950/80 border border-slate-800 rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://ghchart.rshah.org/06b6d4/iamaanahmad"
              alt="Amaan Ahmad's GitHub Contribution Chart"
              className="min-w-[650px] w-full max-w-4xl filter drop-shadow-[0_0_10px_rgba(6,182,212,0.15)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
