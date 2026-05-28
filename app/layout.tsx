import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackgroundOrbs from "./components/BackgroundOrbs";

const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], weight: ["300","400","500","600","700"] });
const geistMono    = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const orbitron     = Orbitron({ variable: "--font-orbitron", subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Impulsia — Automatización & IA para tu negocio",
  description: "Asesoría en automatización, inteligencia artificial y desarrollo web. Sistemas que realmente escalan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${geistMono.variable} ${orbitron.variable}`}>
      <body>
        <BackgroundOrbs />
        <Navbar />
        <main style={{ paddingTop: '64px', position: 'relative', zIndex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
