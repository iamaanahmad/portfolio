"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Twitter, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
    { name: "About", href: "#about" },
    { name: "Tech", href: "#tech" },
    { name: "Projects", href: "#projects" },
    { name: "Stats", href: "#stats" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
                    isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border py-3" : "bg-transparent"
                )}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold tracking-tighter group">
                        <span className="text-primary group-hover:text-accent transition-colors">AMAAN</span>
                        <span className="text-foreground">.DEV</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <div className="flex space-x-3">
                            <Link href="https://github.com/iamaanahmad" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Github size={20} />
                            </Link>
                            <Link href="https://x.com/i_amaanahmad" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Twitter size={20} />
                            </Link>
                            <Link href="https://linkedin.com/in/iamaanshaikh" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Linkedin size={20} />
                            </Link>
                        </div>
                        <ThemeToggle />
                        <button className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105">
                            Connect Wallet
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-4 md:hidden">
                        <ThemeToggle />
                        <button
                            className="text-foreground"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg pt-24 px-6 md:hidden"
                    >
                        <div className="flex flex-col space-y-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="flex space-x-6 pt-6 border-t border-border">
                                <Link href="https://github.com/iamaanahmad" target="_blank" className="text-muted-foreground hover:text-foreground">
                                    <Github size={24} />
                                </Link>
                                <Link href="https://x.com/i_amaanahmad" target="_blank" className="text-muted-foreground hover:text-foreground">
                                    <Twitter size={24} />
                                </Link>
                                <Link href="https://linkedin.com/in/iamaanshaikh" target="_blank" className="text-muted-foreground hover:text-foreground">
                                    <Linkedin size={24} />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
