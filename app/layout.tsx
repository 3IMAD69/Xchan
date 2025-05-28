import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";
import type React from "react";
import "react-photo-view/dist/react-photo-view.css";
import PlausibleProvider from 'next-plausible';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "4chan with Twitter UI",
  description: "A 4chan-like interface with Twitter UI and nested replies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <PlausibleProvider domain="https://x-chan.org" customDomain="https://plausible.x-chan.org" taggedEvents={true} selfHosted={true} trackOutboundLinks={true} trackFileDownloads={true}>
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
