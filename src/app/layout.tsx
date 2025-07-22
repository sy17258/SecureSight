import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SecureSight - CCTV Monitoring Dashboard",
  description: "Professional CCTV monitoring system for real-time incident management and security surveillance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="hydrated">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
