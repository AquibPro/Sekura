import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function FundraisingProgress() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [isVisible, setIsVisible] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView && !isVisible) {
      setIsVisible(true);
      if (progressRef.current) {
        progressRef.current.style.width = '0%';
        setTimeout(() => {
          progressRef.current!.style.width = '25%';
        }, 100);
      }
    }
  }, [inView, isVisible]);

  return (
    <div ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-900">Current Fundraising Progress</p>
          <p className="text-3xl font-bold mt-2 text-teal-600">$1,000+</p>
          <div className="mt-4 max-w-md mx-auto bg-teal-100 rounded-full h-4">
            <div 
              ref={progressRef}
              className="bg-teal-500 rounded-full h-4 transition-all duration-1000 ease-out"
              style={{ width: isVisible ? '25%' : '0%' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}