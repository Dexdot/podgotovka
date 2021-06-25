import { AxiosResponse } from 'axios';
import qs from 'querystring';

import { PodgotovkaAPI } from '@/api/instance';
import { AuthI } from '@/types/auth';
import { FormI } from '@/components/Auth/Signin/helpers';

const { axios } = PodgotovkaAPI;
const SERVICE_PATH = '/core/v1';

export function auth(form: FormI): Promise<AxiosResponse<AuthI>> {
  return axios.post<AuthI>(
    `${SERVICE_PATH}/accounts/auth/base`,
    qs.stringify({ ...form }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
}
