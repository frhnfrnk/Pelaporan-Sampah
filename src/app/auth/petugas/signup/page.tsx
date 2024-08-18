import React from "react";
import SignupForm from "@/components/Form/SignupForm";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Daftar sebagai Petugas - Pelaporan Titik Sampah & Infrastruktur Nusa Penida",
  description:
    "Bergabung dengan komunitas petugas untuk menjaga kebersihan dan infrastruktur Nusa Penida. Daftar sekarang untuk mulai melaporkan titik sampah dan masalah infrastruktur di sekitar Anda.",
};

const SignupPage: React.FC = () => {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="flex gap-5 flex-col min-w-[320px] transition-all">
        <h1 className="text-2xl text-center font-bold">
          Daftar sebagai Petugas
        </h1>
        <div className="border-[1px] border-gray-100  rounded-lg shadow-xl">
          <SignupForm>
            <Link href="/auth/login" className="font-semibold">
              Login
            </Link>{" "}
          </SignupForm>
        </div>
      </div>
    </main>
  );
};

export default SignupPage;
