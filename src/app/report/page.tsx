"use client";
import { DataTable } from "@/components/TablePelapor/DataTable";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import React, { useEffect, useState } from "react";
import { columns } from "@/components/TablePelapor/Columns";
import { useAppDispatch } from "@/lib/store";
import { getHistoryReport } from "@/lib/features/report/reportSlice";
import { logout } from "@/lib/features/auth/authSlice";

const AllReportsPage = () => {
  const [isValid, setIsValid] = useState(false);
  const [data, setData] = useState([] as any);
  const dispatch = useAppDispatch();

  const fetchDataReport = async () => {
    dispatch(getHistoryReport())
      .unwrap()
      .then((response) => {
        console.log("response", response);
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
        if (user.role === "petugas") {
          toast({
            description: "Anda tidak memiliki akses",
            title: "Gagal",
            variant: "destructive",
          });
          setTimeout(() => {
            window.location.href = "/petugas/data";
          }, 2000);
        } else {
          setIsValid(true);
        }
      }
    }
  }, []);

  return (
    <>
      <Toaster />
      {isValid && (
        <div className="mx-auto max-w-4xl flex flex-col justify-center items-center py-8">
          <h1 className="text-3xl font-semibold font-sirukota">
            Report History
          </h1>
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </>
  );
};

export default AllReportsPage;
