import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import LazyOverlays from "@/components/LazyOverlays";
import { getBaseUrl } from "@/lib/site";
import { company } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const base = getBaseUrl();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Energie Access — Courtier en énergie B2B (électricité & gaz)",
    template: "%s | Energie Access",
  },
  description:
    "Courtier en énergie pour professionnels et entreprises. Étude gratuite, mise en concurrence des fournisseurs, transparence. PACA & France.",
  keywords: [
    "courtier énergie",
    "électricité entreprise",
    "gaz professionnel",
    "devis énergie",
    "PACA",
    "Marseille",
    "Les Pennes Mirabeau",
  ],
  authors: [{ name: company.name }],
  metadataBase: new URL(base),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: base,
    siteName: company.name,
    title: `${company.name} — Courtier en énergie B2B`,
    description: company.description,
    images: [
      {
        url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Énergies renouvelables",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} — Courtier en énergie`,
    description: company.description,
    images: ["https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=80"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.name,
    url: base,
    description: company.description,
    telephone: company.phoneTel.replace("tel:", ""),
    email: company.emailContact,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.street,
      addressLocality: company.city,
      postalCode: company.postalCode,
      addressCountry: company.country,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    areaServed: { "@type": "AdministrativeArea", name: "France" },
  };

  return (
    <html lang="fr" className={`${inter.variable} ${display.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-white text-text font-sans">
        <GoogleAnalytics />
        <Header />
        {children}
        <Footer />
        <MobileStickyBar />
        <div
          className="lg:hidden"
          style={{ height: "calc(5rem + env(safe-area-inset-bottom))" }}
          aria-hidden
        />
        <LazyOverlays />
      </body>
    </html>
  );
}
