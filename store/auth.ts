import { createContext } from 'react';
import { makeAutoObservable } from 'mobx';
import jwt_decode from 'jwt-decode';

import { AuthI, AuthJWTI } from '@/types/auth';
import { AUTH_NAME } from '@/utils/consts';
import { PodgotovkaAPI } from '@/api/instance';
import { deleteCookie, setCookie } from '@/utils/cookie';
import { RoleType } from '@/types/app/users';

const prodCookieOptions = {
  path: '/',
  expires: 7,
  domain: '.podgotovka.ru'
};

const devCookieOptions = {
  path: '/',
  expires: 7
};

const cookieOptions =
  process.env.NODE_ENV === 'development' ? devCookieOptions : prodCookieOptions;

export class AuthStore {
  public auth: AuthI | undefined;

  public role: RoleType | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth = (v: AuthI): void => {
    const jwt = jwt_decode<AuthJWTI>(v.access_token);
    this.role = jwt.role;

    this.auth = { ...v };
    PodgotovkaAPI.updateToken(v.access_token);
    setCookie(AUTH_NAME, JSON.stringify(v), cookieOptions);
  };

  remove = (): void => {
    this.role = undefined;
    this.auth = undefined;
    PodgotovkaAPI.updateToken('');
    deleteCookie(AUTH_NAME, cookieOptions);
  };

  get isStudent(): boolean {
    return this.role === 'student';
  }
}

export const authStore = new AuthStore();
export const AuthContext = createContext<AuthStore>(authStore);
