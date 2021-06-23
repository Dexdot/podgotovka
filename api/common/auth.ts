import { AxiosResponse } from 'axios';

import { PodgotovkaAPI } from '@/api/instance';
import { AuthI } from '@/types/auth';

const { axios } = PodgotovkaAPI;
const SERVICE_PATH = '/core/v1';

// Example auth
export function auth(): Promise<AxiosResponse<AuthI>> {
  return axios.post<AuthI>(`${SERVICE_PATH}/auth`);
}
