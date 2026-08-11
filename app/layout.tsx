import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://amaanahmad.dev"),
  title: "Amaan Ahmad | AI, Solana, Developer Tooling & Multilingual Specialist",
  description:
    "Portfolio of Amaan Ahmad — Founder @ CIT India, open-source builder (kiro-pro-free, everything-kiro), published Amazon author, AI/Web3 engineer, and Multilingual AI & Translation Specialist.",
  keywords: [
    "Amaan Ahmad", "AI Engineer", "Developer Tooling", "Codex", "AI Agents",
    "Solana", "Next.js", "React", "TypeScript", "Rust", "MCP", "CIT India", "Portfolio",
    "Data Annotation", "AI Training", "Transliteration", "Subtitling", "Language Translation",
    "Hindi Translation", "Urdu Translation", "Arabic Translation", "Amazon Author"
  ],
  authors: [{ name: "Amaan Ahmad", url: "https://github.com/iamaanahmad" }],
  creator: "Amaan Ahmad",
  openGraph: {
    title: "Amaan Ahmad | AI, Solana, Tooling & Multilingual Specialist",
    description: "Founder @ CIT India. Building AI agents, Solana protocols, developer tooling, and providing AI Translation & Annotation services.",
    url: "https://amaanahmad.dev",
    siteName: "Amaan Ahmad",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amaan Ahmad | AI, Solana, Tooling & Multilingual Specialist",
    description: "Founder @ CIT India. Building AI agents, Solana protocols, developer tooling, and providing AI Translation & Annotation services.",
    creator: "@i_amaanahmad",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Amaan Ahmad",
    url: "https://amaanahmad.dev",
    sameAs: [
      "https://github.com/iamaanahmad",
      "https://www.linkedin.com/in/iamaanshaikh",
      "https://x.com/i_amaanahmad",
      "https://www.amazon.com/author/amaan"
    ],
    jobTitle: "Founder & Lead Engineer @ CIT India",
    worksFor: {
      "@type": "Organization",
      name: "CIT India",
      url: "https://www.cit.org.in/"
    },
    knowsAbout: [
      "Artificial Intelligence", "Solana", "Web3", "Next.js", "TypeScript", "TLA+",
      "Data Annotation", "AI Training", "Transliteration", "Language Translation"
    ]
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#050505] text-slate-200`}>
        {children}
      </body>
    </html>
  );
}

