import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import Hero from "@/components/layout/Hero";
import Footer from "@/components/layout/Footer";

import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "World Data",
  description: "Mixed APIs data from all over the World in one place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <main className="max-w-7xl mx-auto bg-[#0F1117]">
          <Hero />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
