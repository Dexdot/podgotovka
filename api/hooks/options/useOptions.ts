import React, { useEffect, useState } from 'react';

import { OptionI } from '@/types/common';
import { SearchParamsI } from '@/types/options';

import { fetchOptions } from '@/api/options';

import { showAlert } from '@/utils/network';

export function useOptions(
  withoutParams = false
): [
  OptionI[],
  React.Dispatch<React.SetStateAction<OptionI[]>>,
  (params?: SearchParamsI) => Promise<void>
] {
  const [state, setState] = useState<OptionI[]>([]);

  const fetch = async (params?: SearchParamsI): Promise<void> => {
    try {
      const { data } = await fetchOptions(params);
      setState(data);
    } catch (error) {
      showAlert({ error });
    }
  };

  useEffect(() => {
    fetch();
  }, [withoutParams]);

  return [state, setState, fetch];
}
