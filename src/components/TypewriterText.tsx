import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsTyping(false);
      }, pauseDuration);
      return () => clearTimeout(timeout);
    }

    const currentText = texts[currentIndex];

    if (isTyping) {
      if (displayText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        setIsPaused(true);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deletingSpeed);
      } else {
        setIsTyping(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isTyping, isPaused, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <div className="flex flex-wrap justify-center">
      <div className="inline-flex flex-wrap justify-center items-center">
        <div className="flex items-center whitespace-pre-wrap break-words">
          <span>{displayText}</span>
          <span 
            className="inline-block w-[6px] bg-teal-200 ml-[4px] animate-[blink_1s_infinite]"
            style={{ height: '1.2em' }}
          />
        </div>
      </div>
    </div>
  );
};

export default TypewriterText;