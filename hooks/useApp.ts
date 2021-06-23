import { useContext, useEffect } from 'react';
import { AUTH_NAME } from '@/utils/consts';
import { AuthI } from '@/types/auth';
import { AuthContext } from '@/store/auth';

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

  // Get auth from storage
  // TODO: LS => Cookie
  useEffect(() => {
    const authInStorage = window.localStorage.getItem(AUTH_NAME);

    if (authInStorage) {
      const parsedAuth = JSON.parse(authInStorage) as AuthI;
      if (parsedAuth) authStore.setAuth(parsedAuth);
    }
  }, []);
}
