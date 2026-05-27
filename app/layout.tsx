import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://som-meta-ads-expert.vercel.app"),
  title: {
    default: "Free Digital Marketing Consultation | SOM Meta Ads Expert",
    template: "%s | SOM Meta Ads Expert"
  },
  description:
    "Book a free 1:1 digital marketing consultation call and get a customized plan to grow your business.",
  openGraph: {
    title: "Struggling to grow your business?",
    description:
      "Grab a free 1:1 digital marketing consultation call and get a customized plan you can implement after the call.",
    url: "/",
    siteName: "SOM Digital",
    images: [
      {
        url: "/logo.png",
        width: 2000,
        height: 2000,
        alt: "SOM Digital"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Struggling to grow your business?",
    description:
      "Book a free 1:1 digital marketing consultation call and get a clear growth plan.",
    images: ["/logo.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1931352430886259');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1931352430886259&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
