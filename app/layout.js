import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: "ASTRA — Digital Motion Experience",
  description: "An interactive scroll-driven digital experience built with React, GSAP and modern web technologies.",
  keywords: ["ASTRA", "digital experience", "scroll animation", "GSAP", "React", "Next.js"],
  authors: [{ name: "ASTRA Digital" }],
  openGraph: {
    title: "ASTRA — Digital Motion Experience",
    description: "An interactive scroll-driven digital experience. Motion that responds to you.",
    type: "website",
    locale: "en_US",
    siteName: "ASTRA",
  },
  twitter: {
    card: "summary_large_image",
    title: "ASTRA — Digital Motion Experience",
    description: "An interactive scroll-driven digital experience. Motion that responds to you.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050508",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
