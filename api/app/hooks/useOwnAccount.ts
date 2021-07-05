import { useEffect, useState } from 'react';

import { showAlert } from '@/utils/network';
import { UserMeI } from '@/types/app/users';
import { UsersAPI } from '@/api/app/users';

export function useOwnAccount(): [UserMeI | undefined, () => void] {
  const [account, setAccount] = useState<UserMeI | undefined>();

  const loadAccount = async () => {
    try {
      const { data } = await UsersAPI.fetchOwnAccount();
      setAccount(data);
    } catch (error) {
      showAlert({ error });
    }
  };

  useEffect(() => {
    loadAccount();
  }, []);

  return [account, loadAccount];
}
