import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://amaan.cit.org.in"),
  title: "Amaan Ahmad | AI, Solana, Developer Tooling & Multilingual Specialist",
  description:
    "Portfolio of Amaan Ahmad — Founder @ CIT India, open-source builder (kiro-pro-free, everything-kiro), published Amazon author, KnowledgeSense content writer, AI/Web3 engineer, and Multilingual AI & Translation Specialist.",
  keywords: [
    "Amaan Ahmad", "AI Engineer", "Developer Tooling", "Codex", "AI Agents",
    "Solana", "Next.js", "React", "TypeScript", "Rust", "MCP", "CIT India", "Portfolio",
    "Data Annotation", "AI Training", "Transliteration", "Subtitling", "Language Translation",
    "Hindi Translation", "Urdu Translation", "Arabic Translation", "Amazon Author", "KnowledgeSense"
  ],
  authors: [{ name: "Amaan Ahmad", url: "https://github.com/iamaanahmad" }],
  creator: "Amaan Ahmad",
  publisher: "CIT India",
  icons: {
    icon: "/amaan-photo.jpg",
    shortcut: "/amaan-photo.jpg",
    apple: "/amaan-photo.jpg",
  },
  alternates: {
    canonical: "https://amaan.cit.org.in",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Amaan Ahmad | AI, Solana, Tooling & Multilingual Specialist",
    description: "Founder @ CIT India. Building AI agents, Solana protocols, developer tooling, published author, and providing AI Translation & Annotation services.",
    url: "https://amaan.cit.org.in",
    siteName: "Amaan Ahmad Portfolio",
    type: "profile",
    images: [
      {
        url: "/amaan-photo.jpg",
        width: 800,
        height: 800,
        alt: "Amaan Ahmad - Founder @ CIT India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amaan Ahmad | AI, Solana, Tooling & Multilingual Specialist",
    description: "Founder @ CIT India. Building AI agents, Solana protocols, developer tooling, and providing AI Translation & Annotation services.",
    creator: "@i_amaanahmad",
    images: ["/amaan-photo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://amaan.cit.org.in/#person",
        name: "Amaan Ahmad",
        url: "https://amaan.cit.org.in",
        image: "https://amaan.cit.org.in/amaan-photo.jpg",
        sameAs: [
          "https://github.com/iamaanahmad",
          "https://www.linkedin.com/in/iamaanshaikh",
          "https://x.com/i_amaanahmad",
          "https://www.amazon.com/author/amaan",
          "https://www.knowledgesense.in/author/administer/"
        ],
        jobTitle: "Founder & Lead Engineer",
        worksFor: {
          "@type": "Organization",
          name: "CIT India",
          url: "https://www.cit.org.in/"
        },
        knowsAbout: [
          "Artificial Intelligence", "Solana", "Web3", "Next.js", "TypeScript", "Rust", "TLA+",
          "Data Annotation", "AI Model Training", "Transliteration", "Subtitling", "Language Translation"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://amaan.cit.org.in/#website",
        url: "https://amaan.cit.org.in",
        name: "Amaan Ahmad Portfolio",
        description: "Official portfolio of Amaan Ahmad - AI, Solana & Developer Tooling Engineer",
        publisher: {
          "@id": "https://amaan.cit.org.in/#person"
        }
      }
    ]
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/jpeg" href="/amaan-photo.jpg" />
        <link rel="shortcut icon" href="/amaan-photo.jpg" />
        <link rel="apple-touch-icon" href="/amaan-photo.jpg" />
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

