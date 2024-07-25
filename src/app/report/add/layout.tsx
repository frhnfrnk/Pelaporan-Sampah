import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Report Form",
  description: "Form untuk menginputkan lokasi",
};

export default function ReportAdd({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
