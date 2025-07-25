import React, { useState, useRef, useEffect } from 'react';
import stockOptions from '../data/stockOptions';
import Select from 'react-select';
import './StockNewsAnalyzer.css';

const StockNewsAnalyzer = () => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newsSummaries, setNewsSummaries] = useState([]);
  const wsRef = useRef(null);

  const startWebSocket = () => {
    console.log("\ud83d\udd0c Attempting to connect WebSocket...");

    wsRef.current = new WebSocket('ws://127.0.0.1:8000/ws/news/');

    wsRef.current.onopen = () => {
      console.log('\u2705 WebSocket connected');
      if (selectedStock && selectedStock.label) {
        const keywords = selectedStock.keywords || [selectedStock.label];
        console.log('\ud83d\udce4 Sending stock to backend:', keywords);
        wsRef.current.send(JSON.stringify({ action: 'start', keywords }));
      } else {
        console.warn('\u26a0\ufe0f No stock selected or missing label!');
      }
    };

    wsRef.current.onmessage = (event) => {
      console.log("\ud83d\udce5 Message received from backend:", event.data);
      const news = JSON.parse(event.data);
      setNewsSummaries((prev) => [news, ...prev]);
    };

    wsRef.current.onerror = (error) => {
      console.error('\u274c WebSocket error:', error);
    };

    wsRef.current.onclose = () => {
      console.log('\ud83d\udd0c WebSocket closed');
    };
  };

  const handleAnalyze = () => {
    if (!selectedStock) {
      console.warn("\u26a0\ufe0f No stock selected when Analyze was clicked");
      return;
    }

    console.log("\ud83d\udd0d Analyze clicked for:", selectedStock.label);
    setLoading(true);

    const initialDemoNews = {
      headline: '\ud83d\udd0d Initial Analysis Started',
      impact: 'Low',
      direction: 'Sideways',
      summary: 'Waiting for live news updates from backend...',
      sentiment: 'neutral',
      source: 'System',
      time: new Date().toISOString(),
      traderAdvice: 'Please wait while the backend processes news for you.',
    };

    setNewsSummaries([initialDemoNews]);

    startWebSocket();
  };

  const handleEndAnalysis = () => {
    console.log("\u26d4 Ending analysis");
    setLoading(false);
    setNewsSummaries([]);
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return (
    <div className="analyzer-container">
      <div className="header">
        <h1 className="heading">\ud83d\udcca AI News Analyzer</h1>
        {loading && (
          <button className="end-btn" onClick={handleEndAnalysis}>
            \u274c End Analysis
          </button>
        )}
      </div>

      <div className="selector-section">
        <label>Select Stock/Crypto/Index:</label>
        <Select
          options={[
            { label: 'Stocks', options: stockOptions.stocks },
            { label: 'Crypto', options: stockOptions.crypto },
            { label: 'Indices', options: stockOptions.indices },
          ]}
          value={selectedStock}
          onChange={setSelectedStock}
          placeholder="Search and select..."
          isDisabled={loading}
        />
      </div>

      {selectedStock && !loading && (
        <button className="analyze-btn" onClick={handleAnalyze}>
          \ud83d\udd0d Analyze
        </button>
      )}

      {selectedStock && (
        <h2 className="news-heading">
          \ud83d\udcf0 Analyzing News for: <span>{selectedStock.label}</span>
          {loading && <span className="spinner" />}
        </h2>
      )}

      {loading && <div className="loader">\u23f3 Live analysis in progress...</div>}

      <div className="news-blocks">
        {newsSummaries.map((news, idx) => (
          <div key={idx} className={`news-card ${news.sentiment}`}>
            <h3>{news.headline}</h3>
            <p className="news-summary">{news.summary}</p>
            <p className="trader-advice">
              <strong>\ud83d\udca1 Trader Advice:</strong> {news.traderAdvice}
            </p>
            <div className="news-info-grid">
              <div>\ud83d\udccc Impact: {news.impact}</div>
              <div>\ud83d\udcc8 Direction: {news.direction}</div>
              <div>\u23f0 Time: {new Date(news.time).toLocaleString()}</div>
              <div>\ud83d\udce1 Source: {news.source}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockNewsAnalyzer;
