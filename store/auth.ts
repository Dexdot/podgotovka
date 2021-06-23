import { createContext } from 'react';
import { makeAutoObservable } from 'mobx';
import { AuthI } from '@/types/auth';
import { AUTH_NAME } from '@/utils/consts';
import { PodgotovkaAPI } from '@/api/instance';

export class AuthStore {
  public auth: AuthI | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  // TODO: LS => Cookie
  setAuth(v: AuthI): void {
    this.auth = v;
    PodgotovkaAPI.updateToken(v.access_token);
    window.localStorage.setItem(AUTH_NAME, JSON.stringify(v));
  }

  remove(): void {
    this.auth = undefined;
    PodgotovkaAPI.updateToken('');
    window.localStorage.removeItem(AUTH_NAME);
  }
}

export const authStore = new AuthStore();
export const AuthContext = createContext<AuthStore>(authStore);
