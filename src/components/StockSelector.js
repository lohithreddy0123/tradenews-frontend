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
    console.log("🔌 Attempting to connect WebSocket...");

    wsRef.current = new WebSocket('ws://127.0.0.1:8000/ws/news/');

    wsRef.current.onopen = () => {
      console.log('✅ WebSocket connected');

      if (selectedStock) {
        const symbol = selectedStock.value?.toUpperCase();
        const keywords = selectedStock.keywords || [selectedStock.label];

        if (!symbol) {
          console.warn('⚠️ Missing stock symbol!');
          return;
        }

        console.log('📤 Sending stock to backend:', { symbol, keywords });

        wsRef.current.send(
          JSON.stringify({ action: 'start', symbol, keywords })
        );
      } else {
        console.warn('⚠️ No stock selected!');
      }
    };

    wsRef.current.onmessage = (event) => {
      console.log("📥 Message received from backend:", event.data);
      const news = JSON.parse(event.data);
      setNewsSummaries((prev) => [news, ...prev]);
    };

    wsRef.current.onerror = (error) => {
      console.error('❌ WebSocket error:', error);
    };

    wsRef.current.onclose = () => {
      console.log('🔌 WebSocket closed');
    };
  };

  const handleAnalyze = () => {
    if (!selectedStock) {
      console.warn("⚠️ No stock selected when Analyze was clicked");
      return;
    }

    console.log("🔍 Analyze clicked for:", selectedStock.label);
    setLoading(true);

    const initialDemoNews = {
      headline: '🔍 Initial Analysis Started',
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
    console.log("⛔ Ending analysis");
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
        <h1 className="heading">📊 AI News Analyzer</h1>
        {loading && (
          <button className="end-btn" onClick={handleEndAnalysis}>
            ❌ End Analysis
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
          🔍 Analyze
        </button>
      )}

      {selectedStock && (
        <h2 className="news-heading">
          📰 Analyzing News for: <span>{selectedStock.label}</span>
          {loading && <span className="spinner" />}
        </h2>
      )}

      {loading && <div className="loader">⏳ Live analysis in progress...</div>}

      <div className="news-blocks">
        {newsSummaries.map((news, idx) => (
          <div key={idx} className={`news-card ${news.sentiment}`}>
            <h3>{news.headline}</h3>
            <p className="news-summary">{news.summary}</p>
            <p className="trader-advice">
              <strong>💡 Trader Advice:</strong> {news.traderAdvice}
            </p>
            <div className="news-info-grid">
              <div>📌 Impact: {news.impact}</div>
              <div>📈 Direction: {news.direction}</div>
              <div>⏰ Time: {new Date(news.time).toLocaleString()}</div>
              <div>📡 Source: {news.source}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockNewsAnalyzer;
