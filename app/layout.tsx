import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NeuralCanvas from "./components/NeuralCanvas";
import ScrollToTop from "./components/ScrollToTop";

const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], weight: ["300","400","500","600","700"] });
const geistMono    = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const orbitron     = Orbitron({ variable: "--font-orbitron", subsets: ["latin"], weight: ["400", "700"] });

const BASE_URL = "https://impulsia.studio";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Impulsia — Software a medida para negocios en crecimiento",
  description: "Impulsia diseña y desarrolla sistemas a medida, automatizaciones con IA y herramientas propias para negocios en crecimiento. Diagnóstico gratuito, sin compromiso.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "Impulsia — Software a medida para negocios en crecimiento",
    description: "Impulsia diseña y desarrolla sistemas a medida, automatizaciones con IA y herramientas propias para negocios en crecimiento. Diagnóstico gratuito, sin compromiso.",
    siteName: "Impulsia",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Impulsia — Software a medida para negocios en crecimiento",
    description: "Impulsia diseña y desarrolla sistemas a medida, automatizaciones con IA y herramientas propias para negocios en crecimiento.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Impulsia",
      url: BASE_URL,
      logo: `${BASE_URL}/logo.png`,
      description: "Impulsia es un estudio de software con base en Argentina que diseña y desarrolla sistemas a medida, automatizaciones con IA y herramientas propias para negocios en crecimiento, trabajando también de forma remota con clientes de otros países.",
      areaServed: ["Argentina", "Worldwide"],
      knowsAbout: [
        "Desarrollo de software a medida",
        "Automatización de procesos con inteligencia artificial",
        "Business Process Automation",
        "n8n",
        "Zapier",
        "Sistemas de gestión para pymes",
      ],
      sameAs: ["https://www.instagram.com/impulsia.studio"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: "Spanish",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Impulsia",
      publisher: { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${BASE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Qué tipo de sistemas desarrolla Impulsia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Impulsia desarrolla cotizadores interactivos, paneles de gestión, automatizaciones con n8n y Zapier, integraciones entre plataformas (delivery, POS, CRM), sistemas de seguimiento de clientes o pacientes, y flujos de trabajo con inteligencia artificial.",
          },
        },
        {
          "@type": "Question",
          name: "¿Para qué tipo de negocios trabaja Impulsia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Impulsia trabaja con pequeñas y medianas empresas, profesionales independientes y negocios en crecimiento: diseñadores, profesionales de la salud, comercios, servicios y cualquier negocio que necesite herramientas propias adaptadas a su proceso.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo es el proceso de trabajo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El proceso tiene cuatro etapas: diagnóstico gratuito de 30 minutos, propuesta con presupuesto claro y sin letra chica, implementación con entregas parciales para que el cliente vea el avance, y soporte post-lanzamiento.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuánto tarda un proyecto?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Depende del alcance. En el diagnóstico inicial se define el plazo concreto. Los proyectos se entregan por etapas para que el cliente vea resultados desde las primeras semanas.",
          },
        },
        {
          "@type": "Question",
          name: "¿Necesito saber programación para usar los sistemas?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Los sistemas se diseñan para que cualquier persona del equipo los use sin conocimientos técnicos, con foco en la facilidad de uso desde el primer día.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo puedo contactar a Impulsia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A través del formulario en impulsia.studio o por Instagram: @impulsia.studio.",
          },
        },
      ],
    },
    {
      "@type": "Service",
      "@id": `${BASE_URL}/#service-asesoria`,
      name: "Asesoría & Consultoría en Automatización",
      description: "Detectamos qué conviene automatizar y trazamos el plan. Sin tecnicismos, con foco en resultados.",
      provider: { "@id": `${BASE_URL}/#organization` },
      areaServed: ["Argentina", "Worldwide"],
      serviceType: "Consultoría en automatización de procesos",
    },
    {
      "@type": "Service",
      "@id": `${BASE_URL}/#service-automatizacion`,
      name: "Automatización con IA",
      description: "Bots y flujos con n8n, Zapier y modelos de IA que trabajan mientras vos hacés otra cosa.",
      provider: { "@id": `${BASE_URL}/#organization` },
      areaServed: ["Argentina", "Worldwide"],
      serviceType: "Automatización con inteligencia artificial",
    },
    {
      "@type": "Service",
      "@id": `${BASE_URL}/#service-sistemas`,
      name: "Sistemas a Medida",
      description: "Software hecho para tu proceso, no al revés. Cada detalle pensado para la forma en que trabajás.",
      provider: { "@id": `${BASE_URL}/#organization` },
      areaServed: ["Argentina", "Worldwide"],
      serviceType: "Desarrollo de software a medida",
    },
    {
      "@type": "Service",
      "@id": `${BASE_URL}/#service-soporte`,
      name: "Soporte & Mantenimiento",
      description: "Acompañamiento continuo para que todo siga funcionando. Respondemos rápido cuando algo no anda.",
      provider: { "@id": `${BASE_URL}/#organization` },
      areaServed: ["Argentina", "Worldwide"],
      serviceType: "Soporte técnico y mantenimiento de sistemas",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${geistMono.variable} ${orbitron.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollToTop />
        <NeuralCanvas />
        <Navbar />
        <main style={{ paddingTop: '64px', position: 'relative', zIndex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
