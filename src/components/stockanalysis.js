import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StockAnalysis.css";

const StockAnalysis = () => {
  const navigate = useNavigate();
  const [stockSymbol, setStockSymbol] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");

  // Dummy analysis function (replace with real API later)
  const handleAnalyze = () => {
    if (!stockSymbol.trim()) {
      alert("Please enter a stock symbol.");
      return;
    }
    setAnalysisResult(`Analysis for ${stockSymbol.toUpperCase()}: Trend is bullish 📈`);
  };

  // 🔹 Top-bar navigation handlers (same as InitialScreen)
  const handleAnalyzeNews = () => navigate("/analyzer");      // StockNewsAnalyzer
  const handleChat = () => navigate("/");                    // InitialScreen
  const handleAnalyzeStock = () => navigate("/stock-trends"); // Current page

  return (
    <div className="stock-analysis">
      {/* Top Bar */}
      {/* 🔹 Top Bar */}
      <div className="top-bar">
        <h1 className="brand-name">News2Trade</h1>

        <div className="top-buttons">
          <button onClick={handleAnalyzeNews}>Analyse News with AI</button>
          <button onClick={handleChat}>FinAI Assistant</button>
          <button onClick={handleAnalyzeStock}>Analyze Stock Trends</button>
        </div>
      </div>

      {/* 🔹 Inline CSS */}
      <style>
        {`
  .top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 05px 30px;
    background: linear-gradient(90deg, #0a0f1a, #313843ff, #444e62ff); /* subtle dark gradient for stock theme */
    box-shadow: 0 4px 14px rgba(0,0,0,0.6);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .brand-name {
    font-size: 50px; /* increased size */
    font-weight: 900;
    background: linear-gradient(90deg, #ff6f3c, #ff3e3e); /* warm gradient to stand out */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 2px;
    text-shadow: 0 3px 8px rgba(0,0,0,0.8); /* glow for prominence */
  }

  .top-buttons {
    display: flex;
    gap: 20px;
  }

  .top-buttons button {
    padding: 10px 24px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.2);
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
    transition: all 0.3s ease;
    background: linear-gradient(135deg, #1e293b, #111827); /* muted dark gradient */
    color: #f9fafb; 
    box-shadow: 0 2px 8px rgba(0,0,0,0.6);
  }

  .top-buttons button:hover {
    background: linear-gradient(135deg, #374151, #1f2937); /* subtle hover */
    box-shadow: 0 4px 12px rgba(0,0,0,0.7);
  }

  @media (max-width: 768px) {
    .top-bar {
      flex-direction: column;
      align-items: flex-start;
      padding: 16px 20px;
    }
    .top-buttons {
      margin-top: 14px;
      width: 100%;
      justify-content: space-between;
    }
    .top-buttons button {
      flex: 1;
      text-align: center;
    }
  }
`}
      </style>


      {/* Analysis Container */}
      <div className="analysis-container">
        <h2>Stock Trend Analysis</h2>
        <input
          type="text"
          placeholder="Enter stock symbol (e.g., AAPL)"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value)}
        />
        <button onClick={handleAnalyze}>Analyze</button>

        {analysisResult && (
          <div className="analysis-result">
            <p>{analysisResult}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockAnalysis;
