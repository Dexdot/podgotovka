import { useEffect, useState } from 'react';

export function useClientSide(): boolean {
  const [isClientSide, setClientSide] = useState(false);

  useEffect(() => {
    setClientSide(true);
  }, []);

  return isClientSide;
}
