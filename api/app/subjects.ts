import { AxiosResponse } from 'axios';

import { PodgotovkaAPI } from '@/api/instance';
import { RequestCreateI, RequestUpdateI, SubjectI } from '@/types/subjects';

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

// Create subject
export function createSubject(
  req: RequestCreateI
): Promise<AxiosResponse<SubjectI>> {
  return axios.post(`${SERVICE_PATH}`, req);
}

// Update Subject
export function updateSubject(
  item: RequestUpdateI
): Promise<AxiosResponse<SubjectI>> {
  const { id, ...el } = item;
  return axios.patch(`${SERVICE_PATH}/${id}`, el);
}
