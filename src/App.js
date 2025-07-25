// src/App.js
import React, { useState } from 'react';
import StockSelector from './components/StockSelector';

function App() {
  const [selected, setSelected] = useState(null);

  const handleStockSelect = (option) => {
    console.log('Selected:', option);
    setSelected(option);
    // You can now send this to the backend via fetch/axios
  };

  return (
    <div className="App">
      <h1>Select a Stock or Crypto</h1>
      <StockSelector onSelect={handleStockSelect} />
      {selected && (
        <div style={{ marginTop: '20px' }}>
          <strong>You selected:</strong> {selected.label}
        </div>
      )}
    </div>
  );
}

export default App;
