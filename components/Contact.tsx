"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, Github, Twitter, Linkedin, Mail, Loader2 } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log(data);
        setIsSuccess(true);
        setIsSubmitting(false);
        reset();
        setTimeout(() => setIsSuccess(false), 3000);
    };

    return (
        <section id="contact" className="py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        Let's <span className="text-primary">Build</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Have a project in mind? Let's turn your vision into reality.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-card border border-border p-8 rounded-2xl">
                            <h3 className="text-2xl font-bold mb-6">Connect</h3>
                            <div className="space-y-6">
                                <Link href="mailto:iamaanahmad@cit.org.in" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group">
                                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                        <Mail size={24} />
                                    </div>
                                    <span className="text-lg">iamaanahmad@cit.org.in</span>
                                </Link>
                                <Link href="https://github.com/iamaanahmad" target="_blank" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group">
                                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                        <Github size={24} />
                                    </div>
                                    <span className="text-lg">@iamaanahmad</span>
                                </Link>
                                <Link href="https://x.com/i_amaanahmad" target="_blank" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group">
                                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                        <Twitter size={24} />
                                    </div>
                                    <span className="text-lg">@i_amaanahmad</span>
                                </Link>
                                <Link href="https://linkedin.com/in/iamaanshaikh" target="_blank" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group">
                                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                        <Linkedin size={24} />
                                    </div>
                                    <span className="text-lg">Amaan Ahmad</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-card border border-border p-8 rounded-2xl relative overflow-hidden">
                        {isSuccess && (
                            <div className="absolute inset-0 bg-card/90 backdrop-blur-sm z-20 flex items-center justify-center flex-col text-center p-6">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4"
                                >
                                    <Send className="text-white" size={32} />
                                </motion.div>
                                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                                <p className="text-muted-foreground">I'll get back to you as soon as possible.</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Name</label>
                                <input
                                    {...register("name")}
                                    className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                                    placeholder="John Doe"
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input
                                    {...register("email")}
                                    className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Message</label>
                                <textarea
                                    {...register("message")}
                                    rows={4}
                                    className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                                    placeholder="Tell me about your project..."
                                />
                                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin" /> Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message <Send size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
