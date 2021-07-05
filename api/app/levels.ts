import { AxiosResponse } from 'axios';

import { PodgotovkaAPI } from '@/api/instance';
import { LevelI } from '@/types/common';

const { axios } = PodgotovkaAPI;
const SERVICE_PATH = '/core/v1/levels';

// Levels
export function getLevels(): Promise<AxiosResponse<LevelI[]>> {
  return axios.get<LevelI[]>(`${SERVICE_PATH}`);
}
