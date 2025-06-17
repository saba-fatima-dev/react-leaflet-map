// src/MapView.tsx
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MapScaleControl from "./components/MapScaleControl";
import MapExportControl from "./components/MapExportControl";

const MapView: React.FC = () => {
  return (
    <>
    <MapContainer
      center={[33.6844, 73.0479]}
      zoom={15}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      <MapScaleControl />
    </MapContainer>
    <MapExportControl />
    </>
  );
};

export default MapView;
