import { AxiosResponse } from 'axios';

import {
  OptionI,
  SearchParamsI,
  CreateOptionI,
  UpdateOptionI
} from '@/types/options';
import { PodgotovkaAPI } from '@/api/instance';

const { axios } = PodgotovkaAPI;
const SERVICE_PATH = '/core/v1';

export function fetchOptions(
  searchParams: SearchParamsI
): Promise<AxiosResponse<OptionI[]>> {
  return axios.get<OptionI[]>(`${SERVICE_PATH}/options`, {
    params: { ...searchParams }
  });
}

export function createOption(
  option: CreateOptionI
): Promise<AxiosResponse<OptionI>> {
  return axios.post<OptionI>(`${SERVICE_PATH}/options/create`, option);
}

export function updateOption(
  option: UpdateOptionI
): Promise<AxiosResponse<OptionI>> {
  const { id, ...rest } = option;
  return axios.patch<OptionI>(`${SERVICE_PATH}/options/${id}`, rest);
}

export const OptionsAPI = {
  fetchOptions,
  createOption,
  updateOption
};
