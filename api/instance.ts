import axios, { AxiosInstance } from 'axios';
import { API_BASE, AUTH_NAME } from '@/utils/consts';

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
let token;

// TODO: LS => Cookie
if (process.browser) {
  const payload = window.localStorage.getItem(AUTH_NAME);

  if (payload) {
    const { access_token } = JSON.parse(payload);
    token = access_token;
  }
}

// API Object
export const PodgotovkaAPI = new PodgotovkaAPIClass(API_BASE, token);
