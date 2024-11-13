import React, { useEffect, useRef, useState } from 'react';

interface CandlestickChartProps {
  symbol: string;
}

declare global {
  interface Window {
    TradingView: any;
  }
}

export default function CandlestickChart({ symbol }: CandlestickChartProps) {
  const container = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTradingViewScript = () => {
      return new Promise<void>((resolve, reject) => {
        if (window.TradingView) {
          setScriptLoaded(true);
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        script.onload = () => {
          setScriptLoaded(true);
          resolve();
        };
        script.onerror = () => {
          setError('Failed to load chart. Please try again later.');
          reject();
        };
        document.head.appendChild(script);
      });
    };

    const initializeWidget = () => {
      if (container.current && window.TradingView) {
        try {
          new window.TradingView.widget({
            container_id: container.current.id,
            symbol: `BINANCE:${symbol.toUpperCase()}USDT`,
            interval: 'D',
            timezone: 'Etc/UTC',
            theme: 'light',
            style: '1',
            locale: 'en',
            toolbar_bg: '#f1f3f6',
            enable_publishing: false,
            hide_side_toolbar: false,
            allow_symbol_change: false,
            save_image: false,
            height: 500,
            width: '100%',
            studies: [
              "MASimple@tv-basicstudies",
              "RSI@tv-basicstudies"
            ],
          });
        } catch (err) {
          console.error('Error initializing TradingView widget:', err);
          setError('Failed to initialize chart. Please try again later.');
        }
      }
    };

    const initChart = async () => {
      try {
        await loadTradingViewScript();
        initializeWidget();
      } catch (err) {
        console.error('Error loading TradingView:', err);
        setError('Failed to load chart. Please try again later.');
      }
    };

    initChart();

    return () => {
      // Cleanup if needed
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, [symbol]);

  if (error) {
    return (
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Price Chart</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold mb-4">Price Chart</h2>
      {!scriptLoaded && (
        <div className="flex justify-center items-center h-[500px] bg-gray-50 rounded-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      )}
      <div 
        id={`tradingview_${symbol}`} 
        ref={container} 
        className={`rounded-lg overflow-hidden shadow-lg ${!scriptLoaded ? 'hidden' : ''}`}
      />
    </div>
  );
}