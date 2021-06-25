import { DirectionItem } from '@/types/common';
import { Dispatch, SetStateAction, useState } from 'react';

export function useDirections(): [
  DirectionItem[],
  Dispatch<SetStateAction<DirectionItem[]>>
] {
  const [state, setState] = useState<DirectionItem[]>([
    { id: 'USE', text: 'ЕГЭ', value: 'USE' },
    { id: 'BSE', text: 'ОГЭ', value: 'BSE' }
  ]);

  return [state, setState];
}
