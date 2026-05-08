import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://som-meta-ads-expert.vercel.app"),
  title: {
    default: "Free Digital Marketing Consultation | SOM Meta Ads Expert",
    template: "%s | SOM Meta Ads Expert"
  },
  description:
    "Book a free 1:1 call and get a simple marketing plan for your business.",
  openGraph: {
    title: "Get a Simple Marketing Plan for Your Business",
    description:
      "Book a free call and learn what to do next to get more inquiries, leads, and sales.",
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
    title: "Get a Simple Marketing Plan for Your Business",
    description:
      "Book a free 1:1 call and get clear next steps for your marketing.",
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
