import { AxiosResponse } from 'axios';

import {
  UserI,
  UserDetailI,
  SearchParamsI,
  NewUserI,
  UpdateUserI
} from '@/types/users';
import { PodgotovkaAPI } from '@/api/instance';

const { axios } = PodgotovkaAPI;
const SERVICE_PATH = '/core/v1';

export function fetchUsers(
  searchParams: SearchParamsI
): Promise<AxiosResponse<UserI[]>> {
  return axios.get<UserI[]>(`${SERVICE_PATH}/users`, {
    params: { ...searchParams }
  });
}

export function fetchUserDetails(
  userId: number
): Promise<AxiosResponse<UserDetailI>> {
  return axios.get<UserDetailI>(`${SERVICE_PATH}/users/${userId}`);
}

export function addUser(data: NewUserI): Promise<AxiosResponse<UserDetailI>> {
  return axios.post<UserDetailI>(
    `${SERVICE_PATH}/users/add`,
    JSON.stringify(data)
  );
}

export function updateUser(
  data: UpdateUserI
): Promise<AxiosResponse<UserDetailI>> {
  const { id, ...form } = data;
  return axios.patch<UserDetailI>(
    `${SERVICE_PATH}/users/${id}`,
    JSON.stringify(form)
  );
}

export function removeUser(userId: number): Promise<AxiosResponse<boolean>> {
  return axios.delete<boolean>(`${SERVICE_PATH}/users/${userId}`);
}

export const UsersAPI = {
  fetchUsers,
  fetchUserDetails,
  addUser,
  updateUser,
  removeUser
};
