"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Report } from "@/utils/types/report";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { doneReport, proceedReport } from "@/lib/features/report/reportSlice";
import { toast } from "../ui/use-toast";
import Loading from "../Loading";
import axiosInstance from "@/lib/axios";
import { logout } from "@/lib/features/auth/authSlice";
import ImageField from "../Field/ImageField";
import ImageFieldProof from "../Field/ImageFieldProof";

export const columns: ColumnDef<Report>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Title",
  },
  {
    accessorKey: "pelapor",
    header: "Pelapor",
    cell: ({ row }) => {
      const report = row.original as Report;
      return report.pelapor.name;
    },
  },
  {
    accessorKey: "desa",
    header: "Desa",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const report = row.original as Report;
      return <span className="font-bold">{report.status}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const report = row.original as Report;
      return new Date(report.createdAt).toLocaleDateString();
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
    cell: ({ row }) => {
      const report = row.original as Report;
      return new Date(report.updatedAt).toLocaleDateString();
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const report = row.original as Report;
      const [name, setName] = useState(report.name);
      const [open, setOpen] = useState(false);
      const [action, setAction] = useState("Proceed");
      const [loading, setLoading] = useState(false);
      const dispatch = useAppDispatch();
      const status = report.status;
      const imageData = useAppSelector((state) => state.report.image);
      const date = new Date(report.createdAt).toLocaleDateString();

      const handleProceed = async (status: string) => {
        setLoading(true);

        dispatch(proceedReport({ id: report._id, status: status }))
          .unwrap()
          .then(() => {
            setLoading(false);
            toast({
              title: "Success",
              description: "Report has been updated",
              variant: "default",
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            toast({
              title: "Error",
              description: "Failed to update report",
              variant: "destructive",
            });
          });
      };

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
                console.log(error);
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

      const handleDone = async () => {
        setLoading(true);
        const image = imageData as any;
        let imageUrl = [] as any;
        if (image.length > 0) {
          imageUrl = await uploadImage(image);
        }
        dispatch(doneReport({ id: report._id, image: imageUrl }))
          .unwrap()
          .then(() => {
            setLoading(false);
            toast({
              title: "Success",
              description: "Report has been updated",
              variant: "default",
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            toast({
              title: "Error",
              description: "Failed to update report",
              variant: "destructive",
            });
          });
      };

      const handleStatusForName = (status: string) => {
        switch (status) {
          case "Pending":
            return "Proceed";
          case "In Progress":
            return "Finish";
          case "Resolved":
            return "Done";
          case "Rejected":
            return "Done";
          case "Closed":
            return "Done";
          default:
            return "";
        }
      };

      useEffect(() => {
        setAction(handleStatusForName(status));
      }, [status]);

      return (
        <div className="flex justify-start gap-3 w-full">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>View</Button>
            </DialogTrigger>
            <DialogContent className="sm:w-screen  lg:max-w-5xl max-h-[80vh] overflow-y-auto p-4">
              <DialogHeader>
                <DialogTitle className="text-2xl">{report.name}</DialogTitle>
                <div className="flex">
                  <p className="text-base">Pelapor :</p>
                  <p className="text-base ml-2">{report.pelapor.name}</p>
                </div>
                <div className="flex">
                  <p className="text-base">Tanggal :</p>
                  <p className="text-base ml-2">{date}</p>
                </div>
                {/* <div className="flex">
                  <p className="text-base">Pelapor :</p>
                  <p className="text-base ml-2">{report.pelapor.name}</p>
                </div> */}
              </DialogHeader>
              {loading ? (
                <Loading />
              ) : (
                <div className="w-full flex flex-col lg:flex-row items-center gap-3 ">
                  <div className="w-full lg:w-1/2">
                    <Label htmlFor="image" className="w-48 text-base font-bold">
                      Gambar
                    </Label>
                    <div className="flex flex-col mt-2">
                      {report.image
                        ? report.image.map((img, index) => (
                            <img
                              key={index}
                              src={img}
                              alt={report.name}
                              className="w-full object-cover rounded-sm"
                            />
                          ))
                        : null}
                    </div>
                  </div>
                  {report.status !== "Pending" ? (
                    <div className="w-full lg:w-1/2">
                      <Label
                        htmlFor="image"
                        className="w-48 text-base font-bold"
                      >
                        Bukti Penyelesaian
                      </Label>
                      <div className="flex flex-col mt-2">
                        <ImageFieldProof
                          status={report.status}
                          label="Image Cover"
                          id="cover"
                          img={report.imageDone}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
              <DialogFooter>
                {action !== "Done" ? (
                  action !== "Finish" ? (
                    <Button
                      className="bg-[#D7713E] mt-2 lg:mt-0"
                      onClick={() => {
                        handleProceed("Rejected");
                      }}
                    >
                      Reject
                    </Button>
                  ) : null
                ) : null}
                {action !== "Done" ? (
                  <Button
                    onClick={() => {
                      if (status === "Pending") {
                        handleProceed("In Progress");
                      } else if (status === "In Progress") {
                        handleDone();
                      }
                    }}
                  >
                    {action}
                  </Button>
                ) : null}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
