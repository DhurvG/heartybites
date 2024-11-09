import React from 'react';

function Button({ children, className = '', ...props }) {
  return (
    <button className={`px-4 py-2 rounded-full text-white bg-black hover:bg-gray-800 ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
