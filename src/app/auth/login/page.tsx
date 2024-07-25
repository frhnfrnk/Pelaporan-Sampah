"use client";
import React, { useEffect } from "react";
import LoginForm from "@/components/Form/LoginForm";
import Link from "next/link";

const LoginPage: React.FC = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : null;
      if (user) {
        user.role === "user"
          ? (window.location.href = "/report")
          : (window.location.href = "/petugas/data");
      }
    }
  }, []);

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="flex gap-5 flex-col w-[320px]">
        <div>
          <h1 className="text-2xl text-center font-semibold">Nusa Penida</h1>
          <p className="text-center">Welcome back! Please Sign In</p>
        </div>
        <div className="border-[1px] border-gray-100 rounded-lg shadow-xl">
          <LoginForm>
            <Link href={"/auth/signup"} className="font-semibold">
              Sign Up
            </Link>
          </LoginForm>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
