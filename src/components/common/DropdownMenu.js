// DropdownMenu
import React, { useState } from "react";
import AnalyticsIcon from "../../assets/svg/AnalyticsIcon";
import DownloadPopup from "./DownloadPopup";
import CheckIcon from "../../assets/svg/checkIcon";
import DownloadIcon from "../../assets/svg/downloadIcon";

const DropdownMenu = ({ chartRef, onChartTypeChange, currentChartType }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleDownloadClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSelect = (chart) => {
    onChartTypeChange(chart);
  };

  return (
    <div>
      <div className="dropdown-menu">
        <div className="dropdown-item">
          <AnalyticsIcon />
          <span>Chart Type</span>
        </div>
        {["Bar Chart", "Line Chart", "Pie Chart"].map((chart) => (
          <div
            key={chart}
            className={`dropdown-item ${
              currentChartType === chart ? "active" : ""
            }`}
            onClick={() => handleSelect(chart)}
          >
            <span>{chart}</span>
            {currentChartType === chart && <CheckIcon className="checkmark" />}
          </div>
        ))}
        <div className="dropdown-item" onClick={handleDownloadClick}>
          <DownloadIcon />
          <span>Download</span>
        </div>
      </div>
      <DownloadPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        chartRef={chartRef}
      />
    </div>
  );
};

export default DropdownMenu;