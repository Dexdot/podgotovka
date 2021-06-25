import { AxiosResponse } from 'axios';

import { PodgotovkaAPI } from '@/api/instance';
import { SubjectI } from '@/types/subjects';

const { axios } = PodgotovkaAPI;
const SERVICE_PATH = '/core/v1/subjects';

// Subjects
export function getSubjects(): Promise<AxiosResponse<SubjectI[]>> {
  return axios.get<SubjectI[]>(`${SERVICE_PATH}`);
}

// Subject detail
export function getSubjectDetail(
  subject_id: number
): Promise<AxiosResponse<SubjectI>> {
  return axios.get<SubjectI>(`${SERVICE_PATH}/${subject_id}`);
}
