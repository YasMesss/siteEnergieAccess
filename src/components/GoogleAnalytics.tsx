"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { captureTrackingParams } from "@/lib/tracking";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function GoogleAnalytics() {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    captureTrackingParams();

    const stored = localStorage.getItem("cookie-consent");
    if (stored === "accepted") setConsent(true);

    const handler = () => {
      const updated = localStorage.getItem("cookie-consent");
      if (updated === "accepted") setConsent(true);
    };
    window.addEventListener("cookie-consent-update", handler);
    return () => window.removeEventListener("cookie-consent-update", handler);
  }, []);

  useEffect(() => {
    if (!consent) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href^='tel:']");
      if (anchor) {
        const w = window as unknown as { gtag?: (...args: unknown[]) => void };
        if (w.gtag) {
          w.gtag("event", "click_to_call", {
            event_category: "engagement",
            event_label: anchor.getAttribute("href"),
          });
        }
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [consent]);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document -- consent mode doit précéder gtag */}
      <Script id="consent-defaults" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500,
          });
        `}
      </Script>

      {consent && GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'update', {
                analytics_storage: 'granted',
                ad_storage: 'granted',
                ad_user_data: 'granted',
                ad_personalization: 'granted',
              });
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                anonymize_ip: true,
              });
            `}
          </Script>
        </>
      )}

      {consent && GTM_ID && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      )}
    </>
  );
}
