import React from 'react';

function Card({ children, className = '' }) {
  return (
    <div className={`shadow-lg rounded-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export default Card;
