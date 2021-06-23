import axios, { AxiosInstance } from 'axios';
import { API_BASE, AUTH_NAME } from '@/utils/consts';
import { getCookie } from '@/utils/cookie';
import { AuthI } from '@/types/auth';

// Class
export class PodgotovkaAPIClass {
  // @ts-ignore
  private baseURL: string;

  // @ts-ignore
  public axios: AxiosInstance;

  constructor(baseURL: string, token: string) {
    this.configure(baseURL, token);
  }

  public configure(baseURL: string = API_BASE, token: string): void {
    this.axios = axios.create({
      baseURL,
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    this.baseURL = baseURL;
  }

  public updateToken(token: string): void {
    if (token) {
      this.axios.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      this.axios.defaults.headers.Authorization = '';
    }
  }
}

// Token
let token = '';

if (process.browser) {
  const authInCookie = getCookie(AUTH_NAME);

  if (authInCookie) {
    const { access_token } = JSON.parse(authInCookie) as AuthI;
    if (access_token) token = access_token;
  }
}

// API Object
export const PodgotovkaAPI = new PodgotovkaAPIClass(API_BASE, token);
