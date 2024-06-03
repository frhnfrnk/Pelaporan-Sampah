"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import MiniMap from "./MiniMap";
import { set } from "mongoose";
import { toast } from "./ui/use-toast";

const LocationForm = () => {
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    latitude: "",
    longitude: "",
  });

  const onSubmit = async () => {
    setLoading(true);
    const body = {
      ...data,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    };
    await axios
      .post("/api/locations", body)
      .then((response) => {
        setData({
          ...data,
          name: "",
        });
        toast({
          description: "Data berhasil disimpan",
          title: "Sukses",
        });
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };

  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nama:</label>
        <input
          onChange={(e) =>
            setData({
              ...data,
              name: e.target.value,
            })
          }
          value={data.name}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="w-full h-[500px]">
        <MiniMap setDataCoordinates={setCoordinates} />
      </div>
      {loading ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <button
          type="submit"
          onClick={onSubmit}
          className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      )}
    </form>
  );
};

export default LocationForm;
