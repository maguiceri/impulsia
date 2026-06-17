import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackgroundOrbs from "./components/BackgroundOrbs";
import ScrollToTop from "./components/ScrollToTop";

const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], weight: ["300","400","500","600","700"] });
const geistMono    = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const orbitron     = Orbitron({ variable: "--font-orbitron", subsets: ["latin"], weight: ["400", "700"] });

const BASE_URL = "https://impulsia.studio";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Impulsia — Automatización & IA para pymes",
  description: "Automatizamos las tareas repetitivas de tu negocio con IA y sistemas a medida. Recuperá horas cada semana. Diagnóstico gratuito sin compromiso.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "Impulsia — Automatización & IA para pymes",
    description: "Automatizamos las tareas repetitivas de tu negocio con IA y sistemas a medida. Recuperá horas cada semana. Diagnóstico gratuito sin compromiso.",
    siteName: "Impulsia",
    locale: "es_AR",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Impulsia — Automatización e IA para tu negocio",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Impulsia — Automatización & IA para pymes",
    description: "Automatizamos las tareas repetitivas de tu negocio con IA y sistemas a medida. Recuperá horas cada semana.",
    images: ["/logo.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Impulsia",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description: "Automatización con IA y sistemas a medida para pymes. Asesoría, implementación y soporte.",
  sameAs: ["https://www.instagram.com/impulsia.studio"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "Spanish",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${geistMono.variable} ${orbitron.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollToTop />
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
