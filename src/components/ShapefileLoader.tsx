import React, { useState, useEffect } from "react";
import shp from "shpjs";
import { GeoJSON, useMap } from "react-leaflet";
import { FeatureCollection, Geometry, GeoJsonProperties} from "geojson";
import * as L from "leaflet";

const ShapefileLoader: React.FC = () => {
  const [geojsonData, setGeojsonData] = useState<FeatureCollection<Geometry, GeoJsonProperties> | null>(null);
  const [geojsonKey, setGeojsonKey] = useState<number>(0); // force re-render of GeoJSON
  const map = useMap();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();

    try {
      const result = await shp(arrayBuffer);

      let merged: FeatureCollection<Geometry, GeoJsonProperties>;
      if (Array.isArray(result)) {
        const allFeatures = result.flatMap(fc => fc.features);
        merged = {
          type: "FeatureCollection",
          features: allFeatures,
        };
      } else {
        merged = result as FeatureCollection<Geometry, GeoJsonProperties>;
      }

      setGeojsonData(merged);
      setGeojsonKey(prev => prev + 1); // force fresh rendering
    } catch (error) {
      console.error("Failed to parse shapefile:", error);
    }
  };

  useEffect(() => {
    if (geojsonData && geojsonData.features.length > 0) {
      const geoJsonLayer = L.geoJSON(geojsonData);
      const bounds = geoJsonLayer.getBounds();
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [geojsonData, map]);

  return (
    <>
      <input
        type="file"
        accept=".zip"
        onChange={handleFileUpload}
        style={{
          position: "absolute",
          top: "12px",
          right: "60px",
          zIndex: 1000,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          padding: "5px",
          borderRadius: "4px",
        }}
      />
      {geojsonData && (
        <GeoJSON
          key={geojsonKey}
          data={geojsonData}
          style={{ color: "#2b7a78", weight: 2, fillOpacity: 0.3 }}
        />
      )}
    </>
  );
};

export default ShapefileLoader;
