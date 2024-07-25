import MapComponent from "@/components/Map";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Map",
  description: "Map page",
};

const MapPage = () => {
  return (
    <>
      <MapComponent />
    </>
  );
};

export default MapPage;
