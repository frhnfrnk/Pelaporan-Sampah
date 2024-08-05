import React from "react";
import SignupForm from "@/components/Form/SignupForm";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup | Deepublish",
  description: "Signup to Deepublish to read your favorite books.",
};

const SignupPage: React.FC = () => {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="flex gap-5 flex-col min-w-[320px] transition-all">
        <h1 className="text-2xl text-center font-bold">
          Nusa Penida Report Center
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
