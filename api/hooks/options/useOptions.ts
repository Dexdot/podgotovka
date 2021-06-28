import React, { useEffect, useState } from 'react';

import { OptionI } from '@/types/common';

import { fetchOptions } from '@/api/options';

import { showAlert } from '@/utils/network';

export function useOptions(): [
  OptionI[],
  React.Dispatch<React.SetStateAction<OptionI[]>>
] {
  const [state, setState] = useState<OptionI[]>([]);

  const fetch = async () => {
    try {
      const { data } = await fetchOptions();
      setState(data);
    } catch (error) {
      showAlert({ error });
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return [state, setState];
}
