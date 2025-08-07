import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Dinopix - AI Design Platform | Create Professional Designs in Minutes",
  description: "Transform your ideas into production-ready design assets with AI. Create logos, marketing materials, and professional designs in minutes. Join 500+ creators on our early access waitlist.",
  keywords: "AI design, artificial intelligence design, logo maker, AI graphics, design automation, marketing materials, professional designs, design platform",
  authors: [{ name: "Dinopix Pty Ltd" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://dinopix.ai/",
    title: "Dinopix - AI Design Platform | Create Professional Designs in Minutes",
    description: "Transform your ideas into production-ready design assets with AI. Create logos, marketing materials, and professional designs in minutes.",
    images: [
      {
        url: "https://dinopix.ai/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dinopix AI Design Platform",
      },
    ],
    siteName: "Dinopix",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dinopix - AI Design Platform | Create Professional Designs in Minutes",
    description: "Transform your ideas into production-ready design assets with AI. Create logos, marketing materials, and professional designs in minutes.",
    images: ["https://dinopix.ai/og-image.jpg"],
    creator: "@dinopix",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  metadataBase: new URL("https://dinopix.ai"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
