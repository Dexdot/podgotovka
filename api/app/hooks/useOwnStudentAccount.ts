import { useCallback, useState } from 'react';

import { showAlert } from '@/utils/network';
import { AccountsStudentAPI } from '@/api/accounts-student';
import { StudentI } from '@/types/students';

export function useOwnStudentAccount(): [StudentI | undefined, () => void] {
  const [account, setAccount] = useState<StudentI | undefined>();

  const loadAccount = useCallback(async () => {
    try {
      const { data } = await AccountsStudentAPI.getOwnStudentAccount();
      setAccount(data);
    } catch (error) {
      showAlert({ error });
    }
  }, []);

  return [account, loadAccount];
}
