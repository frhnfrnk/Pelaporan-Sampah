import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Report History",
  description: "Riwayat laporan yang telah dibuat",
};

export default function ReportHistory({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
