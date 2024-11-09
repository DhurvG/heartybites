import React from 'react';

export function Table({ children }) {
  return <table className="min-w-full table-auto">{children}</table>;
}

export function TableHeader({ children }) {
  return <thead className="bg-gray-200">{children}</thead>;
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children }) {
  return <tr className="border-b">{children}</tr>;
}

export function TableHead({ children }) {
  return <th className="px-4 py-2 text-left text-sm font-semibold">{children}</th>;
}

export function TableCell({ children }) {
  return <td className="px-4 py-2 text-sm">{children}</td>;
}
