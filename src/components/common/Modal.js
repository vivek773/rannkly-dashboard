// Modal
import React, { useState, useRef } from "react";
import UnionIcon from "../../assets/svg/UnionIcon";
import ToggleFilterButtons from "../filters/ToggleFilterButtons";
import CloseButtonIcon from "../../assets/svg/CloseButtonIcon";
import DropdownMenu from "./DropdownMenu";

const Modal = ({ isOpen, onClose, title, children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [chartType, setChartType] = useState('Bar Chart');
  const chartRef = useRef(null);

  if (!isOpen) return null;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleChartTypeChange = (type) => {
    setChartType(type);
    setIsDropdownOpen(false);
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h2>{title}</h2>
          <div className="flex-center" style={{ position: 'relative' }}>
            <div className="popup-filters">
              <ToggleFilterButtons />
            </div>
            <button className="options-btn" onClick={toggleDropdown}>
              <UnionIcon />
            </button>
            {isDropdownOpen && (
              <DropdownMenu 
                chartRef={chartRef} 
                onChartTypeChange={handleChartTypeChange}
                currentChartType={chartType}
              />
            )}
          </div>
        </div>

        <div className="popup-inner-content" ref={chartRef}>
          {React.cloneElement(children, { chartType })}
        </div>
      </div>
      <button className="close-button" onClick={onClose}>
        <CloseButtonIcon />
      </button>
    </div>
  );
};

export default Modal;