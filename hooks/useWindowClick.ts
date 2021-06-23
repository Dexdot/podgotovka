import { useEffect } from 'react';

export function useWindowClick(callback: (e: any) => void): void {
  useEffect(() => {
    window.addEventListener('click', callback);
    return () => window.removeEventListener('click', callback);
  }, [callback]);
}
