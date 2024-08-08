"use client";
import { DataTable } from "@/components/TablePelapor/DataTable";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import React, { useEffect, useState } from "react";
import { columns } from "@/components/TablePelapor/Columns";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  getHistoryReport,
  setLoading,
} from "@/lib/features/report/reportSlice";
import { logout } from "@/lib/features/auth/authSlice";
import { stat } from "fs";

const AllReportsPage = () => {
  const [isValid, setIsValid] = useState(false);
  const [data, setData] = useState([] as any);
  const dispatch = useAppDispatch();

  const status = useAppSelector((state) => state.report.status);

  const fetchDataReport = async () => {
    dispatch(setLoading("loading"));
    dispatch(getHistoryReport())
      .unwrap()
      .then((response) => {
        setData(response);
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
        <div className="mx-auto w-full lg:max-w-4xl flex flex-col justify-center items-center py-8">
          <h1 className="text-3xl font-semibold font-sirukota">
            Report History
          </h1>
          {status === "loading" ? (
            <div className="flex justify-center items-center mt-4">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <DataTable columns={columns} data={data} />
          )}
        </div>
      )}
    </>
  );
};

export default AllReportsPage;
