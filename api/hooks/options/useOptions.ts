import React, { useEffect, useState } from 'react';

import { OptionI } from '@/types/common';

import { fetchOptions } from '@/api/options';

import { showAlert } from '@/utils/network';

export function useOptions(): [
  OptionI[],
  React.Dispatch<React.SetStateAction<OptionI[]>>
] {
  const [state, setState] = useState<OptionI[]>([]);
  const [isFetching, toggleFetching] = useState<boolean>(false);

  const fetch = async (): Promise<void> => {
    if (!isFetching) {
      try {
        toggleFetching(true);
        const { data } = await fetchOptions();
        setState(data);
      } catch (error) {
        showAlert({ error });
      } finally {
        toggleFetching(false);
      }
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return [state, setState];
}
