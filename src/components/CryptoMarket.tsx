import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Search, ChevronLeft, ChevronRight, ArrowUpDown, Star } from 'lucide-react';
import { fetchWithRetry, requestQueue } from '../utils/api';
import { formatMarketCap } from '../utils/helpers';
import MarketStats from './MarketStats';
import FearGreedIndex from './FearGreedIndex';
import CryptoCalculator from './CryptoCalculator';

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
}

type ViewMode = 'all' | 'gainers' | 'losers' | 'watchlist';
type SortOption = 'rank' | 'name' | 'price' | 'change' | 'marketCap';
type SortDirection = 'asc' | 'desc';

export default function CryptoMarket() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('rank');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('cryptoWatchlist');
    return saved ? JSON.parse(saved) : [];
  });

  const coinsPerPage = 10;

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const response = await requestQueue.add(() =>
          fetchWithRetry(
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&sparkline=false'
          )
        );

        const data = await response.json();
        setCoins(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching market data:', err);
        setError('Failed to load market data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  useEffect(() => {
    localStorage.setItem('cryptoWatchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleWatchlist = (coinId: string) => {
    setWatchlist(prev => {
      if (prev.includes(coinId)) {
        return prev.filter(id => id !== coinId);
      }
      return [...prev, coinId];
    });
  };

  const watchlistedCoins = coins.filter(coin => watchlist.includes(coin.id));

  const gainers = [...coins]
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 100);

  const losers = [...coins]
    .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
    .slice(0, 100);

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCoins = [...filteredCoins].sort((a, b) => {
    switch (sortBy) {
      case 'rank':
        return sortDirection === 'asc'
          ? a.market_cap_rank - b.market_cap_rank
          : b.market_cap_rank - a.market_cap_rank;
      case 'name':
        return sortDirection === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      case 'price':
        return sortDirection === 'asc'
          ? a.current_price - b.current_price
          : b.current_price - a.current_price;
      case 'change':
        return sortDirection === 'asc'
          ? a.price_change_percentage_24h - b.price_change_percentage_24h
          : b.price_change_percentage_24h - a.price_change_percentage_24h;
      case 'marketCap':
        return sortDirection === 'asc'
          ? a.market_cap - b.market_cap
          : b.market_cap - a.market_cap;
      default:
        return 0;
    }
  });

  const displayedCoins = viewMode === 'all'
    ? sortedCoins
    : viewMode === 'gainers'
      ? gainers
      : viewMode === 'losers'
        ? losers
        : watchlistedCoins;

  const totalPages = Math.ceil(displayedCoins.length / coinsPerPage);
  const paginatedCoins = displayedCoins.slice(
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

  const handleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortDirection('asc');
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
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

          <MarketStats />
          <FearGreedIndex />

          <div className="mt-12">
            {/* View Mode Tabs */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 p-1 rounded-lg inline-flex">
                {(['all', 'gainers', 'losers', 'watchlist'] as ViewMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      setViewMode(mode);
                      setCurrentPage(0);
                    }}
                    className={`px-6 py-2 rounded-md text-sm font-medium ${
                      viewMode === mode
                        ? 'bg-white text-gray-900 shadow'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {mode === 'all'
                      ? 'All Coins'
                      : mode === 'gainers'
                        ? 'Top Gainers'
                        : mode === 'losers'
                          ? 'Top Losers'
                          : 'Watchlist'}
                  </button>
                ))}
              </div>
            </div>

            {/* Search and Sort */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for coins or symbol..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value as SortOption)}
                  className="border border-gray-300 rounded-lg py-2 pl-3 pr-10 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="rank">Rank</option>
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="change">24h Change</option>
                  <option value="marketCap">Market Cap</option>
                </select>
                <button
                  onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ArrowUpDown className={`h-5 w-5 text-gray-500 transform ${
                    sortDirection === 'desc' ? 'rotate-180' : ''
                  }`} />
                </button>
              </div>
            </div>

            {/* Watchlist Empty State */}
            {viewMode === 'watchlist' && watchlistedCoins.length === 0 && (
              <div className="text-center py-16">
                <img
                  src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80"
                  alt="Empty Watchlist"
                  className="w-64 h-64 object-cover rounded-full mx-auto mb-8"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Cryptocurrencies Watchlisted</h3>
                <p className="text-gray-500">
                  Click the star icon next to any cryptocurrency to add it to your watchlist
                </p>
              </div>
            )}

            {/* Coin List */}
            {(viewMode !== 'watchlist' || watchlistedCoins.length > 0) && (
              <div className="bg-white overflow-hidden shadow-lg rounded-lg">
                <div className="min-w-full divide-y divide-gray-200">
                  <div className="bg-gray-50 px-6 py-3">
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</div>
                      <div className="col-span-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</div>
                      <div className="col-span-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</div>
                      <div className="col-span-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">24h Change</div>
                      <div className="col-span-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Market Cap</div>
                      <div className="col-span-1 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Watch</div>
                    </div>
                  </div>

                  <div className="bg-white divide-y divide-gray-200">
                    {paginatedCoins.map((coin) => (
                      <div key={coin.id} className="hover:bg-gray-50 transition-colors">
                        <div className="px-6 py-4">
                          <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-1">
                              <span className="text-sm text-gray-600">#{coin.market_cap_rank}</span>
                            </div>
                            <Link
                              to={`/coin/${coin.id}`}
                              className="col-span-4"
                            >
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
                            </Link>
                            <div className="col-span-2 text-right">
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
                            <div className="col-span-2 text-right">
                              <div className="text-sm text-gray-900">
                                {formatMarketCap(coin.market_cap)}
                              </div>
                            </div>
                            <div className="col-span-1 text-right">
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  toggleWatchlist(coin.id);
                                }}
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                              >
                                <Star
                                  className={`h-5 w-5 ${
                                    watchlist.includes(coin.id)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-400'
                                  }`}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Pagination */}
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
                    onClick={() => setCurrentPage(index)}
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
      <CryptoCalculator />
    </>
  );
}