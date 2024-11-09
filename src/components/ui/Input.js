import React from 'react';

function Input({ className = '', ...props }) {
  return (
    <input className={`border px-4 py-2 rounded-full focus:outline-none ${className}`} {...props} />
  );
}

export default Input;
