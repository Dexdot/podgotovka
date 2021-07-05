import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { authStore } from '@/store/auth';
import { AuthI } from '@/types/auth';
import { AUTH_NAME } from '@/utils/consts';
import { getCookie } from '@/utils/cookie';

type Props = {
  children: React.ReactNode;
};

export const HandleAuth: React.FC<Props> = observer(({ children }) => {
  const { setAuth, setState } = authStore;

  // Get auth from cookie
  useEffect(() => {
    const authInCookie = getCookie(AUTH_NAME);

    if (authInCookie) {
      const parsedAuth = JSON.parse(authInCookie) as AuthI;

      if (parsedAuth) {
        setAuth(parsedAuth);
      } else {
        setState('not_authed');
      }
    } else {
      setState('not_authed');
    }
  }, []);

  return <div>{children}</div>;
});
