"use client";
// import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthContext, AuthProvider } from "@/lib/context/auth.context";
import { Loading } from "../../components/ui/Loading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Reto factus (Halltec)",
//   description: "Connected a of api the factus ",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Reto factus (Halltec)</title>
        <meta name="description" content="Connected a of api the factus" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <AuthContext.Consumer>
            {(auth) => (!auth.isInitialized ? <Loading /> : children)}
          </AuthContext.Consumer>
        </AuthProvider>
      </body>
    </html>
  );
}
