import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LeadWidget from "@/components/LeadWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Guidevera - Your Career Guide",
  description: "Guidevera is a comprehensive platform built to provide students with end-to-end support throughout their academic journey.",
  icons: {
    icon: '/guidevera-icon.png',
    shortcut: '/guidevera-icon.png',
    apple: '/guidevera-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/guidevera-icon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <LeadWidget />
      </body>
    </html>
  );
}
