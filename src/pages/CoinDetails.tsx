import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Globe, Twitter, MessageCircle, ArrowLeft } from 'lucide-react';
import { fetchWithRetry, requestQueue } from '../utils/api';
import { formatMarketCap } from '../utils/helpers';
import CandlestickChart from '../components/CandlestickChart';

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  description: { en: string };
  image: { large: string };
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    total_volume: { usd: number };
    price_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
  };
  links: {
    homepage: string[];
    twitter_screen_name: string;
    telegram_channel_identifier: string;
  };
}

export default function CoinDetails() {
  const { id } = useParams<{ id: string }>();
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchCoinData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const response = await requestQueue.add(() =>
          fetchWithRetry(
            `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
          )
        );

        const data = await response.json();
        
        if (mounted) {
          setCoinData(data);
        }
      } catch (err) {
        console.error('Error fetching coin data:', err);
        if (mounted) {
          setError('Failed to load coin data. Please try again.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchCoinData();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-8"></div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="h-12 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !coinData) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/"
            className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-8"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Market
          </Link>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-red-600 mb-4">{error || 'Failed to load coin data'}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/"
          className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Market
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-8">
            <img 
              src={coinData.image.large} 
              alt={coinData.name} 
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {coinData.name} ({coinData.symbol.toUpperCase()})
              </h1>
              <div className="mt-2 flex items-center space-x-4">
                {coinData.links.homepage[0] && (
                  <a
                    href={coinData.links.homepage[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-700 flex items-center"
                  >
                    <Globe className="h-5 w-5 mr-1" />
                    Website
                  </a>
                )}
                {coinData.links.twitter_screen_name && (
                  <a
                    href={`https://twitter.com/${coinData.links.twitter_screen_name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-700 flex items-center"
                  >
                    <Twitter className="h-5 w-5 mr-1" />
                    Twitter
                  </a>
                )}
                {coinData.links.telegram_channel_identifier && (
                  <a
                    href={`https://t.me/${coinData.links.telegram_channel_identifier}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-700 flex items-center"
                  >
                    <MessageCircle className="h-5 w-5 mr-1" />
                    Telegram
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Price</h3>
              <div className="mt-1 flex items-center">
                <span className="text-2xl font-bold">
                  ${coinData.market_data.current_price.usd.toLocaleString()}
                </span>
                <span className={`ml-2 flex items-center ${
                  coinData.market_data.price_change_percentage_24h >= 0
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  {coinData.market_data.price_change_percentage_24h >= 0 ? (
                    <TrendingUp className="h-5 w-5 mr-1" />
                  ) : (
                    <TrendingDown className="h-5 w-5 mr-1" />
                  )}
                  {Math.abs(coinData.market_data.price_change_percentage_24h).toFixed(2)}%
                </span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Market Cap</h3>
              <p className="mt-1 text-2xl font-bold">
                {formatMarketCap(coinData.market_data.market_cap.usd)}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">24h Volume</h3>
              <p className="mt-1 text-2xl font-bold">
                {formatMarketCap(coinData.market_data.total_volume.usd)}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Circulating Supply</h3>
              <p className="mt-1 text-2xl font-bold">
                {coinData.market_data.circulating_supply.toLocaleString()} {coinData.symbol.toUpperCase()}
              </p>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">About {coinData.name}</h2>
            <div 
              dangerouslySetInnerHTML={{ __html: coinData.description.en }}
              className="text-gray-600"
            />
          </div>

          <CandlestickChart symbol={coinData.symbol} />
        </div>
      </div>
    </div>
  );
}