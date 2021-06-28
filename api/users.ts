import { AxiosResponse } from 'axios';

import {
  UserI,
  UserDetailsI,
  SearchParamsI,
  NewUserI,
  UpdateUserI
} from '@/types/users';
import { PodgotovkaAPI } from '@/api/instance';

const { axios } = PodgotovkaAPI;
const SERVICE_PATH = '/core/v1/accounts';

export function fetchUsers(
  searchParams: SearchParamsI
): Promise<AxiosResponse<UserI[]>> {
  return axios.get<UserI[]>(`${SERVICE_PATH}`, {
    params: { ...searchParams }
  });
}

export function fetchUserDetails(
  id: number
): Promise<AxiosResponse<UserDetailsI>> {
  return axios.get<UserDetailsI>(`${SERVICE_PATH}/${id}`);
}

export function createUser(data: NewUserI): Promise<AxiosResponse<UserI>> {
  return axios.post<UserI>(`${SERVICE_PATH}`, data);
}

export function updateUser(data: UpdateUserI): Promise<AxiosResponse<UserI>> {
  const { id, ...form } = data;
  return axios.patch<UserI>(`${SERVICE_PATH}/${id}`, form);
}

export function resetUserPassword(
  id: number,
  password: string
): Promise<AxiosResponse<{ result: boolean }>> {
  return axios.patch<{ result: boolean }>(
    `${SERVICE_PATH}/${id}/reset-password`,
    { password }
  );
}

export const UsersAPI = {
  fetchUsers,
  fetchUserDetails,
  createUser,
  updateUser,
  resetUserPassword
};
