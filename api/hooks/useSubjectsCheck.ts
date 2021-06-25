import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { DropdownItemSub } from '@/components/common/Dropdown/Dropdown';

export function useSubjectsCheck(): [
  DropdownItemSub[],
  Dispatch<SetStateAction<DropdownItemSub[]>>
] {
  const [state, setState] = useState<DropdownItemSub[]>([]);

  useEffect(() => {
    // todo fetch roles
    setState([
      { id: '1', text: 'ЕГЭ', value: 'USE' },
      { id: '2', text: 'ОГЭ', value: 'BSE' }
    ]);
  }, []);

  return [state, setState];
}
