
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "../index.css";
import Sidebar from "@/components/Sidebar";
import Providers from "@/components/providers";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WebSocket WebRTC",
  description: "WebSocket WebRTC Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Providers>
  <div className="flex h-screen w-full overflow-hidden">
    <Sidebar />
    <main className="flex-1 min-w-0 overflow-y-auto">
      {children}
    </main>
  </div>
</Providers>
      </body>
    </html>
  );
}
