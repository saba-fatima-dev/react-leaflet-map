// src/components/MapExportControl.tsx
import React from "react";
import html2canvas from "html2canvas";

const MapExportControl: React.FC = () => {
    const handleExport = () => {
  const mapContainer = document.querySelector(".leaflet-container") as HTMLElement;
  if (!mapContainer) return;

  const fileName = prompt("Enter a name for your map image:", "leaflet-map");
  if (!fileName) return;

  // Ensure map is rendered and visible before capture
  setTimeout(() => {
    html2canvas(mapContainer, {
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      scale: 2, // increase resolution
    }).then((canvas) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `${fileName}.png`;
          link.click();
          URL.revokeObjectURL(url);
        }
      });
    });
  }, 500); // 500ms delay for rendering
  };


  const handlePrint = () => {
    const mapContainer = document.querySelector(".leaflet-container") as HTMLElement;
    if (!mapContainer) return;

    html2canvas(mapContainer, { useCORS: true }).then((canvas) => {
      const dataUrl = canvas.toDataURL();
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`<img src="${dataUrl}" style="width:100%">`);
        printWindow.document.close();
        printWindow.print();
      }
    });
  };

  return (
    <div style={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}>
      <button
        onClick={handleExport}
        style={{
          marginRight: "8px",
          padding: "8px 12px",
          backgroundColor: "#2b7a78",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Export
      </button>
      <button
        onClick={handlePrint}
        style={{
          padding: "8px 12px",
          backgroundColor: "#17252a",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Print
      </button>
    </div>
  );
};

export default MapExportControl;
