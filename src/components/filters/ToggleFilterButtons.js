// Toggle Butons
import React, { useState } from 'react';

const ToggleFilterButtons = () => {
  const [active, setActive] = useState('Monthly');

  return (
    <div className="toggle-buttons">
      {['Monthly', 'Quarterly', 'Yearly'].map((label) => (
        <button
          key={label}
          className={`toggle-button ${active === label ? 'active' : ''}`}
          onClick={() => setActive(label)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default ToggleFilterButtons;