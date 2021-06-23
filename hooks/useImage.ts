import { useEffect, useState } from 'react';

export function useImage(src: string): [string, boolean, Error | undefined] {
  const [loading, setLoading] = useState<boolean>(true);
  const [image, setImage] = useState<string>('');
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (!src) return undefined;
    setLoading(true);

    let ojectURL = '';

    fetch(src)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        ojectURL = URL.createObjectURL(blob);
        setImage(ojectURL);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      if (ojectURL) URL.revokeObjectURL(ojectURL);
    };
  }, [src]);

  return [image, loading, error];
}
