"use client";
import { TableDemo } from "@/components/Table";
import { columns } from "@/components/TablePetugas/Columns";
import { DataTable } from "@/components/TablePetugas/DataTable";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import { logout } from "@/lib/features/auth/authSlice";
import { fetchAllReports, setLoading } from "@/lib/features/report/reportSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiMap } from "react-icons/ci";
import { IoIosArrowRoundBack } from "react-icons/io";

const ListPage = () => {
  const [isValid, setIsValid] = React.useState(false);
  const [dataPending, setDataPending] = useState([] as any);
  const [dataInProgress, setDataInProgress] = useState([] as any);
  const [dataCompleted, setDataCompleted] = useState([] as any);
  const dispatch = useAppDispatch();

  const status = useAppSelector((state) => state.report.status);

  const fetchDataReport = async () => {
    dispatch(setLoading("loading"));
    dispatch(fetchAllReports())
      .unwrap()
      .then((response: any) => {
        const data = response;
        console.log("data", data);
        setDataPending(data.filter((item: any) => item.status === "Pending"));
        setDataInProgress(
          data.filter((item: any) => item.status === "In Progress")
        );
        setDataCompleted(
          data.filter((item: any) => item.status === "Resolved")
        );
        dispatch(setLoading("done"));
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
        dispatch(setLoading("done"));
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

  const handleLogout = () => {
    dispatch(logout());
    toast({
      description: "Anda berhasil logout",
      title: "Sukses",
    });
    setTimeout(() => {
      window.location.href = "/auth/login";
    }, 1000);
  };

  return (
    <>
      <Toaster />
      {isValid && (
        <div className="mx-auto w-full lg:max-w-4xl flex flex-col justify-center items-center py-8">
          <div className="px-2 lg:px-0 w-full flex gap-5 items-center justify-between  mb-5">
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
            <IoIosArrowRoundBack
              className="
          invisible
            text-3xl
            text-gray-500
            cursor-pointer
            hover:text-gray-700
        "
            />
            <div className="flex gap-5">
              <Link href={"/petugas/map"}>
                <Button className="bg-primary flex flex-row w-auto justify-center items-center gap-2">
                  Map
                  <CiMap />
                </Button>
              </Link>
              <Button className="bg-[#D7713E]" onClick={handleLogout}>
                <span>Logout</span>
              </Button>
            </div>
          </div>
          <Toaster />

          <div className="w-full mb-10">
            <h1 className="font-sirukota text-3xl text-center">Laporan Baru</h1>
            {status === "loading" ? (
              <div className="flex justify-center items-center mt-4">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <DataTable columns={columns} data={dataPending} />
            )}
          </div>
          <div className="w-full mb-10">
            <h1 className="font-sirukota text-3xl text-center">
              Sedang Proses
            </h1>
            {status === "loading" ? (
              <div className="flex justify-center items-center mt-4">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <DataTable columns={columns} data={dataInProgress} />
            )}
          </div>
          <div className="w-full mb-10">
            <h1 className="font-sirukota text-3xl text-center">
              Laporan Selesai
            </h1>
            {status === "loading" ? (
              <div className="flex justify-center items-center mt-4">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <DataTable columns={columns} data={dataCompleted} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ListPage;
