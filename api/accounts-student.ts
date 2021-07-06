import { AxiosResponse } from 'axios';

import { PodgotovkaAPI } from '@/api/instance';
import { AuthI } from '@/types/auth';
import { getFormData } from '@/utils/network';
import { StudentI } from '@/types/students';
import { FormI as AuthFormI } from '@/components/Auth/Signin/helpers';
import { FormI as RegisterFormI } from '@/components/Auth/Signup/helpers';

const { axios } = PodgotovkaAPI;
const SERVICE_PATH = '/core/v1/accounts-student';

interface RegFormI extends RegisterFormI {
  photo_link?: string;
}

function register(form: RegFormI): Promise<AxiosResponse<AuthI>> {
  return axios.post<AuthI>(`${SERVICE_PATH}/register`, form);
}

function auth(form: AuthFormI): Promise<AxiosResponse<AuthI>> {
  return axios.post<AuthI>(
    `${SERVICE_PATH}/auth/base`,
    getFormData({ ...form })
  );
}

function authVK(code: string): Promise<AxiosResponse<AuthI>> {
  return axios.post<AuthI>(`${SERVICE_PATH}/auth/vk`, { code });
}

function getOwnStudentAccount(): Promise<AxiosResponse<StudentI>> {
  return axios.get<StudentI>(`${SERVICE_PATH}/me`);
}

export const AccountsStudentAPI = {
  register,
  auth,
  authVK,
  getOwnStudentAccount
};
