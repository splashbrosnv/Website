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
      </body>
    </html>
  );
}
