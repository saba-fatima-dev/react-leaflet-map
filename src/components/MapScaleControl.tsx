// src/components/MapScaleControl.tsx
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const MapScaleControl: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    const scale = L.control.scale({ imperial: false });
    scale.addTo(map);
    return () => {
      scale.remove();
    };
  }, [map]);

  return null;
};

export default MapScaleControl;
