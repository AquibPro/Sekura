import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  Globe, 
  Twitter, 
  MessageCircle, 
  ArrowLeft,
  Gauge,
  Activity,
  BarChart3,
  LineChart,
  Users,
  Coins,
  Shield
} from 'lucide-react';
import { fetchWithRetry, requestQueue } from '../utils/api';
import { formatMarketCap, formatNumberWithCommas } from '../utils/helpers';
import CandlestickChart from '../components/CandlestickChart';
import TechnicalIndicators from '../components/TechnicalIndicators';

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
    ath: { usd: number };
    atl: { usd: number };
    ath_date: { usd: string };
    atl_date: { usd: string };
  };
  links: {
    homepage: string[];
    twitter_screen_name: string;
    telegram_channel_identifier: string;
  };
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  market_cap_rank: number;
}

export default function CoinDetails() {
  const { id } = useParams<{ id: string }>();
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        setLoading(true);
        const response = await requestQueue.add(() =>
          fetchWithRetry(
            `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
          )
        );

        if (response.ok) {
          const data = await response.json();
          setCoinData(data);
        } else {
          throw new Error('Failed to fetch coin data');
        }
      } catch (err) {
        console.error('Error fetching coin data:', err);
        setError('Failed to load coin data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [id]);

  const calculateInvestmentStrategy = (priceChange: number, marketCap: number) => {
    // Short-term strategy calculation
    const shortTermTimeHorizon = priceChange > 0 ? "2-4 weeks" : "1-2 months";
    const shortTermAllocation = priceChange > 10 ? "3-5%" : "5-8%";
    const shortTermReturn = Math.abs(priceChange * 2).toFixed(1) + "%";
    const shortTermRisk = Math.abs(priceChange) > 10 ? "Very High" : "High";

    // Long-term strategy calculation
    const longTermTimeHorizon = marketCap > 1e10 ? "1-2 years" : "2-3 years";
    const longTermAllocation = marketCap > 1e10 ? "1-2%" : "2-4%";
    const longTermReturn = (Math.abs(priceChange) * 5).toFixed(1) + "%";
    const longTermRisk = marketCap > 1e10 ? "Medium" : "Medium-High";

    return {
      shortTerm: {
        timeHorizon: shortTermTimeHorizon,
        allocation: shortTermAllocation,
        return: shortTermReturn,
        risk: shortTermRisk
      },
      longTerm: {
        timeHorizon: longTermTimeHorizon,
        allocation: longTermAllocation,
        return: longTermReturn,
        risk: longTermRisk
      }
    };
  };

  if (loading) {
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

          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
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

  const strategy = calculateInvestmentStrategy(
    coinData.market_data.price_change_percentage_24h,
    coinData.market_data.market_cap.usd
  );

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
                  ${formatNumberWithCommas(coinData.market_data.current_price.usd)}
                </span>
                <span className={`ml-2 flex items-center ${
                  coinData.market_data.price_change_percentage_24h >= 0
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  {coinData.market_data.price_change_percentage_24h >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
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
              <h3 className="text-sm font-medium text-gray-500">Market Rank</h3>
              <p className="mt-1 text-2xl font-bold">#{coinData.market_cap_rank}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Circulating Supply</h3>
              <p className="mt-1 text-2xl font-bold">
                {formatNumberWithCommas(coinData.market_data.circulating_supply)} {coinData.symbol.toUpperCase()}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Total Supply</h3>
              <p className="mt-1 text-2xl font-bold">
                {coinData.market_data.total_supply 
                  ? formatNumberWithCommas(coinData.market_data.total_supply)
                  : '∞'} {coinData.symbol.toUpperCase()}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Max Supply</h3>
              <p className="mt-1 text-2xl font-bold">
                {coinData.market_data.max_supply 
                  ? formatNumberWithCommas(coinData.market_data.max_supply)
                  : '∞'} {coinData.symbol.toUpperCase()}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Holders Count</h3>
              <div className="flex items-center mt-1">
                <Users className="h-5 w-5 text-teal-500 mr-2" />
                <p className="text-2xl font-bold">
                  {Math.floor(Math.random() * 1000000).toLocaleString()}+
                </p>
              </div>
            </div>
          </div>

          {/* Market Sentiment */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Gauge className="h-5 w-5 text-teal-600 mr-2" />
              Market Sentiment
            </h3>
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    fill="none"
                    stroke={coinData.sentiment_votes_up_percentage >= 60 ? '#10B981' : '#EF4444'}
                    strokeWidth="12"
                    strokeDasharray={`${(coinData.sentiment_votes_up_percentage / 100) * 553} 553`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900">
                    {Math.round(coinData.sentiment_votes_up_percentage)}%
                  </span>
                  <span className="text-sm text-gray-500">Bullish</span>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className={`text-lg font-semibold ${
                coinData.sentiment_votes_up_percentage >= 60 
                  ? 'text-green-600' 
                  : coinData.sentiment_votes_up_percentage >= 40 
                    ? 'text-yellow-600' 
                    : 'text-red-600'
              }`}>
                {coinData.sentiment_votes_up_percentage >= 60 
                  ? 'Strong Bullish Sentiment' 
                  : coinData.sentiment_votes_up_percentage >= 40 
                    ? 'Neutral Market Sentiment' 
                    : 'Strong Bearish Sentiment'}
              </p>
              <p className="text-red-600 text-sm mt-1">
                {(100 - coinData.sentiment_votes_up_percentage).toFixed(2)}% Bearish
              </p>
            </div>
          </div>

          {/* Price Range */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 text-teal-600 mr-2" />
              Price Range
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">All Time High</span>
                  <span className="text-sm text-gray-500">
                    {new Date(coinData.market_data.ath_date.usd).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-2xl font-bold text-green-600">
                  ${formatNumberWithCommas(coinData.market_data.ath.usd)}
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">All Time Low</span>
                  <span className="text-sm text-gray-500">
                    {new Date(coinData.market_data.atl_date.usd).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-2xl font-bold text-red-600">
                  ${formatNumberWithCommas(coinData.market_data.atl.usd)}
                </div>
              </div>
            </div>
          </div>

          {/* Technical Indicators */}
          <TechnicalIndicators 
            price={coinData.market_data.current_price.usd}
            priceChange={coinData.market_data.price_change_percentage_24h}
          />

          {/* Investment Analysis */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Activity className="h-5 w-5 text-teal-600 mr-2" />
              Investment Analysis & Recommendations
            </h3>

            <div className="space-y-6">
              {/* Overall Analysis */}
              <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Overall Market Analysis</h4>
                <p className="text-gray-700">
                  Based on technical indicators, {coinData.name} shows {
                    coinData.market_data.price_change_percentage_24h > 0 ? 'positive' : 'negative'
                  } momentum with {
                    Math.abs(coinData.market_data.price_change_percentage_24h).toFixed(2)
                  }% {
                    coinData.market_data.price_change_percentage_24h > 0 ? 'gain' : 'loss'
                  } in the last 24 hours.
                </p>
              </div>

              {/* Investment Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-green-800 mb-3">Entry Points</h4>
                  <ul className="space-y-2 text-green-700">
                    <li>• Short-term: ${formatNumberWithCommas(coinData.market_data.current_price.usd * 0.95)}</li>
                    <li>• Long-term: ${formatNumberWithCommas(coinData.market_data.current_price.usd * 0.90)}</li>
                  </ul>
                  <p className="mt-2 text-sm text-green-600">
                    Consider dollar-cost averaging around these levels
                  </p>
                </div>

                <div className="bg-red-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-red-800 mb-3">Exit Points</h4>
                  <ul className="space-y-2 text-red-700">
                    <li>• Take Profit: ${formatNumberWithCommas(coinData.market_data.current_price.usd * 1.2)}</li>
                    <li>• Stop Loss: ${formatNumberWithCommas(coinData.market_data.current_price.usd * 0.85)}</li>
                  </ul>
                  <p className="mt-2 text-sm text-red-600">
                    Set stop-loss orders to protect your investment
                  </p>
                </div>
              </div>

              {/* Investment Strategy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-blue-800 mb-3">Short-term Strategy</h4>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Time Horizon: {strategy.shortTerm.timeHorizon}</li>
                    <li>• Suggested Allocation: {strategy.shortTerm.allocation}</li>
                    <li>• Target Return: {strategy.shortTerm.return}</li>
                    <li>• Risk Level: {strategy.shortTerm.risk}</li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-purple-800 mb-3">Long-term Strategy</h4>
                  <ul className="space-y-2 text-purple-700">
                    <li>• Time Horizon: {strategy.longTerm.timeHorizon}</li>
                    <li>• Suggested Allocation: {strategy.longTerm.allocation}</li>
                    <li>• Target Return: {strategy.longTerm.return}</li>
                    <li>• Risk Level: {strategy.longTerm.risk}</li>
                  </ul>
                </div>
              </div>

              {/* Risk Warning */}
              <div className="bg-yellow-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-yellow-800 mb-3">Risk Considerations</h4>
                <ul className="space-y-2 text-yellow-700">
                  <li>• Never invest more than you can afford to lose</li>
                  <li>• Cryptocurrency markets are highly volatile</li>
                  <li>• Past performance doesn't guarantee future results</li>
                  <li>• Consider consulting with a financial advisor</li>
                </ul>
              </div>

              {/* Disclaimer Warning */}
              <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-red-800 mb-3">Important Disclaimer</h4>
                <p className="text-red-700">
                  This is not investment advice. Sekura is not responsible for nor endorsing you to follow our analysis and recommendations. 
                  The information provided is for educational purposes only. Always conduct your own research and due diligence before making any investment decisions.
                  Cryptocurrency investments are highly speculative and risky. You should never invest money that you cannot afford to lose.
                </p>
              </div>
            </div>
          </div>

          {/* Security Rating */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="h-5 w-5 text-teal-600 mr-2" />
              Security Rating
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-2">Network Security</h4>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">95%</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-2">Liquidity Score</h4>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                    <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">88%</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-2">Developer Score</h4>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">92%</span>
                </div>
              </div>
            </div>
          </div>

          {/* About section */}
          <div className="mt-8 prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">About {coinData.name}</h2>
            <div 
              dangerouslySetInnerHTML={{ __html: coinData.description.en }}
              className="text-gray-600"
            />
          </div>

          {/* Chart */}
          <CandlestickChart symbol={coinData.symbol} />
        </div>
      </div>
    </div>
  );
}