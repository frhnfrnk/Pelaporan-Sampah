"use client";
import { TableDemo } from "@/components/Table";
import { columns } from "@/components/TablePetugas/Columns";
import { DataTable } from "@/components/TablePetugas/DataTable";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import { logout } from "@/lib/features/auth/authSlice";
import { fetchAllReports } from "@/lib/features/report/reportSlice";
import { useAppDispatch } from "@/lib/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

const ListPage = () => {
  const [isValid, setIsValid] = React.useState(false);
  const [data, setData] = useState([] as any);
  const dispatch = useAppDispatch();

  const fetchDataReport = async () => {
    dispatch(fetchAllReports())
      .unwrap()
      .then((response: Report) => {
        setData(response);
      })
      .catch((err: any) => {
        console.log("err", err);
        toast({
          description: err.response.data.message,
          title: "Session Expired",
          variant: "destructive",
        });

        if (err.response.data.error === "Unauthorized") {
          dispatch(logout());
          setTimeout(() => {
            window.location.href = "/auth/login";
          }, 2000);
        }
      });
  };

  useEffect(() => {
    fetchDataReport();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : null;
      if (user) {
        if (user.role === "user") {
          toast({
            description: "Anda tidak memiliki akses",
            title: "Gagal",
            variant: "destructive",
          });
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          setIsValid(true);
        }
      } else {
        setIsValid(false);
        toast({
          description: "Anda harus login",
          title: "Gagal",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 2000);
      }
    }
  }, []);

  return (
    <>
      <Toaster />
      {isValid && (
        <div className="mx-auto max-w-4xl flex flex-col justify-center items-center py-8">
          <div className="w-full flex gap-5 items-center justify-between  mb-5">
            <Link href={"/"} className="flex items-center">
              <IoIosArrowRoundBack
                className="
            text-3xl
            text-gray-500
            cursor-pointer
            hover:text-gray-700
        "
              />
              <p className="text-sm text-gray-500">Back</p>
            </Link>
            <h1 className="text-3xl font-semibold">Data</h1>
            <IoIosArrowRoundBack
              className="
          invisible
            text-3xl
            text-gray-500
            cursor-pointer
            hover:text-gray-700
        "
            />
          </div>
          <Toaster />
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </>
  );
};

export default ListPage;
