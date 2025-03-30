// DownloadPopup.js
import React from "react";
import DocumentIcon from "../../assets/svg/DocumentIcon";
import CaretDownIcon from "../../assets/svg/CaretDownIcon";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const DownloadPopup = ({ isOpen, onClose, chartRef }) => {
  if (!isOpen) return null;

  const handleDownload = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current, {
        scale: 2,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("chart.pdf");
    }
    onClose();
  };

  return (
    <div className="download-popup-overlay" onClick={onClose}>
      <div
        className="download-popup-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="icon">
          <DocumentIcon />
        </div>
        <h2>Download Report</h2>
        <div className="popup-body">
          <div className="select-wrapper">
            <select>
              <option>PDF</option>
              <option>CSV</option>
            </select>
            <CaretDownIcon className="caret-icon" />
          </div>
          <div className="popup-actions">
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="download-btn" onClick={handleDownload}>
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPopup;
