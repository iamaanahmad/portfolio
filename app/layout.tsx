import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://amaanahmad.dev"),
  title: "Amaan Ahmad | AI-Native Full-Stack Engineer",
  description: "Portfolio of Amaan Ahmad - Building million-dollar projects with AI, Web3, and Next.js.",
  keywords: ["Full Stack Developer", "Web3", "AI Engineer", "Solana", "Next.js", "React", "Portfolio"],
  authors: [{ name: "Amaan Ahmad" }],
  openGraph: {
    title: "Amaan Ahmad | AI-Native Full-Stack Engineer",
    description: "Building the future with AI & Web3.",
    type: "website",
    images: ["/og-image.png"],
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
