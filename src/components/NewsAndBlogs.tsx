import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface NewsItem {
  title: string;
  date: string;
  summary: string;
  source: string;
  link: string;
}

export default function NewsAndBlogs() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          'https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=8fc3e1168f469de21405e522631b568e56f91c19e1359ef3c2da4f58c84bd4c4'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }

        const data = await response.json();
        const formattedNews: NewsItem[] = data.Data.map((item: any) => ({
          title: item.title,
          date: new Date(item.published_on * 1000).toLocaleDateString(),
          summary: item.body.slice(0, 150) + '...',
          source: item.source,
          link: item.url
        }));

        setNews(formattedNews);
        setError(null);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to load news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const totalPages = Math.ceil(news.length / itemsPerPage);
  const displayedNews = news.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
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
      <section id="news" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              News & Insights
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="news" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              News & Insights
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
    <section id="news" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            News & Insights
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Stay updated with the latest cryptocurrency market news and developments
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {displayedNews.map((item, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-sm text-gray-500">{item.date}</span>
                    <span className="text-sm font-medium text-teal-600">{item.source}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.summary}</p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-teal-600 hover:text-teal-700"
                  >
                    Read more
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
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