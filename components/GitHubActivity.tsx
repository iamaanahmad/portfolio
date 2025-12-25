"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, GitCommit, Star, GitFork, TrendingUp } from "lucide-react";

interface GitHubActivity {
    type: string;
    repo: { name: string };
    created_at: string;
    payload: any;
}

interface ContributionDay {
    date: string;
    count: number;
    level: number;
}

export default function GitHubActivity() {
    const [activities, setActivities] = useState<GitHubActivity[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalCommits: 0,
        totalStars: 0,
        totalForks: 0,
        activeRepos: 0
    });

    useEffect(() => {
        async function fetchActivity() {
            try {
                const response = await fetch('https://api.github.com/users/iamaanahmad/events/public?per_page=10');
                const data = await response.json();
                setActivities(data);

                // Calculate stats from activities
                const commits = data.filter((a: GitHubActivity) => a.type === 'PushEvent').length;
                const uniqueRepos = new Set(data.map((a: GitHubActivity) => a.repo.name)).size;

                setStats({
                    totalCommits: commits,
                    totalStars: 12, // From your GitHub
                    totalForks: 5,
                    activeRepos: uniqueRepos
                });
            } catch (error) {
                console.error('Failed to fetch GitHub activity:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchActivity();
        const interval = setInterval(fetchActivity, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'PushEvent': return <GitCommit className="text-green-500" size={16} />;
            case 'CreateEvent': return <Star className="text-yellow-500" size={16} />;
            case 'ForkEvent': return <GitFork className="text-blue-500" size={16} />;
            default: return <TrendingUp className="text-purple-500" size={16} />;
        }
    };

    const getActivityDescription = (activity: GitHubActivity) => {
        const repo = activity.repo.name.split('/')[1];
        switch (activity.type) {
            case 'PushEvent':
                const commits = activity.payload.commits?.length || 1;
                return `Pushed ${commits} commit${commits > 1 ? 's' : ''} to ${repo}`;
            case 'CreateEvent':
                return `Created ${activity.payload.ref_type} in ${repo}`;
            case 'ForkEvent':
                return `Forked ${repo}`;
            case 'WatchEvent':
                return `Starred ${repo}`;
            default:
                return `Activity in ${repo}`;
        }
    };

    const getTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (seconds < 60) return 'just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        return `${Math.floor(seconds / 86400)}d ago`;
    };

    return (
        <section className="py-20 bg-muted/30">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">
                        Live <span className="text-primary">Activity</span>
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        Real-time updates from my GitHub
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: "Recent Commits", value: stats.totalCommits, icon: GitCommit, color: "text-green-500" },
                        { label: "Total Stars", value: stats.totalStars, icon: Star, color: "text-yellow-500" },
                        { label: "Total Forks", value: stats.totalForks, icon: GitFork, color: "text-blue-500" },
                        { label: "Active Repos", value: stats.activeRepos, icon: TrendingUp, color: "text-purple-500" },
                    ].map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors"
                            >
                                <Icon className={`${stat.color} mx-auto mb-2`} size={32} />
                                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Activity Feed */}
                <div className="bg-card border border-border rounded-2xl p-8">
                    <div className="flex items-center gap-2 mb-6">
                        <Calendar className="text-primary" size={24} />
                        <h3 className="text-2xl font-bold">Recent Activity</h3>
                        <div className="ml-auto">
                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-sm">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                Live
                            </span>
                        </div>
                    </div>

                    {loading ? (
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="animate-pulse flex gap-4">
                                    <div className="w-8 h-8 bg-muted rounded-full"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-muted rounded w-3/4"></div>
                                        <div className="h-3 bg-muted rounded w-1/4"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {activities.slice(0, 10).map((activity, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <div className="mt-1">
                                        {getActivityIcon(activity.type)}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-foreground font-medium">
                                            {getActivityDescription(activity)}
                                        </p>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {getTimeAgo(activity.created_at)}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Contribution Graph Placeholder */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 bg-card border border-border rounded-2xl p-8"
                >
                    <h3 className="text-2xl font-bold mb-6">Contribution Activity</h3>
                    <div className="flex items-center justify-center h-32 bg-muted/30 rounded-lg">
                        <p className="text-muted-foreground">
                            Building at 10x speed • Shipping daily • Never stop learning
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
