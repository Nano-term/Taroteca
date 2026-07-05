import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { AdminProvider } from "@/components/AdminProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Taroteca · Biblioteca y comunidad de tarot",
    template: "%s · Taroteca",
  },
  description:
    "Taroteca es una biblioteca abierta de tarot: las 78 cartas del mazo, tiradas diarias e interpretaciones de la comunidad.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" data-bs-theme="dark">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        <AdminProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AdminProvider>
      </body>
    </html>
  );
}
