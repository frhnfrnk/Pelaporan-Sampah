"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { Report } from "@/utils/types/report";
import ActionsCell from "./ActionCell";

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
    accessorKey: "category",
    header: "Category",
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
    cell: ({ row }) => <ActionsCell report={row.original as Report} />,
  },
];
