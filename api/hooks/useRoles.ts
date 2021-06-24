import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { DropdownItem } from '@/components/common/Dropdown/Dropdown';

export function useRoles(): [
  DropdownItem[],
  Dispatch<SetStateAction<DropdownItem[]>>
] {
  const [state, setState] = useState<DropdownItem[]>([]);

  useEffect(() => {
    // todo fetch roles
    setState([
      { id: '1', text: 'Админ' },
      { id: '2', text: 'Преподаватель' },
      { id: '3', text: 'Хоум-чекер' },
      { id: '4', text: 'Куратор' },
      { id: '5', text: 'Хэлпер' }
    ]);
  }, []);

  return [state, setState];
}
