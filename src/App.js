import React from 'react';
import StockNewsAnalyzer from './components/StockSelector.js';
import './App.css'; // make sure it includes .background-video styling

function App() {
  return (
    <div>
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/animation.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <StockNewsAnalyzer />
    </div>
  );
}

export default App;
