// Card 
import React, { useState, useRef } from 'react';
import ExpandIcon from '../../assets/svg/ExpandIcon';
import UnionIcon from '../../assets/svg/UnionIcon';
import DropdownMenu from './DropdownMenu';
import Modal from './Modal';

const Card = ({ title, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [chartType, setChartType] = useState('Bar Chart');
  const chartRef = useRef(null);

  const handleExpandClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleChartTypeChange = (type) => {
    setChartType(type);
    setIsDropdownOpen(false);
  };

  return (
    <div className={`card ${isChecked ? 'checked' : ''}`}>
      <div className="card-header" style={{ position: 'relative' }}>
        <div className="card-title">
          <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
          <p className='title-10'>{title}</p>
        </div>
        <div className="options-btn">
          <button onClick={toggleDropdown}>
            <UnionIcon />
          </button>
        </div>
        {isDropdownOpen && (
          <div className="dropdown-container">
            <DropdownMenu 
              chartRef={chartRef} 
              onChartTypeChange={handleChartTypeChange}
              currentChartType={chartType}
            />
          </div>
        )}
      </div>
      <div className="card-content" ref={chartRef}>
        {React.cloneElement(children, { chartType })}
        <div className="expand-icon" onClick={handleExpandClick}>
          <ExpandIcon />
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={title}>
        {React.cloneElement(children, { chartType })}
      </Modal>
    </div>
  );
};

export default Card;
