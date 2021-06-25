import { AxiosResponse } from 'axios';

import { PodgotovkaAPI } from '@/api/instance';
import { AuthI } from '@/types/auth';
import { getFormData } from '@/utils/network';
import { FormI } from '@/components/Auth/Signin/helpers';

const { axios } = PodgotovkaAPI;
const SERVICE_PATH = '/core/v1';

export function auth(form: FormI): Promise<AxiosResponse<AuthI>> {
  return axios.post<AuthI>(
    `${SERVICE_PATH}/accounts/auth/base`,
    getFormData({ ...form }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
}
