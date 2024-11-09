import React, { useState } from 'react';

export function Tabs({ children, defaultValue }) {
  const [selectedTab, setSelectedTab] = useState(defaultValue);

  return (
    <div>
      <div className="border-b">{children}</div>
      <div className="mt-4">
        {React.Children.map(children, (child) => {
          if (child.props.value === selectedTab) {
            return child.props.children;
          }
          return null;
        })}
      </div>
    </div>
  );
}

export function TabsList({ children }) {
  return <div className="flex space-x-4">{children}</div>;
}

export function TabsTrigger({ value, children, onClick }) {
  return (
    <button
      onClick={() => onClick(value)}
      className="px-4 py-2 font-semibold text-sm text-gray-700 hover:text-[#4A6741] focus:outline-none"
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }) {
  return <div className="space-y-4">{children}</div>;
}
