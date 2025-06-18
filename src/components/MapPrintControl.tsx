import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-easyprint"; 
import L from "leaflet";

const MapPrintControl: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const printPlugin = (L as any).easyPrint({
      title: "Print Map",
      position: "topright",
      sizeModes: ["Current", "A4Portrait", "A4Landscape"],
      filename: "map-export",
      exportOnly: false, // set true if you only want PNG
      hideControlContainer: true,
    }).addTo(map);

    return () => {
      map.removeControl(printPlugin);
    };
  }, [map]);

  return null;
};

export default MapPrintControl;
