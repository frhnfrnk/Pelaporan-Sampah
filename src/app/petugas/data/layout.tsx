import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Report Data",
  description: "Data laporan yang telah dibuat",
};

export default function ReportHistory({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
