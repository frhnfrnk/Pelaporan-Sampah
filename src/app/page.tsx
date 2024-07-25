import Hero from "@/components/LandingPage/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nusa Penida Report Center",
  description: "Form untuk menginputkan lokasi",
};

export default function Home() {
  return (
    <main className="bg-[#F8EEEB] flex h-screen flex-col items-center justify-between">
      <div className="overflow-hidden w-full  items-center justify-between  lg:flex flex-col">
        <Hero />
      </div>
    </main>
  );
}
