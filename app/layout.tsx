import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import PlausibleProvider from "next-plausible";
import { Geist_Mono } from "next/font/google";
import type React from "react";
import "react-photo-view/dist/react-photo-view.css";

const mono = Geist_Mono({ subsets: ["latin"] });

export const metadata = {
  title: "Xchan",
  description: "A 4chan-like interface with X UI and nested replies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={mono.className}>
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
