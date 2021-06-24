import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { DropdownItem } from '@/components/common/Dropdown/Dropdown';

export function useSubjects(): [
  DropdownItem[],
  Dispatch<SetStateAction<DropdownItem[]>>
] {
  const [state, setState] = useState<DropdownItem[]>([]);

  useEffect(() => {
    // todo fetch roles
    setState([
      { id: '1', text: 'Русский (ЕГЭ)' },
      { id: '2', text: 'Физика (ЕГЭ)' },
      { id: '3', text: 'Математика (ЕГЭ)' },
      { id: '4', text: 'История (ЕГЭ)' }
    ]);
  }, []);

  return [state, setState];
}
