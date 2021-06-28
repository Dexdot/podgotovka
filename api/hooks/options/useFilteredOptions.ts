import React, { useCallback, useEffect, useState } from 'react';

import { OptionI } from '@/types/common';
import { SearchParamsI } from '@/types/options';

import { fetchOptions } from '@/api/options';

import { showAlert } from '@/utils/network';

export function useFilteredOptions(
  params?: SearchParamsI
): [OptionI[], React.Dispatch<React.SetStateAction<OptionI[]>>] {
  const [state, setState] = useState<OptionI[]>([]);

  const fetch = useCallback(async (): Promise<void> => {
    try {
      const { data } = await fetchOptions(params);
      setState(data);
    } catch (error) {
      showAlert({ error });
    }
  }, [params]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return [state, setState];
}
