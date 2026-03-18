import Script from "next/script";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Splash Bros | Professional Window Washing in North Vancouver",
  description:
    "Reliable window washing, power washing, and gutter cleaning from a trusted local team in North Vancouver, BC.",
  keywords: [
    "window washing",
    "power washing",
    "gutter cleaning",
    "North Vancouver",
    "exterior cleaning",
  ],
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: "Splash Bros | We Make Your Windows Shine",
    description:
      "Professional window washing, power washing, and gutter cleaning in North Vancouver.",
    url: "https://splashbrothers.ca",
    siteName: "Splash Bros",
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDdYQoqR0mRgrrQ1mK9_1Vtw9Ri3qS5tTM&libraries=places"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
