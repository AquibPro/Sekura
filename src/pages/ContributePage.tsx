import React, { useState, useEffect } from 'react';
import { Copy, Upload, X, Check } from 'lucide-react';
import CountrySelect from '../components/CountrySelect';
import Captcha from '../components/Captcha';
import Snackbar from '../components/Snackbar';
import ThankYou from '../components/ThankYou';
import { submitContribution } from '../utils/airtable';

export default function ContributePage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    countryCode: '+1',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    walletAddress: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('error');
  const [showThankYou, setShowThankYou] = useState(false);
  const [isCopied, setIsCopied] = useState({ eth: false, btc: false });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const copyToClipboard = (text: string, type: 'eth' | 'btc') => {
    navigator.clipboard.writeText(text);
    setIsCopied(prev => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setIsCopied(prev => ({ ...prev, [type]: false }));
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 600;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.6);
          resolve(compressedDataUrl);
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setSnackbarMessage('File size must be less than 2MB');
        setSnackbarType('error');
        setShowSnackbar(true);
        e.target.value = '';
        setSelectedFile(null);
        setPreviewUrl(null);
        return;
      }
      try {
        const compressedDataUrl = await compressImage(file);
        setSelectedFile(file);
        setPreviewUrl(compressedDataUrl);
      } catch (error) {
        console.error('Error compressing image:', error);
        setSnackbarMessage('Error processing image. Please try another file.');
        setSnackbarType('error');
        setShowSnackbar(true);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCaptchaVerified) {
      setSnackbarMessage('Please verify the captcha');
      setSnackbarType('error');
      setShowSnackbar(true);
      return;
    }

    setIsSubmitting(true);

    try {
      await submitContribution({
        ...formData,
        screenshot: previewUrl || undefined
      });

      setShowThankYou(true);
    } catch (error) {
      console.error('Form submission error:', error);
      setSnackbarMessage('Failed to submit form. Please try again.');
      setSnackbarType('error');
      setShowSnackbar(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Contribute to Sekura</h2>

          <div className="mb-8 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Wallet Address</h3>
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                <code className="text-sm break-all">0x3425d4CF30f844e5070d9DDD2ea5bfef553C2488</code>
                <button
                  onClick={() => copyToClipboard('0x3425d4CF30f844e5070d9DDD2ea5bfef553C2488', 'eth')}
                  className="ml-2 p-2 text-teal-600 hover:text-teal-700 transition-all duration-500"
                  title="Copy Address"
                >
                  {isCopied.eth ? (
                    <Check className="h-5 w-5 transform transition-all duration-500" />
                  ) : (
                    <Copy className="h-5 w-5 transform transition-all duration-500" />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Supported Tokens:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                  Ethereum (ETH)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                  USDT (ERC20 & BEP20)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                  USDC (ERC20 & BEP20)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                  TRON (ERC20)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                  BNB
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Bitcoin Address</h3>
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                <code className="text-sm break-all">bc1qpl6vdh9awp6pxhmg4zyghnm5q727r20fay22aa</code>
                <button
                  onClick={() => copyToClipboard('bc1qpl6vdh9awp6pxhmg4zyghnm5q727r20fay22aa', 'btc')}
                  className="ml-2 p-2 text-teal-600 hover:text-teal-700 transition-all duration-500"
                  title="Copy Address"
                >
                  {isCopied.btc ? (
                    <Check className="h-5 w-5 transform transition-all duration-500" />
                  ) : (
                    <Copy className="h-5 w-5 transform transition-all duration-500" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number *
                </label>
                <div className="mt-1 flex">
                  <CountrySelect
                    value={formData.countryCode}
                    onChange={(value) => setFormData(prev => ({ ...prev, countryCode: value }))}
                  />
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    required
                    className="ml-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  State/Province *
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">
                  ZIP/Postal Code *
                </label>
                <input
                  type="text"
                  name="zipcode"
                  id="zipcode"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  value={formData.zipcode}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-700">
                  Your Wallet Address (to receive SKU) *
                </label>
                <input
                  type="text"
                  name="walletAddress"
                  id="walletAddress"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  value={formData.walletAddress}
                  onChange={handleInputChange}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Screenshot *
                </label>
                <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    {previewUrl ? (
                      <div className="relative">
                        <img src={previewUrl} alt="Preview" className="max-h-48 mx-auto" />
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedFile(null);
                            setPreviewUrl(null);
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500">
                            <span>Upload a file</span>
                            <input
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleFileChange}
                              required
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Captcha onVerify={setIsCaptchaVerified} />

              <button
                type="submit"
                disabled={isSubmitting || !isCaptchaVerified}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isSubmitting || !isCaptchaVerified
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-teal-600 hover:bg-teal-700'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Contribution'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Snackbar
        message={snackbarMessage}
        type={snackbarType}
        isOpen={showSnackbar}
        onClose={() => setShowSnackbar(false)}
      />

      {showThankYou && <ThankYou />}
    </div>
  );
}