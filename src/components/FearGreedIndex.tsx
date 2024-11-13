import React, { useState, useEffect } from 'react';
import { requestQueue } from '../utils/api';

interface FearGreedData {
  value: string;
  value_classification: string;
  timestamp: string;
  time_until_update: string;
}

export default function FearGreedIndex() {
  const [fearGreedIndex, setFearGreedIndex] = useState<FearGreedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFearGreedIndex = async () => {
      try {
        setLoading(true);
        const response = await requestQueue.add(() =>
          fetch('https://api.alternative.me/fng/')
        );

        if (!response.ok) {
          throw new Error('Failed to fetch fear and greed index');
        }

        const data = await response.json();
        setFearGreedIndex(data.data[0]);
        setError(null);
      } catch (err) {
        console.error('Error fetching fear and greed index:', err);
        setError('Unable to load market sentiment data');
      } finally {
        setLoading(false);
      }
    };

    fetchFearGreedIndex();
  }, []);

  const getFearGreedColor = (value: number) => {
    if (value >= 75) return 'bg-green-500';
    if (value >= 55) return 'bg-green-400';
    if (value >= 45) return 'bg-yellow-400';
    if (value >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const formatTimeUntilUpdate = (timeString: string) => {
    const seconds = parseInt(timeString);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  if (loading) {
    return (
      <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded-full"></div>
            <div className="h-8 bg-gray-200 rounded-full"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !fearGreedIndex) {
    return null;
  }

  const indexRanges = [
    { range: '0-24', label: 'Extreme Fear', color: 'bg-red-500' },
    { range: '25-44', label: 'Fear', color: 'bg-orange-500' },
    { range: '45-54', label: 'Neutral', color: 'bg-yellow-400' },
    { range: '55-74', label: 'Greed', color: 'bg-green-400' },
    { range: '75-100', label: 'Extreme Greed', color: 'bg-green-500' }
  ];

  return (
    <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Fear & Greed Index</h3>
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-red-500">Extreme Fear</span>
          <span className="text-sm font-medium text-green-500">Extreme Greed</span>
        </div>
        <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${getFearGreedColor(parseInt(fearGreedIndex.value))}`}
            style={{ width: `${fearGreedIndex.value}%` }}
          ></div>
        </div>
        <div className="mt-4 text-center">
          <span className="text-2xl font-bold text-gray-900">{fearGreedIndex.value}</span>
          <p className="text-lg font-medium text-gray-600 mt-1">
            {fearGreedIndex.value_classification}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {formatDate(fearGreedIndex.timestamp)}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Next update in: {formatTimeUntilUpdate(fearGreedIndex.time_until_update)}
          </p>
        </div>
        <div className="grid grid-cols-5 gap-2 mt-6">
          {indexRanges.map(({ range, label, color }) => (
            <div key={range} className="text-center group relative">
              <div className={`h-2 ${color} rounded-full mb-1`}></div>
              <span className="text-xs text-gray-600">{range}</span>
              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap transition-opacity duration-200">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}