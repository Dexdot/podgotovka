import { useState, useEffect, useCallback } from 'react';

import { LevelI } from '@/types/common';
import { getLevels } from '@/api/app/levels';
import { showAlert } from '@/utils/network';

export function useLevels(): LevelI[] | undefined {
  const [levels, setLevels] = useState<LevelI[]>();

  const loadLevels = useCallback(async () => {
    try {
      const { data } = await getLevels();
      setLevels(data);
    } catch (error) {
      showAlert({ error });
    }
  }, []);

  useEffect(() => {
    loadLevels();
  }, [loadLevels]);

  return levels;
}
