"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DeleteDialog from "./Dialog/DeleteDialog";
import { toast } from "./ui/use-toast";

export function TableDemo() {
  const [data, setData] = useState([] as any);
  const router = useRouter();

  const getData = async () => {
    await axios
      .get("/api/locations", data)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id: any) => {
    await axios
      .delete("/api/locations", { data: { id } })
      .then((response) => {
        getData();
        toast({
          description: "Data berhasil dihapus",
          title: "Sukses",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const viewMap = (latitude: any, longitude: any) => {
    router.push(`/map?latitude=${latitude}&longitude=${longitude}`);
  };

  return (
    <Table className="overflow-x-scroll">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Latitude</TableHead>
          <TableHead>Longitude</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((element: any, index: any) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{element.name}</TableCell>
            <TableCell>{element.latitude}</TableCell>
            <TableCell>{element.longitude}</TableCell>
            <TableCell className="flex lg:flex-row flex-col tiems-center justify-center gap-1 lg:gap-5">
              <button
                onClick={() => {
                  viewMap(element.latitude, element.longitude);
                }}
                className="text-blue-500 hover:text-blue-700 bg-transparent border border-solid border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
              >
                View
              </button>
              <DeleteDialog onDelete={() => handleDelete(element._id)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
