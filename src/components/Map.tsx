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

import classes from "@/app/Page.module.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface DataMarker {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function MapComponent() {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const [data, setData] = useState([] as any);
  const params = useSearchParams();

  const [selectedMarker, setSelectedMarker] = useState<DataMarker | null>(null);
  const mapRef = useRef<MapRef | null>(null);

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
          latitude: -7.7715482,
          longitude: 110.377042,
          zoom: 15,
        }}
        maxZoom={20}
        minZoom={3}
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
              <FaMapMarkerAlt className="text-red-500 text-5xl" />
            </button>
          </Marker>
        ))}

        {selectedMarker ? (
          <Popup
            offset={25}
            latitude={selectedMarker.latitude}
            longitude={selectedMarker.longitude}
            onClose={() => {
              setSelectedMarker(null);
            }}
            closeButton={false}
          >
            <h3 className={classes.popupTitle}>{selectedMarker.name}</h3>
            <div className={classes.popupInfo}></div>
          </Popup>
        ) : null}

        <div className="flex gap-5 absolute top-4 right-4">
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
