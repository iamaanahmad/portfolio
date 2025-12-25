"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Terminal as TerminalIcon } from "lucide-react";

const commands = [
    { text: "npm install @antigravity/core", output: "Installing dependencies..." },
    { text: "antigravity generate --project 'DeFi Protocol'", output: "Analyzing requirements... \nGenerating architecture... \nWriting smart contracts (Rust/Anchor)..." },
    { text: "run test --suite security", output: "Running 142 tests... \nAll tests passed. Security audit score: 100/100" },
    { text: "deploy --network mainnet", output: "Deploying to Solana Mainnet... \nTransaction confirmed. \nProgram ID: 7xP...9zK" },
];

export default function Terminal() {
    const [lines, setLines] = useState<Array<{ type: 'command' | 'output', content: string }>>([]);
    const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        let timeoutId: NodeJS.Timeout;

        const processCommand = async (index: number) => {
            if (index >= commands.length) return;

            const cmd = commands[index];

            // Type command
            setLines(prev => [...prev, { type: 'command', content: cmd.text }]);

            // Wait for "processing"
            await new Promise(resolve => setTimeout(resolve, 800));

            // Show output
            setLines(prev => [...prev, { type: 'output', content: cmd.output }]);

            // Next command
            timeoutId = setTimeout(() => {
                setCurrentCommandIndex(prev => prev + 1);
            }, 1500);
        };

        processCommand(currentCommandIndex);

        return () => clearTimeout(timeoutId);
    }, [currentCommandIndex, isInView]);

    return (
        <section className="py-20 bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
            <div className="max-w-4xl mx-auto px-6 relative z-10" ref={containerRef}>
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-primary/10 rounded-lg">
                        <TerminalIcon className="text-primary" size={32} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-foreground">Live Build Session</h2>
                        <p className="text-muted-foreground">Watch me build in real-time</p>
                    </div>
                </div>

                <div className="bg-card rounded-xl border border-border shadow-2xl overflow-hidden font-mono text-sm md:text-base">
                    <div className="flex items-center px-4 py-3 bg-muted border-b border-border gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="ml-2 text-muted-foreground text-xs">amaan@portfolio:~/projects/defi-protocol</span>
                    </div>

                    <div className="p-6 min-h-[400px] overflow-y-auto custom-scrollbar bg-card text-card-foreground">
                        {lines.map((line, i) => (
                            <div key={i} className="mb-4">
                                {line.type === 'command' ? (
                                    <div className="flex gap-2 text-accent">
                                        <span className="text-primary">➜</span>
                                        <span className="text-foreground">~</span>
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            {line.content}
                                        </motion.span>
                                    </div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-muted-foreground whitespace-pre-line ml-6"
                                    >
                                        {line.content}
                                    </motion.div>
                                )}
                            </div>
                        ))}
                        <div className="flex gap-2 items-center ml-6">
                            <motion.div
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="w-2 h-4 bg-primary"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
