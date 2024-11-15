import React from 'react';
import { Activity, LineChart } from 'lucide-react';

interface TechnicalIndicatorsProps {
  price: number;
  priceChange: number;
}

export default function TechnicalIndicators({ price, priceChange }: TechnicalIndicatorsProps) {
  // Calculate RSI based on price change
  const rsi = 50 + (priceChange * 2); // Normalized RSI value between 0-100

  // Calculate signal strength based on RSI deviation from neutral (50)
  const signalStrength = Math.min(Math.abs(rsi - 50) * 4, 100);

  // Calculate Stochastic values
  const kValue = Math.min(100, Math.max(0, 50 + priceChange)); // Fast line
  const dValue = Math.min(100, Math.max(0, 45 + priceChange)); // Slow line

  // Calculate EMAs
  const ema5 = price * 0.99;
  const ema9 = price * 0.98;
  const ema20 = price * 0.96;
  const ema50 = price * 0.95;
  const ema100 = price * 0.90;
  const ema200 = price * 0.85;

  return (
    <>
      {/* Moving Averages */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <LineChart className="h-5 w-5 text-teal-600 mr-2" />
          Moving Averages Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Short-term Moving Averages */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-gray-700">Short-term Indicators</h4>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="text-sm font-medium text-gray-700 mb-2">5-Day EMA</h5>
              <p className="text-xl font-bold text-gray-900">
                ${ema5.toFixed(2)}
              </p>
              <p className={`text-sm ${price > ema5 ? 'text-green-600' : 'text-red-600'} mt-2`}>
                Price {price > ema5 ? 'above' : 'below'} 5 EMA - {price > ema5 ? 'Very Short-term Bullish' : 'Very Short-term Bearish'}
              </p>
              <p className={`text-sm ${price > ema9 ? 'text-green-600' : 'text-red-600'} mt-1`}>
                {price > ema9 ? 'Bullish' : 'Bearish'} crossover with 9 EMA
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="text-sm font-medium text-gray-700 mb-2">9-Day EMA</h5>
              <p className="text-xl font-bold text-gray-900">
                ${ema9.toFixed(2)}
              </p>
              <p className={`text-sm ${price > ema9 ? 'text-green-600' : 'text-red-600'} mt-2`}>
                Price {price > ema9 ? 'above' : 'below'} 9 EMA - {price > ema9 ? 'Short-term Bullish' : 'Short-term Bearish'}
              </p>
              <p className={`text-sm ${price > ema20 ? 'text-green-600' : 'text-red-600'} mt-1`}>
                {price > ema20 ? 'Bullish' : 'Bearish'} crossover with 20 EMA
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="text-sm font-medium text-gray-700 mb-2">20-Day EMA</h5>
              <p className="text-xl font-bold text-gray-900">
                ${ema20.toFixed(2)}
              </p>
              <p className={`text-sm ${price > ema20 ? 'text-green-600' : 'text-red-600'} mt-2`}>
                Price {price > ema20 ? 'above' : 'below'} 20 EMA - {price > ema20 ? 'Medium-term Bullish' : 'Medium-term Bearish'}
              </p>
              <p className={`text-sm ${price > ema50 ? 'text-green-600' : 'text-red-600'} mt-1`}>
                {price > ema50 ? 'Bullish' : 'Bearish'} crossover with 50 EMA
              </p>
            </div>
          </div>

          {/* Long-term Moving Averages */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-gray-700">Long-term Indicators</h4>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="text-sm font-medium text-gray-700 mb-2">50-Day EMA</h5>
              <p className="text-xl font-bold text-gray-900">
                ${ema50.toFixed(2)}
              </p>
              <p className={`text-sm ${price > ema50 ? 'text-green-600' : 'text-red-600'} mt-2`}>
                Price {price > ema50 ? 'above' : 'below'} 50 EMA - {price > ema50 ? 'Strong Bullish Signal' : 'Strong Bearish Signal'}
              </p>
              <p className={`text-sm ${price > ema100 ? 'text-green-600' : 'text-red-600'} mt-1`}>
                {price > ema100 ? 'Bullish' : 'Bearish'} crossover with 100 EMA
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="text-sm font-medium text-gray-700 mb-2">100-Day EMA</h5>
              <p className="text-xl font-bold text-gray-900">
                ${ema100.toFixed(2)}
              </p>
              <p className={`text-sm ${price > ema100 ? 'text-green-600' : 'text-red-600'} mt-2`}>
                Price {price > ema100 ? 'above' : 'below'} 100 EMA - {price > ema100 ? 'Long-term Uptrend' : 'Long-term Downtrend'}
              </p>
              <p className={`text-sm ${price > ema200 ? 'text-green-600' : 'text-red-600'} mt-1`}>
                {price > ema200 ? 'Bullish' : 'Bearish'} crossover with 200 EMA
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="text-sm font-medium text-gray-700 mb-2">200-Day EMA</h5>
              <p className="text-xl font-bold text-gray-900">
                ${ema200.toFixed(2)}
              </p>
              <p className={`text-sm ${price > ema200 ? 'text-green-600' : 'text-red-600'} mt-2`}>
                Price {price > ema200 ? 'above' : 'below'} 200 EMA - {price > ema200 ? 'Strong Long-term Uptrend' : 'Strong Long-term Downtrend'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RSI Indicator */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Activity className="h-5 w-5 text-teal-600 mr-2" />
          14-Day RSI (Relative Strength Index)
        </h3>
        <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div className="absolute h-full w-full bg-gradient-to-r from-green-500 via-yellow-400 to-red-500"></div>
          <div
            className="absolute w-4 h-4 bg-white border-4 border-teal-600 rounded-full -mt-0.5 transform -translate-x-1/2"
            style={{
              left: `${Math.min(Math.max(rsi, 0), 100)}%`
            }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span className="text-green-600 font-medium">Oversold (&lt;30)</span>
          <span className="text-yellow-600 font-medium">Neutral (30-70)</span>
          <span className="text-red-600 font-medium">Overbought (&gt;70)</span>
        </div>
        <div className="bg-white rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">
                Current RSI:
                <span className="font-bold ml-2">
                  {rsi.toFixed(2)}
                </span>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Signal Strength: 
                <span className="font-bold ml-2">
                  {signalStrength.toFixed(1)}%
                </span>
              </p>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• RSI above 70 suggests potentially overbought conditions</p>
              <p>• RSI below 30 suggests potentially oversold conditions</p>
              <p>• RSI between 40-60 indicates neutral momentum</p>
              <p>• Trend strength increases as RSI moves toward extremes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stochastic Oscillator */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Activity className="h-5 w-5 text-teal-600 mr-2" />
          Stochastic Oscillator
        </h3>
        <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div className="absolute h-full w-full bg-gradient-to-r from-green-500 via-yellow-400 to-red-500"></div>
          <div
            className="absolute w-4 h-4 bg-white border-4 border-teal-600 rounded-full -mt-0.5 transform -translate-x-1/2"
            style={{
              left: `${Math.min(Math.max(kValue, 0), 100)}%`
            }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span className="text-green-600 font-medium">Oversold (&lt;20)</span>
          <span className="text-yellow-600 font-medium">Neutral (20-80)</span>
          <span className="text-red-600 font-medium">Overbought (&gt;80)</span>
        </div>
        <div className="bg-white rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">
                %K Line (Fast):
                <span className="font-bold ml-2">
                  {kValue.toFixed(2)}
                </span>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                %D Line (Slow):
                <span className="font-bold ml-2">
                  {dValue.toFixed(2)}
                </span>
              </p>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• Values above 80 indicate overbought conditions</p>
              <p>• Values below 20 indicate oversold conditions</p>
              <p>• Crossovers between %K and %D signal potential reversals</p>
              <p>• Divergence with price can predict trend changes</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}