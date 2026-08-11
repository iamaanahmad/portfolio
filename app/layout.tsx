import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://amaan.cit.org.in"),
  title: "Amaan Ahmad | Full-Stack Web/App Developer & AI/Web3 Engineer",
  description:
    "Portfolio of Amaan Ahmad — Founder @ CIT India, Full-Stack Web & App Developer helping businesses scale with custom web & mobile applications, AI agents, Solana protocols, and digital solutions.",
  keywords: [
    "Amaan Ahmad", "Web Developer", "App Developer", "Full Stack Developer", "Business Growth",
    "AI Engineer", "Developer Tooling", "Solana", "Next.js", "React", "TypeScript", "Rust", "CIT India",
    "Data Annotation", "AI Training", "Transliteration", "Subtitling", "Language Translation", "Amazon Author"
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
    title: "Amaan Ahmad | Full-Stack Web/App Developer & AI/Web3 Engineer",
    description: "Founder @ CIT India. Helping businesses scale with custom Web & Mobile Applications, AI tools, Solana protocols, and digital growth solutions.",
    url: "https://amaan.cit.org.in",
    siteName: "Amaan Ahmad Portfolio",
    type: "profile",
    images: [
      {
        url: "/amaan-photo.jpg",
        width: 800,
        height: 800,
        alt: "Amaan Ahmad - Full-Stack Web/App Developer & Founder @ CIT India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amaan Ahmad | Full-Stack Web/App Developer & AI/Web3 Engineer",
    description: "Founder @ CIT India. Helping businesses scale with custom Web & Mobile Applications, AI tools, Solana protocols, and digital growth solutions.",
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
        jobTitle: "Founder & Full-Stack Web/App Developer",
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

