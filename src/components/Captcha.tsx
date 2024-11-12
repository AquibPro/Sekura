import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface CaptchaProps {
  onVerify: (verified: boolean) => void;
}

export default function Captcha({ onVerify }: CaptchaProps) {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isRotating, setIsRotating] = useState(false);

  const generateCaptcha = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 150);
    
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    setUserInput('');
    onVerify(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);
    if (value === captchaText) {
      onVerify(true);
    } else {
      onVerify(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-4">
        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
          <div 
            className="font-mono text-lg tracking-wider select-none"
            style={{
              textDecoration: 'line-through',
              background: 'repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 10px, #e0e0e0 10px, #e0e0e0 20px)'
            }}
          >
            {captchaText}
          </div>
          <button
            type="button"
            onClick={generateCaptcha}
            className={`ml-3 p-1 text-gray-500 hover:text-gray-700 transition-all duration-150 ${isRotating ? 'rotate-180' : ''}`}
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Enter captcha"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
    </div>
  );
}