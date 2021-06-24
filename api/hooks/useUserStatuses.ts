import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { DropdownItem } from '@/components/common/Dropdown/Dropdown';

export function useUserStatuses(): [
  DropdownItem[],
  Dispatch<SetStateAction<DropdownItem[]>>
] {
  const [state, setState] = useState<DropdownItem[]>([]);

  useEffect(() => {
    // todo fetch user statuses
    setState([
      { id: '1', text: 'Заблокирован' },
      { id: '2', text: 'Активен' }
    ]);
  }, []);

  return [state, setState];
}
