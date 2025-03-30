// Filter
import React, { useState } from "react";
import ToggleFilterButtons from "./ToggleFilterButtons";
import FilterIcon from "../../assets/svg/FilterIcon";
import SquaresFourIcon from "../../assets/svg/SquaresFourIcon";
import FilterSidebar from "./FilterSidebar";

const Filter = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="filters">
      <ToggleFilterButtons />
      <button className="filter-btn">
        <i className="filter-icon">
          <SquaresFourIcon />
        </i>
        <span>Widgets</span>
      </button>
      <button className="filter-btn" onClick={toggleSidebar}>
        <i className="filter-icon">
          <FilterIcon />
        </i>
        <span>Filter</span>
      </button>
      <FilterSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </div>
  );
};

export default Filter;