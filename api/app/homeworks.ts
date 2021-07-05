import { AxiosResponse } from 'axios';

import { PodgotovkaAPI } from '@/api/instance';
import { HWEditDetailI, UpdateHWI } from '@/types/app/homeworks';

const { axios } = PodgotovkaAPI;
const SERVICE_PATH = '/core/v1/homeworks/lessons';

function getHWDetail(lesson_id: number): Promise<AxiosResponse<HWEditDetailI>> {
  return axios.get<HWEditDetailI>(`${SERVICE_PATH}/${lesson_id}`);
}

function updateHW(
  lesson_id: number,
  hw: UpdateHWI
): Promise<AxiosResponse<HWEditDetailI>> {
  return axios.put<HWEditDetailI>(`${SERVICE_PATH}/${lesson_id}`, hw);
}

function createHW(
  lesson_id: number,
  hw: UpdateHWI
): Promise<AxiosResponse<HWEditDetailI>> {
  return axios.post<HWEditDetailI>(`${SERVICE_PATH}/${lesson_id}`, hw);
}

export const HomeworksAPI = {
  getHWDetail,
  updateHW,
  createHW
};
