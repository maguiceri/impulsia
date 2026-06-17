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
  },
  twitter: {
    card: "summary_large_image",
    title: "Impulsia — Automatización & IA para pymes",
    description: "Automatizamos las tareas repetitivas de tu negocio con IA y sistemas a medida. Recuperá horas cada semana.",
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
      description: "Automatización con IA y sistemas a medida para pymes argentinas. Asesoría, implementación y soporte continuo.",
      areaServed: "Argentina",
      knowsAbout: [
        "Automatización de procesos con inteligencia artificial",
        "Business Process Automation",
        "n8n",
        "Zapier",
        "Desarrollo de software a medida para pymes",
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
          name: "¿Qué es Impulsia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Impulsia es una agencia especializada en automatización con inteligencia artificial y sistemas a medida para pymes argentinas. Diseñamos flujos de trabajo automatizados que eliminan tareas repetitivas, integrando herramientas como n8n, Zapier y modelos de IA para que tu negocio opere con mayor eficiencia.",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué tipo de tareas se pueden automatizar con Impulsia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Se pueden automatizar tareas como la generación de presupuestos, carga de pedidos, envío de notificaciones, reportes automáticos, gestión de clientes, seguimiento de pagos, integración entre plataformas (Rappi, PedidosYa, sistemas POS), y cualquier proceso que se repita manualmente con regularidad.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuántas horas por semana se pueden ahorrar con automatización?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Según los casos reales implementados por Impulsia, los clientes ahorran entre 12 y 20 horas semanales. Por ejemplo, una diseñadora gráfica redujo el tiempo de presupuestación en un 94% y una nutricionista pasó a gestionar todos sus pacientes desde un panel centralizado con el 100% del flujo automatizado.",
          },
        },
        {
          "@type": "Question",
          name: "¿Con qué herramientas trabaja Impulsia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Impulsia trabaja con n8n, Zapier, modelos de inteligencia artificial y desarrolla software a medida para cada proceso. Se integra con plataformas existentes como sistemas POS, hojas de cálculo, aplicaciones de delivery y CRMs.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuánto tiempo lleva implementar una automatización?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El proceso de Impulsia tiene 4 etapas: diagnóstico inicial, propuesta con presupuesto claro, implementación con entregas parciales y soporte continuo. Los tiempos varían según la complejidad, pero se entregan avances progresivos desde las primeras semanas.",
          },
        },
        {
          "@type": "Question",
          name: "¿Necesito conocimientos técnicos para usar los sistemas de Impulsia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Los sistemas se diseñan para que el usuario final no necesite conocimientos técnicos. Todo se implementa con foco en la facilidad de uso del equipo del cliente, sin tecnicismos.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo es el diagnóstico gratuito de Impulsia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El diagnóstico es una reunión de 30 minutos sin compromiso donde se analiza el proceso del negocio, se identifican las tareas que más tiempo consumen y se evalúa qué conviene automatizar. Al finalizar, el cliente recibe una propuesta clara con qué se puede hacer, en cuánto tiempo y a qué costo.",
          },
        },
        {
          "@type": "Question",
          name: "¿Ofrecen soporte después de la implementación?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí. Impulsia incluye soporte y mantenimiento post-implementación: monitoreo de los sistemas, ajustes según cambios en el negocio y acompañamiento continuo para que todo siga funcionando correctamente.",
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
      areaServed: "Argentina",
      serviceType: "Consultoría en automatización de procesos",
    },
    {
      "@type": "Service",
      "@id": `${BASE_URL}/#service-automatizacion`,
      name: "Automatización con IA",
      description: "Bots y flujos con n8n, Zapier y modelos de IA que trabajan mientras vos hacés otra cosa.",
      provider: { "@id": `${BASE_URL}/#organization` },
      areaServed: "Argentina",
      serviceType: "Automatización con inteligencia artificial",
    },
    {
      "@type": "Service",
      "@id": `${BASE_URL}/#service-sistemas`,
      name: "Sistemas a Medida",
      description: "Software hecho para tu proceso, no al revés. Cada detalle pensado para la forma en que trabajás.",
      provider: { "@id": `${BASE_URL}/#organization` },
      areaServed: "Argentina",
      serviceType: "Desarrollo de software a medida",
    },
    {
      "@type": "Service",
      "@id": `${BASE_URL}/#service-soporte`,
      name: "Soporte & Mantenimiento",
      description: "Acompañamiento continuo para que todo siga funcionando. Respondemos rápido cuando algo no anda.",
      provider: { "@id": `${BASE_URL}/#organization` },
      areaServed: "Argentina",
      serviceType: "Soporte técnico y mantenimiento de sistemas",
    },
  ],
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
