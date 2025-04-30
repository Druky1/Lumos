
import type { Metadata } from "next";
import {Inter, Host_Grotesk, Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from 'next-themes'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  variable: "--font-instrument-serif",
});

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  variable: "--font-host-grotesk",
});


export const metadata: Metadata = {
  title: "Lumos",
  description: "Generate AI thumbnails for your videos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${hostGrotesk.className} ${instrumentSerif.variable} ${inter.variable} ${manrope.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
        <Toaster richColors/>
      </body>
    </html>
  );
}
