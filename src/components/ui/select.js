import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';

// Custom Select component
const CustomSelect = ({ label, options, value, onChange, placeholder }) => {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full py-2 pl-3 pr-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A6741] focus:border-[#4A6741]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="border border-[#E0C097] rounded-lg shadow-lg bg-white mt-1">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value} className="p-2 hover:bg-[#F0F0F0]">
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

// Export the custom wrapper and the original Radix components
export { CustomSelect, Select, SelectContent, SelectItem, SelectTrigger, SelectValue };
