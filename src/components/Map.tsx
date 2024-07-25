// page.js
"use client";

import MapGL, {
  Marker,
  Popup,
  NavigationControl,
  GeolocateControl,
  MapRef,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import classes from "@/app/Page.module.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SuspenseWrapper from "./Suspense/SuspenWrapper";
import { useAppDispatch } from "@/lib/store";
import { fetchAllReports } from "@/lib/features/report/reportSlice";
import { toast } from "./ui/use-toast";
import { logout } from "@/lib/features/auth/authSlice";

interface DataMarker {
  image: any;
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  category: string;
}

function Map() {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const [data, setData] = useState([] as any);
  const params = useSearchParams();

  const [selectedMarker, setSelectedMarker] = useState<DataMarker | null>(null);
  const mapRef = useRef<MapRef | null>(null);
  const dispatch = useAppDispatch();

  const fetchDataReport = async () => {
    dispatch(fetchAllReports())
      .unwrap()
      .then((response: Report) => {
        console.log("response", response);
        setData(response);
      })
      .catch((err: any) => {
        console.log("err", err);
        toast({
          description: err.response.data.message,
          title: "Session Expired",
          variant: "destructive",
        });

        if (err.response.data.error === "Unauthorized") {
          dispatch(logout());
          setTimeout(() => {
            window.location.href = "/auth/login";
          }, 2000);
        }
      });
  };

  useEffect(() => {
    fetchDataReport();
  }, []);

  useEffect(() => {
    if (params.has("latitude") && params.has("longitude")) {
      const latitude = Number(params.get("latitude"));
      const longitude = Number(params.get("longitude"));
      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [longitude, latitude],
          zoom: 20,
        });
      }
    }
  }, [params, data]);

  const zoomToSelectedLoc = (
    e: React.MouseEvent<HTMLButtonElement>,
    marker: DataMarker
  ) => {
    e.stopPropagation();
    setSelectedMarker(marker);
    console.log("marker", marker);
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [marker.longitude, marker.latitude],
        zoom: 15,
      });
    }
  };

  return (
    <main className={classes.mainStyle}>
      <MapGL
        ref={mapRef}
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        initialViewState={{
          latitude: -8.7333304,
          longitude: 115.5333312,
          zoom: 11.5,
        }}
        maxZoom={20}
        minZoom={11}
      >
        <GeolocateControl position="top-left" />
        <NavigationControl position="top-left" />
        {data.map((location: DataMarker) => (
          <Marker
            key={location.id}
            latitude={location.latitude}
            longitude={location.longitude}
          >
            <button
              className={classes.marker}
              onClick={(e) => zoomToSelectedLoc(e, location)}
            >
              <FaMapMarkerAlt
                className={`${
                  location.category == "Sampah"
                    ? "text-[#D7713E]"
                    : "text-primary"
                } text-5xl`}
              />
            </button>
          </Marker>
        ))}

        {selectedMarker ? (
          <Popup
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
            }}
            offset={25}
            latitude={selectedMarker.latitude}
            longitude={selectedMarker.longitude}
            onClose={() => {
              setSelectedMarker(null);
            }}
            closeButton={false}
          >
            <h3 className={classes.popupTitle}>{selectedMarker.name}</h3>
            <div className={classes.popupInfo}>
              <img src={selectedMarker.image[0]} alt="placeholder" />
            </div>
          </Popup>
        ) : null}

        <div className="flex gap-5 absolute top-4 right-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="sampah">Sampah</SelectItem>
              <SelectItem value="infrastruktur">Infrastruktur</SelectItem>
            </SelectContent>
          </Select>

          <Link href="/">
            <button className=" bg-blue-500 text-white px-4 py-2 rounded-md shadow-md">
              Tambahkan data baru
            </button>
          </Link>
          <Link href="/list">
            <button className=" bg-red-500 text-white px-4 py-2 rounded-md shadow-md">
              Lihat data
            </button>
          </Link>
        </div>
      </MapGL>
    </main>
  );
}

export default function MapComponent() {
  return (
    <SuspenseWrapper>
      <Map />
    </SuspenseWrapper>
  );
}
