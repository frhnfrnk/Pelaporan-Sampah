import { TableDemo } from "@/components/Table";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

const ListPage = () => {
  return (
    <div className="mx-auto max-w-2xl flex flex-col justify-center items-center py-8">
      <Toaster />
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
      <TableDemo />
    </div>
  );
};

export default ListPage;
