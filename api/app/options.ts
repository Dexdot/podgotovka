import { AxiosResponse } from 'axios';

import { OptionI } from '@/types/common';
import {
  SearchParamsI,
  CreateOptionI,
  UpdateOptionI
} from '@/types/app/options';
import { PodgotovkaAPI } from '@/api/instance';

const { axios } = PodgotovkaAPI;
const SERVICE_PATH = '/core/v1/options';

export function fetchOptions(
  searchParams?: SearchParamsI
): Promise<AxiosResponse<OptionI[]>> {
  return axios.get<OptionI[]>(`${SERVICE_PATH}`, {
    params: { ...searchParams }
  });
}

export function createOption(
  option: CreateOptionI
): Promise<AxiosResponse<OptionI>> {
  return axios.post<OptionI>(`${SERVICE_PATH}`, option);
}

export function updateOption(
  option: UpdateOptionI
): Promise<AxiosResponse<OptionI>> {
  const { id, ...rest } = option;
  return axios.patch<OptionI>(`${SERVICE_PATH}/${id}`, rest);
}

export function removeOption(
  id: number
): Promise<AxiosResponse<{ result: boolean }>> {
  return axios.delete<{ result: boolean }>(`${SERVICE_PATH}/${id}`);
}

export const OptionsAPI = {
  fetchOptions,
  createOption,
  updateOption,
  removeOption
};
