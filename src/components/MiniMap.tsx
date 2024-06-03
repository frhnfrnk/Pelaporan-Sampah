// page.js
"use client";

import MapGL, {
  Marker,
  NavigationControl,
  GeolocateControl,
  MapRef,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import classes from "@/app/styles/Minimap.module.css";
import { useEffect, useRef, useState, useCallback } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function MiniMap({ setDataCoordinates }: any) {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    lng: 0,
  });

  const [viewport, setViewport] = useState({
    latitude: -6.2088, // Default to Jakarta coordinates
    longitude: 106.8456,
    zoom: 15,
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lng: longitude });
          setDataCoordinates({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    } else {
      console.log("Geolocation is not available");
    }
  }, []);

  useEffect(() => {
    if (coordinates.lat !== 0 && coordinates.lng !== 0) {
      setViewport({
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        zoom: 15,
      });
    }
  }, [coordinates]);

  const mapRef = useRef<MapRef | null>(null);

  const handleMarkerDragEnd = (event: any) => {
    const { lngLat } = event;
    setCoordinates({
      lat: lngLat.lat,
      lng: lngLat.lng,
    });
    setDataCoordinates({
      lat: lngLat.lat,
      lng: lngLat.lng,
    });
  };

  return (
    <main className={classes.mainStyle}>
      <MapGL
        ref={mapRef}
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        {...viewport}
        onMove={(evt) => setViewport(evt.viewState)}
        maxZoom={20}
        minZoom={3}
      >
        <GeolocateControl position="top-left" />
        <NavigationControl position="top-left" />
        <Marker
          draggable
          onDragEnd={handleMarkerDragEnd}
          latitude={coordinates.lat}
          longitude={coordinates.lng}
        >
          <div className={classes.marker}>
            <FaMapMarkerAlt className="text-red-500 text-5xl" />
          </div>
        </Marker>
      </MapGL>
    </main>
  );
}
