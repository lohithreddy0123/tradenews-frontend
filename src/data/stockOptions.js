const stockOptions = {
  stocks: [
    { value: 'RELIANCE', label: 'Reliance Industries', keywords: ['Reliance', 'RIL', 'Mukesh Ambani'] },
    { value: 'TCS', label: 'Tata Consultancy Services (TCS)', keywords: ['TCS', 'Tata Consultancy', 'Tata Group'] },
    { value: 'HDFCBANK', label: 'HDFC Bank', keywords: ['HDFC Bank', 'HDFC'] },
    { value: 'INFY', label: 'Infosys', keywords: ['Infosys', 'INFY'] },
    { value: 'HINDUNILVR', label: 'Hindustan Unilever', keywords: ['Hindustan Unilever', 'HUL'] },
    // Add more with similar structure...
  ],

  crypto: [
    { value: 'Bitcoin', label: 'Bitcoin (BTC)', keywords: ['Bitcoin', 'BTC', 'crypto'] },
    { value: 'Ethereum', label: 'Ethereum (ETH)', keywords: ['Ethereum', 'ETH', 'crypto'] },
    { value: 'Tether', label: 'Tether (USDT)', keywords: ['Tether', 'USDT', 'stablecoin'] },
    { value: 'XRP', label: 'Ripple (XRP)', keywords: ['Ripple', 'XRP'] },
    // Add more with similar structure...
  ],

  indices: [
    { value: 'NIFTY50', label: 'NIFTY 50 (India)', keywords: ['NIFTY 50', 'NSE', 'Indian markets'] },
    { value: 'SENSEX', label: 'SENSEX (BSE 30 - India)', keywords: ['SENSEX', 'BSE', 'Bombay Stock Exchange'] },
    { value: 'NASDAQ', label: 'NASDAQ Composite (USA)', keywords: ['NASDAQ', 'tech index', 'US markets'] },
    { value: 'SP500', label: 'S&P 500 (USA)', keywords: ['S&P 500', 'SP500', 'US economy'] },
    // Add more with similar structure...
  ]
};

export default stockOptions;
