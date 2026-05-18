import type { Metadata } from "next";
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
      <body>{children}</body>
    </html>
  );
}
