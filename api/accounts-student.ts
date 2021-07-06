import { AxiosResponse } from 'axios';

import { PodgotovkaAPI } from '@/api/instance';
import { AuthI } from '@/types/auth';
import { getFormData } from '@/utils/network';
import { StudentI } from '@/types/students';

const { axios } = PodgotovkaAPI;
const SERVICE_PATH = '/core/v1/accounts-student';

function register(form: any): Promise<AxiosResponse<AuthI>> {
  return axios.post<AuthI>(`${SERVICE_PATH}/register`, form);
}

function auth(form: any): Promise<AxiosResponse<AuthI>> {
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
