import { useEffect } from 'react';

export function useApp(): void {
  // Window height
  useEffect(() => {
    const calc = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', calc);
    calc();
  }, []);
}
