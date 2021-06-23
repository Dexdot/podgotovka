import { useContext, useEffect } from 'react';
import { AUTH_NAME } from '@/utils/consts';
import { AuthI } from '@/types/auth';
import { AuthContext } from '@/store/auth';
import { getCookie } from '@/utils/cookie';

export function useApp(): void {
  const authStore = useContext(AuthContext);

  // Window height
  useEffect(() => {
    const calc = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', calc);
    calc();
  }, []);

  // Get auth from cookie
  useEffect(() => {
    const authInCookie = getCookie(AUTH_NAME);

    if (authInCookie) {
      const parsedAuth = JSON.parse(authInCookie) as AuthI;
      if (parsedAuth) authStore.setAuth(parsedAuth);
    }
  }, []);
}
