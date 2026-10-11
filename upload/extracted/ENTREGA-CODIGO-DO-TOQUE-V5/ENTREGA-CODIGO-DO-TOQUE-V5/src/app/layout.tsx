import type { Metadata } from "next";
import Script from "next/script";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-700.css";
import "@fontsource/bodoni-moda/latin-600.css";
import "@fontsource/bodoni-moda/latin-400-italic.css";
import "./globals.css";
import "./theme-v3.css";

export const metadata: Metadata = {
  title: "Código do Toque | 23 movimentos para conduzir com mais presença",
  description:
    "Conheça o guia digital Código do Toque: 23 movimentos e três bônus para explorar presença, ritmo e comunicação na intimidade a dois.",
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pixelId = /^\d+$/.test(process.env.NEXT_PUBLIC_META_PIXEL_ID || '')
    ? process.env.NEXT_PUBLIC_META_PIXEL_ID
    : null;
  const utmifyEnabled = process.env.NEXT_PUBLIC_UTMIFY_ENABLED === 'true';
  return (
    <html lang="pt-BR">
      <body>
        {pixelId && <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `}
        </Script>}
        {utmifyEnabled && <Script
          id="utmify-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){
              var s = document.createElement('script');
              s.src = 'https://cdn.utmify.com.br/scripts/utms/latest.js';
              s.async = true;
              s.defer = true;
              s.setAttribute('data-utmify-prevent-xcod-sck', '');
              s.setAttribute('data-utmify-prevent-subids', '');
              document.head.appendChild(s);
            })();`,
          }}
        />}
        {pixelId && <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>}
        {children}
      </body>
    </html>
  );
}
