const stockOptions = {
  stocks: [
    { value: 'AAPL', label: 'Apple Inc.', keywords: ['Apple', 'AAPL', 'iPhone', 'Tim Cook'] },
    { value: 'MSFT', label: 'Microsoft Corp.', keywords: ['Microsoft', 'MSFT', 'Satya Nadella'] },
    { value: 'GOOGL', label: 'Alphabet Inc. (Google)', keywords: ['Google', 'Alphabet', 'GOOGL', 'Sundar Pichai'] },
    { value: 'INFY', label: 'Infosys (ADR)', keywords: ['Infosys', 'INFY'] },
    { value: 'HDB', label: 'HDFC Bank (ADR)', keywords: ['HDFC Bank', 'HDFC', 'HDB'] },
    { value: 'RELIANCE.NS', label: 'Reliance Industries (NSE)', keywords: ['Reliance', 'RIL', 'Mukesh Ambani'] },
  ],

  crypto: [
    { value: 'COIN', label: 'Coinbase (BTC Proxy)', keywords: ['Bitcoin', 'BTC', 'crypto'] },
    { value: 'MSTR', label: 'MicroStrategy (BTC Proxy)', keywords: ['Bitcoin', 'MSTR', 'Michael Saylor'] },
    { value: 'RIOT', label: 'Riot Platforms (Mining)', keywords: ['Riot', 'Bitcoin Mining'] },
    { value: 'ETH.X', label: 'Ethereum Tracker', keywords: ['Ethereum', 'ETH', 'crypto'] },
  ],

  indices: [
    { value: 'INDY', label: 'NIFTY 50 (India Proxy)', keywords: ['NIFTY 50', 'NSE', 'Indian markets'] },
    { value: 'INDA', label: 'SENSEX (India Proxy)', keywords: ['SENSEX', 'BSE', 'Bombay Stock Exchange'] },
    { value: 'QQQ', label: 'NASDAQ Composite (USA)', keywords: ['NASDAQ', 'tech stocks', 'US markets'] },
    { value: 'SPY', label: 'S&P 500 (USA)', keywords: ['S&P 500', 'SP500', 'US economy'] },
  ]
};

export default stockOptions;
