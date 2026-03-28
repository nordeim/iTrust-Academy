import type { Metadata } from "next";
import { DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "iTrust Academy - Enterprise IT Training & Certification",
  description: "Professional B2B IT training and certification platform delivering expert-led, hands-on training across SolarWinds, Securden, Quest, and Ivanti platforms. Serving Asia-Pacific enterprises.",
  keywords: ["IT Training", "Certification", "SolarWinds", "Securden", "Quest", "Ivanti", "Enterprise Training", "Asia Pacific", "Professional Development"],
  authors: [{ name: "iTrust Academy" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "iTrust Academy - Enterprise IT Training & Certification",
    description: "Advance your IT career with professional training and certifications. Expert-led courses across SolarWinds, Securden, Quest, and Ivanti.",
    url: "https://itrust.academy",
    siteName: "iTrust Academy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iTrust Academy - Enterprise IT Training",
    description: "Professional IT training and certification for enterprises across Asia-Pacific",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${spaceMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
