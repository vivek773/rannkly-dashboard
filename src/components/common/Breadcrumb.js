// Breadcrumb.js
import React from 'react';

const Breadcrumb = ({ items }) => {
  return (
    <div className="breadcrumb">
      {items.map((item, index) => (
        <span key={index}>
          {item}
          {index < items.length - 1 && ' / '}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;