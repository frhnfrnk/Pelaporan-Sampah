import ButtonToMap from "@/components/ButtonToMap";
import LocationForm from "@/components/Form";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Form Lokasi",
  description: "Form untuk menginputkan lokasi",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col gap-5 items-center justify-center bg-gray-100">
      <Toaster />
      <main className="w-[80%] bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Form Lokasi</h1>
        <LocationForm />
      </main>
      <ButtonToMap />
    </div>
  );
}
