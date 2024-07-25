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
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setDataReport } from "@/lib/features/report/reportSlice";
import MyLocationIcon from "./Icon/MyLocation";

export default function MiniMap() {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    lng: 0,
  });
  const [userCoordinates, setUserCoordinates] = useState({
    lat: 0,
    lng: 0,
  });
  const [viewport, setViewport] = useState({
    latitude: -8.679488,
    longitude: 115.489716,
    zoom: 15,
  });
  const dispatch = useAppDispatch();
  const reportData = useAppSelector((state) => state.report.report);

  useEffect(() => {
    if (reportData) {
      if (reportData.latitude && reportData.longitude) {
        setCoordinates({
          lat: reportData.latitude,
          lng: reportData.longitude,
        });
      }
    } else {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCoordinates({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error("Geolocation error:", error);
          }
        );
      } else {
        console.log("Geolocation is not available");
      }
    }
  }, []);

  const findMyLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserCoordinates({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    } else {
      console.log("Geolocation is not available");
    }
  };

  useEffect(() => {
    findMyLocation();
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
    dispatch(setDataReport({ latitude: lngLat.lat, longitude: lngLat.lng }));
  };
  const handleMapClick = (event: any) => {
    const { lngLat } = event;
    setCoordinates({
      lat: lngLat.lat,
      lng: lngLat.lng,
    });
    dispatch(setDataReport({ latitude: lngLat.lat, longitude: lngLat.lng }));
  };

  return (
    <main className="flex-grow h-full">
      <MapGL
        ref={mapRef}
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        {...viewport}
        onMove={(evt) => setViewport(evt.viewState)}
        cursor="crosshair"
        onClick={handleMapClick}
        maxZoom={20}
        minZoom={11}
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
            <FaMapMarkerAlt className="text-red-500 text-3xl" />
          </div>
        </Marker>
        <Marker latitude={userCoordinates.lat} longitude={userCoordinates.lng}>
          <MyLocationIcon />
        </Marker>
      </MapGL>
    </main>
  );
}
