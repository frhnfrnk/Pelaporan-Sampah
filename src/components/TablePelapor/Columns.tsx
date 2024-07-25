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
import { useState } from "react";
import { Input } from "../ui/input";
import { Report } from "@/utils/types/report";
import Loading from "../Loading";

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
    accessorKey: "desa",
    header: "Desa",
  },
  {
    accessorKey: "status",
    header: "Status",
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
                      Status :{" "}
                      <span className="font-bold">{report.status}</span>
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
    },
  },
];
