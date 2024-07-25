"use client";
import ReportForm from "@/components/Form";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { useEffect } from "react";

export default function Report() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : null;
      if (user) {
        if (user.role == "petugas") {
          window.location.href = "/petugas/data";
        }
      } else {
        window.location.href = "/auth/login";
      }
    }
  }, []);

  return (
    <div className="w-full bg-[#F6F6F6] pb-5">
      <div className="w-[90%] min-h-screen flex flex-col gap-5 items-start justify-center  mx-auto">
        <Toaster />
        <Button className="bg-[#D7713E] hover:bg-primary cursor-pointer">
          <Link href="/report">Back</Link>
        </Button>
        <main className="w-full bg-white rounded-md shadow-lg border-[1px] border-[#e2e2e2] mb-5  ">
          <div className="p-4 w-full border-b-[1px]  mb-4 bg-[#FAFAFA] border-[#e2e2e2]">
            <h1 className="px-4 text-xxl font-bold font-sirukota">
              Report Form
            </h1>
          </div>
          <ReportForm />
        </main>
      </div>
    </div>
  );
}
