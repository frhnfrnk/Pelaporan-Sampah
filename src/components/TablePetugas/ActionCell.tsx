import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Loading from "../Loading";
import { Report } from "@/utils/types/report";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { doneReport, proceedReport } from "@/lib/features/report/reportSlice";
import { toast } from "../ui/use-toast";
import axiosInstance from "@/lib/axios";
import { logout } from "@/lib/features/auth/authSlice";
import ImageFieldProof from "../Field/ImageFieldProof";
import { Label } from "@radix-ui/react-label";

interface ActionsCellProps {
  report: Report;
}

const ActionsCell: React.FC<ActionsCellProps> = ({ report }) => {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("Proceed");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
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
        image.map(async (imgFile: any) => {
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
            if (error.response.data.message === "Unauthorized") {
              dispatch(logout());
              toast({
                title: "Your session is expired",
                description: "Please login again",
                variant: "destructive",
              });
              setTimeout(() => {
                window.location.href = "/auth/login";
              }, 1000);
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
    setAction(handleStatusForName(report.status));
  }, [report.status]);

  return (
    <div className="flex justify-start gap-3 w-full">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>View</Button>
        </DialogTrigger>
        <DialogContent className="sm:w-screen lg:max-w-5xl max-h-[80vh] overflow-y-auto p-4">
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
          </DialogHeader>
          {loading ? (
            <Loading />
          ) : (
            <div className="w-full flex flex-col lg:flex-row items-center gap-3">
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
                  <Label htmlFor="image" className="w-48 text-base font-bold">
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
            {action !== "Done" && action !== "Finish" && (
              <Button
                className="bg-[#D7713E] mt-2 lg:mt-0"
                onClick={() => handleProceed("Rejected")}
              >
                Reject
              </Button>
            )}
            {action !== "Done" && (
              <Button
                onClick={() => {
                  if (report.status === "Pending") {
                    handleProceed("In Progress");
                  } else if (report.status === "In Progress") {
                    handleDone();
                  }
                }}
              >
                {action}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActionsCell;
