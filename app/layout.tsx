import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://amaanahmad.dev"),
  title: "Amaan Ahmad | Full-Stack & AI / Web3 Engineer",
  description:
    "Portfolio of Amaan Ahmad — Founder @ CIT India. Building production-grade products across AI, Web3 (Solana), and the web. 70+ open-source repositories.",
  keywords: [
    "Amaan Ahmad", "Full Stack Developer", "Web3 Developer", "AI Engineer",
    "Solana", "Next.js", "React", "TypeScript", "Rust", "CIT India", "Portfolio",
  ],
  authors: [{ name: "Amaan Ahmad", url: "https://github.com/iamaanahmad" }],
  creator: "Amaan Ahmad",
  openGraph: {
    title: "Amaan Ahmad | Full-Stack & AI / Web3 Engineer",
    description: "Founder @ CIT India. Building the future with AI, Web3 & the web.",
    url: "https://amaanahmad.dev",
    siteName: "Amaan Ahmad",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amaan Ahmad | Full-Stack & AI / Web3 Engineer",
    description: "Founder @ CIT India. Building the future with AI, Web3 & the web.",
    creator: "@i_amaanahmad",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
