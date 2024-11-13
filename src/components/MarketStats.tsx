import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { fetchWithRetry, requestQueue } from '../utils/api';
import { formatMarketCap } from '../utils/helpers';

interface GlobalData {
  total_market_cap: { usd: number };
  total_volume: { usd: number };
  market_cap_percentage: { [key: string]: number };
  market_cap_change_percentage_24h_usd: number;
}

export default function MarketStats() {
  const [globalData, setGlobalData] = useState<GlobalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await requestQueue.add(() =>
          fetchWithRetry(
            'https://api.coingecko.com/api/v3/global'
          )
        );

        const { data } = await response.json();
        setGlobalData(data);
      } catch (err) {
        console.error('Error fetching market data:', err);
        setError('Failed to load market data');
      } finally {
        setLoading(false);
      }
    };

    fetchGlobalData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return null; // Hide the section if there's an error to not disrupt the user experience
  }

  if (!globalData) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Market Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Total Market Cap</h3>
          <div className="mt-1 flex items-center">
            <span className="text-lg font-semibold">
              {formatMarketCap(globalData.total_market_cap.usd)}
            </span>
            <span className={`ml-2 flex items-center text-sm ${
              globalData.market_cap_change_percentage_24h_usd >= 0
                ? 'text-green-600'
                : 'text-red-600'
            }`}>
              {globalData.market_cap_change_percentage_24h_usd >= 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {Math.abs(globalData.market_cap_change_percentage_24h_usd).toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">24h Volume</h3>
          <p className="mt-1 text-lg font-semibold">
            {formatMarketCap(globalData.total_volume.usd)}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">BTC Dominance</h3>
          <p className="mt-1 text-lg font-semibold">
            {globalData.market_cap_percentage.btc.toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
}