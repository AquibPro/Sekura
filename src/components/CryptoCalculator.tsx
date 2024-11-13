import React, { useState, useEffect, useRef } from 'react';
import { ArrowDownUp, TrendingUp, TrendingDown, BarChart3, Clock, Search } from 'lucide-react';

interface Crypto {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

interface Fiat {
  code: string;
  name: string;
  symbol: string;
}

// Common fiat currencies with symbols
const commonFiats: Fiat[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
];

export default function CryptoCalculator() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<Crypto | null>(null);
  const [selectedFiat, setSelectedFiat] = useState<Fiat>(commonFiats[0]);
  const [cryptoAmount, setCryptoAmount] = useState('1');
  const [fiatAmount, setFiatAmount] = useState('');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [cryptoDropdownOpen, setCryptoDropdownOpen] = useState(false);
  const [fiatDropdownOpen, setFiatDropdownOpen] = useState(false);
  const [cryptoSearch, setCryptoSearch] = useState('');
  const [fiatSearch, setFiatSearch] = useState('');

  const cryptoDropdownRef = useRef<HTMLDivElement>(null);
  const fiatDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cryptoDropdownRef.current && !cryptoDropdownRef.current.contains(event.target as Node)) {
        setCryptoDropdownOpen(false);
      }
      if (fiatDropdownRef.current && !fiatDropdownRef.current.contains(event.target as Node)) {
        setFiatDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&sparkline=false'
        );

        if (!response.ok) throw new Error('Failed to fetch cryptocurrencies');

        const data = await response.json();
        setCryptos(data);

        // Set default crypto (Bitcoin)
        const bitcoin = data.find((coin: Crypto) => coin.id === 'bitcoin');
        if (bitcoin) {
          setSelectedCrypto(bitcoin);
          setExchangeRate(bitcoin.current_price);
          setFiatAmount((parseFloat(cryptoAmount) * bitcoin.current_price).toFixed(2));
          setLastUpdated(new Date().toLocaleTimeString());
        }
      } catch (err) {
        console.error('Error fetching cryptocurrencies:', err);
      }
    };

    fetchCryptos();
  }, []);

  const filteredCryptos = cryptos.filter(crypto =>
    crypto.name.toLowerCase().includes(cryptoSearch.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(cryptoSearch.toLowerCase())
  );

  const filteredFiats = commonFiats.filter(fiat =>
    fiat.name.toLowerCase().includes(fiatSearch.toLowerCase()) ||
    fiat.code.toLowerCase().includes(fiatSearch.toLowerCase())
  );

  const handleCryptoAmountChange = (value: string) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setCryptoAmount(value);
      if (exchangeRate) {
        setFiatAmount((parseFloat(value || '0') * exchangeRate).toFixed(2));
      }
    }
  };

  const handleFiatAmountChange = (value: string) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setFiatAmount(value);
      if (exchangeRate) {
        setCryptoAmount((parseFloat(value || '0') / exchangeRate).toFixed(8));
      }
    }
  };

  const handleCryptoSelect = (crypto: Crypto) => {
    setIsConverting(true);
    setSelectedCrypto(crypto);
    setExchangeRate(crypto.current_price);
    setFiatAmount((parseFloat(cryptoAmount) * crypto.current_price).toFixed(2));
    setLastUpdated(new Date().toLocaleTimeString());
    setCryptoDropdownOpen(false);
    setIsConverting(false);
  };

  const handleFiatSelect = (fiat: Fiat) => {
    if (selectedCrypto) {
      setIsConverting(true);
      setSelectedFiat(fiat);
      // For simplicity, we'll use a basic conversion rate for other currencies
      // In a production environment, you'd want to fetch real exchange rates
      const rate = selectedCrypto.current_price * (fiat.code === 'USD' ? 1 : 1.2);
      setExchangeRate(rate);
      setFiatAmount((parseFloat(cryptoAmount) * rate).toFixed(2));
      setLastUpdated(new Date().toLocaleTimeString());
      setFiatDropdownOpen(false);
      setIsConverting(false);
    }
  };

  return (
    <section className="py-20 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-12 text-center">
          Cryptocurrency Calculator
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-8 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Crypto Input */}
              <div className="relative" ref={cryptoDropdownRef}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cryptocurrency
                </label>
                <div className="relative">
                  <button
                    onClick={() => setCryptoDropdownOpen(!cryptoDropdownOpen)}
                    className="w-full flex items-center justify-between bg-white p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  >
                    {selectedCrypto ? (
                      <div className="flex items-center">
                        <img
                          src={selectedCrypto.image}
                          alt={selectedCrypto.name}
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <span>{selectedCrypto.name} ({selectedCrypto.symbol.toUpperCase()})</span>
                      </div>
                    ) : (
                      <span>Select cryptocurrency</span>
                    )}
                    <ArrowDownUp className="h-5 w-5 text-gray-400" />
                  </button>

                  {cryptoDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                      <div className="p-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            value={cryptoSearch}
                            onChange={(e) => setCryptoSearch(e.target.value)}
                            placeholder="Search cryptocurrencies..."
                            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>
                      </div>
                      <div className="max-h-60 overflow-auto">
                        {filteredCryptos.map((crypto) => (
                          <button
                            key={crypto.id}
                            onClick={() => handleCryptoSelect(crypto)}
                            className="w-full flex items-center px-4 py-2 hover:bg-gray-100"
                          >
                            <img
                              src={crypto.image}
                              alt={crypto.name}
                              className="w-6 h-6 rounded-full mr-2"
                            />
                            <span>{crypto.name} ({crypto.symbol.toUpperCase()})</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  value={cryptoAmount}
                  onChange={(e) => handleCryptoAmountChange(e.target.value)}
                  className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter amount"
                />
              </div>

              {/* Fiat Input */}
              <div className="relative" ref={fiatDropdownRef}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fiat Currency
                </label>
                <div className="relative">
                  <button
                    onClick={() => setFiatDropdownOpen(!fiatDropdownOpen)}
                    className="w-full flex items-center justify-between bg-white p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  >
                    {selectedFiat ? (
                      <span>{selectedFiat.name} ({selectedFiat.code})</span>
                    ) : (
                      <span>Select currency</span>
                    )}
                    <ArrowDownUp className="h-5 w-5 text-gray-400" />
                  </button>

                  {fiatDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                      <div className="p-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            value={fiatSearch}
                            onChange={(e) => setFiatSearch(e.target.value)}
                            placeholder="Search currencies..."
                            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>
                      </div>
                      <div className="max-h-60 overflow-auto">
                        {filteredFiats.map((fiat) => (
                          <button
                            key={fiat.code}
                            onClick={() => handleFiatSelect(fiat)}
                            className="w-full flex items-center px-4 py-2 hover:bg-gray-100"
                          >
                            <span>{fiat.name} ({fiat.code})</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  value={fiatAmount}
                  onChange={(e) => handleFiatAmountChange(e.target.value)}
                  className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter amount"
                />
              </div>
            </div>

            {isConverting && (
              <div className="mt-6">
                <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full animate-progress"></div>
                </div>
              </div>
            )}

            {exchangeRate && selectedCrypto && (
              <div className="mt-8 space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <BarChart3 className="h-6 w-6 text-teal-500 mr-2" />
                        <span className="text-sm text-gray-500">Exchange Rate</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">
                        1 {selectedCrypto.symbol.toUpperCase()} =
                      </p>
                      <p className="text-3xl font-bold text-teal-600">
                        {selectedFiat.symbol}{exchangeRate.toFixed(2)} {selectedFiat.code}
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        {selectedCrypto.price_change_percentage_24h >= 0 ? (
                          <TrendingUp className="h-6 w-6 text-green-500 mr-2" />
                        ) : (
                          <TrendingDown className="h-6 w-6 text-red-500 mr-2" />
                        )}
                        <span className="text-sm text-gray-500">24h Change</span>
                      </div>
                      <p className={`text-2xl font-bold ${
                        selectedCrypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {selectedCrypto.price_change_percentage_24h >= 0 ? '+' : ''}
                        {selectedCrypto.price_change_percentage_24h.toFixed(2)}%
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Clock className="h-6 w-6 text-teal-500 mr-2" />
                        <span className="text-sm text-gray-500">Last Updated</span>
                      </div>
                      <p className="text-lg text-gray-600">{lastUpdated}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Conversion Result</h3>
                    <div className="flex items-center justify-center space-x-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          {cryptoAmount} {selectedCrypto.symbol.toUpperCase()}
                        </p>
                      </div>
                      <ArrowDownUp className="h-6 w-6 text-teal-500" />
                      <div className="text-left">
                        <p className="text-2xl font-bold text-teal-600">
                          {selectedFiat.symbol}{fiatAmount} {selectedFiat.code}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}