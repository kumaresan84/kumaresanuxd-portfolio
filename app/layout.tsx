import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { themeInitScript } from "@/components/ThemeToggle";
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

export const metadata: Metadata = {
  title: "Kumaresan Munusamy — UX Designer",
  description:
    "UX/UI design portfolio of Kumaresan Munusamy — 16+ years designing digital products across education, logistics, pharma, and fintech.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="grain min-h-full font-sans">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
