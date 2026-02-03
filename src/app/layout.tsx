import type { Metadata } from "next";
import { Nunito, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-nunito",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "LJ Esports Management – Elevating Gaming Talent",
  description:
    "LJ Esports Management elevates gaming talent and builds winning brands. Turn your esports potential into success with us.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <Header />

        <main className="min-h-screen pt-16 lg:pt-20">
          {children}
          </main>

        <Footer />
      </body>
    </html>
  );
}
