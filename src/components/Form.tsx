"use client";
import React, { useState, useEffect } from "react";
import MiniMap from "./MiniMap";
import { toast } from "./ui/use-toast";
import InputFieldReport from "./Field/InputFieldReport";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  addReport,
  emtpyDataReport,
  setDataReport,
} from "@/lib/features/report/reportSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import ImageField from "./Field/ImageField";
import { logout } from "@/lib/features/auth/authSlice";
import axiosInstance from "@/lib/axios";
import Loading from "./Loading";

const ReportForm = () => {
  const [loading, setLoading] = useState(false);
  const reportData = useAppSelector((state) => state.report.report);
  const dispatch = useAppDispatch();

  const handleChange = (id: string, value: any) => {
    dispatch(setDataReport({ [id]: value }));
  };

  const imageData = useAppSelector((state) => state.report.image);

  const uploadImage = async (image: any) => {
    let url = [] as any;
    try {
      await Promise.all(
        image.map(async (imgFile: any, index: number) => {
          if (typeof imgFile === "string") {
            url.push(imgFile);
            return;
          }
          try {
            const response = await axiosInstance.post(
              `${process.env.NEXT_PUBLIC_API_URL}/cloudinary/upload`,
              imgFile
            );

            url.push(response.data);
          } catch (error: any) {
            if (error.response.data.message == "Unauthorized") {
              console.log(error);
              dispatch(logout());
              toast({
                title: "Your session is expired",
                description: "Please login again",
                variant: "destructive",
              });
              setTimeout(() => {
                window.location.href = "/auth/login";
              }, 1000);
              return;
            }
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
    return url;
  };

  const onSubmit = async () => {
    setLoading(true);
    let data = { ...reportData } as any;
    const image = imageData as any;
    let imageUrl = [] as any;
    if (image.length > 0) {
      imageUrl = await uploadImage(image);
      data = { ...data, image: imageUrl };
    }

    dispatch(addReport(data))
      .unwrap()
      .then((res) => {
        dispatch(emtpyDataReport());
        setLoading(false);

        toast({
          title: "Success",
          description: "Report has been added",
          variant: "default",
        });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        // if (err.response.data.message == "Unauthorized") {
        //   dispatch(logout());
        //   return;
        // }
        // toast({
        //   title: "Error",
        //   description: err.response.data.message,
        //   variant: "destructive",
        // });
      });
  };

  const handleCategory = (value: string) => {
    dispatch(setDataReport({ category: value }));
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <form className="space-y-4 px-4 lg:px-8 pb-8">
          <InputFieldReport
            label="Title"
            type="text"
            id="name"
            value={reportData?.name}
            wajib
            placeholder="Title"
            onChange={(value) => {
              handleChange("name", value);
            }}
          />
          <div className="w-full flex flex-col lg:flex-row items-center gap-1 mb-3">
            <label
              htmlFor="category"
              className="w-full lg:w-48 text-sm mb-2 lg:mb-0"
            >
              Category
              <span className="text-sm text-[#ff0000]">*</span>
            </label>
            <div className="w-full grow-0 lg:grow">
              <Select onValueChange={handleCategory}>
                <SelectTrigger
                  className="w-full focus:outline-none border-[1px] border-input rounded-md px-5 py-2 placeholder:text-sm text-sm
          "
                >
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sampah">Waste</SelectItem>
                  <SelectItem value="Infrastruktur">Infrastructure</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-full flex flex-col lg:flex-row items-start gap-1 mb-3 h-[300px]">
            <label
              htmlFor="category"
              className="w-full lg:w-48 text-sm mb-2 lg:mb-0"
            >
              Location
              <span className="text-sm text-[#ff0000]">*</span>
            </label>
            <MiniMap />
          </div>
          <div className="w-full flex flex-col lg:flex-row items-start gap-1 mb-3">
            <label
              htmlFor="image"
              className="w-full lg:w-48 text-sm mb-2 lg:mb-0"
            >
              Image
              <span className="text-sm text-[#ff0000]">*</span>
            </label>
            <ImageField label="Image Cover" id="cover" img={imageData!} />
          </div>
          {loading ? (
            <div>
              <h1>Loading...</h1>
            </div>
          ) : (
            <button
              type="submit"
              onClick={onSubmit}
              className="w-36 py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          )}
        </form>
      )}
    </>
  );
};

export default ReportForm;
