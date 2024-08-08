import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Pelaporan Titik Sampah & Infrastruktur Nusa Penida",
  description:
    "Masuk ke akun Anda untuk melaporkan titik sampah dan masalah infrastruktur di Nusa Penida. Bersama-sama kita bisa menjaga kebersihan dan kerapihan pulau ini.",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
