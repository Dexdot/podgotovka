import { AxiosResponse } from 'axios';

import { PodgotovkaAPI } from '@/api/instance';
import { AuthI } from '@/types/auth';
import { getFormData } from '@/utils/network';
import { FormI } from '@/components/Auth/App/helpers';

const { axios } = PodgotovkaAPI;
const SERVICE_PATH = '/core/v1';

export function authApp(form: FormI): Promise<AxiosResponse<AuthI>> {
  return axios.post<AuthI>(
    `${SERVICE_PATH}/accounts/auth/base`,
    getFormData({ ...form })
  );
}
