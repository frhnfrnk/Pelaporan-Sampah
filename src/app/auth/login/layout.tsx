import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Deepublish",
  description: "Login to Deepublish to read your favorite books.",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
