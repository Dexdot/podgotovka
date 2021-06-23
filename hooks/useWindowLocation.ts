import { useEffect, useState } from 'react';
import { useClientSide } from '@/hooks/useClientSide';

export function useWindowLocation(): Location | void {
  const isClientSide = useClientSide();
  const [location, setLocation] = useState<Location | void>(
    isClientSide ? window.location : undefined
  );

  useEffect(() => {
    if (!isClientSide) return undefined;

    const setWindowLocation = () => {
      setLocation(window.location);
    };

    setWindowLocation();
    window.addEventListener('popstate', setWindowLocation);
    return () => {
      window.removeEventListener('popstate', setWindowLocation);
    };
  }, [isClientSide]);

  return location;
}
