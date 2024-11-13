import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatMarketCap } from '../utils/helpers';

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

export default function CryptoMarket() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const coinsPerPage = 10;

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch coins');
        }

        const data = await response.json();
        setCoins(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching coins:', err);
        setError('Failed to load market data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  const totalPages = Math.ceil(coins.length / coinsPerPage);
  const displayedCoins = coins.slice(
    currentPage * coinsPerPage,
    (currentPage + 1) * coinsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Cryptocurrency Market
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Loading market data...
            </p>
          </div>
          <div className="mt-12">
            <div className="bg-white overflow-hidden shadow-lg rounded-lg">
              <div className="animate-pulse">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Cryptocurrency Market
            </h2>
            <div className="mt-8">
              <p className="text-red-600">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Cryptocurrency Market
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Live prices and market cap rankings
          </p>
        </div>

        <div className="mt-12">
          <div className="bg-white overflow-hidden shadow-lg rounded-lg">
            <div className="min-w-full divide-y divide-gray-200">
              <div className="bg-gray-50 px-6 py-3">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</div>
                  <div className="col-span-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</div>
                  <div className="col-span-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">24h Change</div>
                  <div className="col-span-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Market Cap</div>
                </div>
              </div>

              <div className="bg-white divide-y divide-gray-200">
                {displayedCoins.map((coin) => (
                  <Link
                    key={coin.id}
                    to={`/coin/${coin.id}`}
                    className="block hover:bg-gray-50 transition-colors"
                  >
                    <div className="px-6 py-4">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-4">
                          <div className="flex items-center">
                            <img
                              src={coin.image}
                              alt={coin.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {coin.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {coin.symbol.toUpperCase()}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-3 text-right">
                          <div className="text-sm font-semibold text-gray-900">
                            ${coin.current_price.toLocaleString()}
                          </div>
                        </div>
                        <div className="col-span-2 text-right">
                          <div className={`inline-flex items-center text-sm font-semibold ${
                            coin.price_change_percentage_24h >= 0
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}>
                            {coin.price_change_percentage_24h >= 0 ? (
                              <TrendingUp className="h-4 w-4 mr-1" />
                            ) : (
                              <TrendingDown className="h-4 w-4 mr-1" />
                            )}
                            {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                          </div>
                        </div>
                        <div className="col-span-3 text-right">
                          <div className="text-sm text-gray-900">
                            {formatMarketCap(coin.market_cap)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center space-x-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`p-2 rounded-full ${
                currentPage === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-teal-600 hover:bg-teal-100'
              }`}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="flex space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                    currentPage === index ? 'bg-teal-600' : 'bg-teal-200 hover:bg-teal-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              className={`p-2 rounded-full ${
                currentPage === totalPages - 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-teal-600 hover:bg-teal-100'
              }`}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}