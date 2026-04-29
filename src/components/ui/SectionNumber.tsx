import { useState, useEffect, useRef } from "react";

interface SectionNumberProps {
  number: string;
  className?: string;
}

export const SectionNumber = ({ number, className = "" }: SectionNumberProps) => {
  const [display, setDisplay] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const elementRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) {
      setDisplay("");
      return;
    }

    let timeoutId: any;
    let intervalId: any;
    let currentIndex = 0;

    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        if (currentIndex < number.length) {
          currentIndex++;
          setDisplay(number.slice(0, currentIndex));
        } else {
          clearInterval(intervalId);
        }
      }, 300);
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [isInView, number]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={elementRef} 
      className={`font-mono text-8xl hidden lg:block select-none text-primary/30 ${className}`}
      aria-hidden="true"
    >
      {display}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'}`}>_</span>
    </div>
  );
};