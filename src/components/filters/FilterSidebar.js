// FilterSidebar
import React from 'react';
import CloseButtonIcon from '../../assets/svg/CloseButtonIcon';

const FilterSidebar = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="filter-sidebar">
      <div className="sidebar-header">
        <h2>Filters</h2>
        <button className="close-btn" onClick={onClose}>
          <CloseButtonIcon fill={"#999999"} />
        </button>
      </div>
      <div className="sidebar-content">
        <div className="filter-section">
          <h3>
            Location
            <button className="clear-btn">Clear</button>
          </h3>
          <input type="text" placeholder="Search" className="search-input" />
          <div className="checkbox-group">
            <label><input type="checkbox" /> Select All</label>
            <label><input type="checkbox" /> Gujarat</label>
            <label className="nested"><input type="checkbox" /> Ahmedabad</label>
            <label className="nested"><input type="checkbox" /> Surat</label>
            <label><input type="checkbox" /> Rajasthan</label>
            <label className="nested"><input type="checkbox" /> Jaipur</label>
            <label className="nested"><input type="checkbox" /> Udaipur</label>
            <label className="nested"><input type="checkbox" /> Sikra</label>
          </div>
        </div>
        <div className="filter-section">
          <h3>
            Date Range
            <button className="clear-btn">Clear</button>
          </h3>
          <div className="radio-group">
            <label><input type="radio" name="date" /> Last 7 Days</label>
            <label><input type="radio" name="date" /> Last 30 Days</label>
            <label><input type="radio" name="date" /> Last 3 Months</label>
            <label><input type="radio" name="date" /> Custom Date Range</label>
            <div className="date-inputs">
              <input type="date" />
              <span>to</span>
              <input type="date" />
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar-footer">
        <button className="reset-btn">Reset</button>
        <button className="apply-btn">Apply</button>
      </div>
    </div>
  );
};

export default FilterSidebar;