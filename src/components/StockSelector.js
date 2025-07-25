// src/components/StockSelector.jsx
import React from 'react';
import Select from 'react-select';
import stockOptions from '../data/stockOptions';

const groupedOptions = [
  {
    label: 'Indian Stocks',
    options: stockOptions.stocks,
  },
  {
    label: 'Cryptocurrencies',
    options: stockOptions.crypto,
  },
  {
    label: 'Indices',
    options: stockOptions.indices,
  },
];

export default function StockSelector({ onSelect }) {
  return (
    <div className="w-full max-w-md mx-auto my-6">
      <Select
        options={groupedOptions}
        onChange={onSelect}
        placeholder="Search and select a stock, crypto, or index..."
        isSearchable
      />
    </div>
  );
}
