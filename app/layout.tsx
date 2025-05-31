import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import PlausibleProvider from "next-plausible";
import { Geist, Roboto_Mono } from "next/font/google";
import type React from "react";
import "react-photo-view/dist/react-photo-view.css";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const metadata = {
  title: "Xchan",
  description: "A 4chan-like interface with X UI and nested replies",
  openGraph: {
    title: "Xchan",
    description: "A 4chan-like interface with X UI and nested replies",
    images: [
      {
        url: "/Xchan-op.png",
        width: 1200,
        height: 630,
        alt: "Xchan logo",
      },
    ],
    type: "website",
    siteName: "Xchan",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xchan",
    description: "A 4chan-like interface with X UI and nested replies",
    images: ["/Xchan-op.png"],
    creator: "@yourusername", // Replace with your Twitter handle if you have one
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${roboto_mono.variable} antialiased`}>
        <PlausibleProvider
          domain="x-chan.org"
          customDomain="https://plausible.x-chan.org"
          taggedEvents={true}
          // selfHosted={true}
          trackOutboundLinks={true}
          trackFileDownloads={true}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </PlausibleProvider>
      </body>
    </html>
  );
}
