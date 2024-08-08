// metadata.ts
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Pelaporan Titik Sampah & Infrastruktur Nusa Penida - Bersih dan Teratur",
  description:
    "Laporkan titik sampah dan masalah infrastruktur di Nusa Penida dengan mudah. Bantu jaga kebersihan dan kerapihan pulau kita bersama. Aplikasi pelaporan cepat dan responsif untuk lingkungan yang lebih baik.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    {
      name: "imvinojanv",
      url: "https://www.linkedin.com/in/imvinojanv/",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};
