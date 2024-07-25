import React, { useState } from "react";
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

const ActionsCell: React.FC<{ report: Report }> = ({ report }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex justify-start gap-3 max-w-4xl">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>View</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] lg:max-w-5xl">
          <DialogHeader>
            <DialogTitle>{report.name}</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col">
                <span>Desa : {report.desa}</span>
                <span>
                  Status : <span className="font-bold">{report.status}</span>
                </span>
                <span>Address: {report.address}</span>
              </div>
            </DialogDescription>
          </DialogHeader>
          {loading ? (
            <Loading />
          ) : (
            <div className="w-full flex items-center gap-3">
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
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActionsCell;
