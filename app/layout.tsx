import type { Metadata } from "next";
import { Inter, Fraunces, Caveat } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

// Handwritten accent font (used for the footer's script word)
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kumaresan Munusamy — UX Designer",
  description:
    "UX/UI design portfolio of Kumaresan Munusamy — 17 years designing digital products across education, logistics, pharma, and fintech.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="grain min-h-full font-sans">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
