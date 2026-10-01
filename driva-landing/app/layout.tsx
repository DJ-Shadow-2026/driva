import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import Script from "next/script";
import { AnalyticsProvider } from "@/components/analytics-provider";
import { copy } from "@/content/copy";
import { metaEnabled, metaPixelId } from "@/lib/analytics-config";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || copy.brand.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: copy.meta.title,
  description: copy.meta.description,
  applicationName: copy.brand.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: copy.brand.name,
    title: copy.meta.title,
    description: copy.meta.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: copy.meta.title,
    description: copy.meta.description,
  },
};

export const viewport: Viewport = {
  themeColor: copy.meta.themeColor,
  colorScheme: "dark",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: copy.brand.name,
  url: copy.brand.url,
  logo: `${copy.brand.url}/brand/driva-logo-lockup.png`,
  email: copy.brand.email,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>
        <AnalyticsProvider>{children}</AnalyticsProvider>
        <script
          type="application/ld+json"
          // Static, trusted content.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {metaEnabled && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
          </Script>
        )}
      </body>
    </html>
  );
}
