import { AxiosResponse } from 'axios';

import { PodgotovkaAPI } from '@/api/instance';
import { RequestCreateI, RequestUpdateI, SubjectI } from '@/types/subjects';

const { axios } = PodgotovkaAPI;
const SERVICE_PATH = '/core/v1';

// Get all subjects
export function fetchAllSubjects(): Promise<AxiosResponse<SubjectI[]>> {
  return axios.get<SubjectI[]>(`${SERVICE_PATH}/subjects`);
}

// Create subject
export function createSubject(
  req: RequestCreateI
): Promise<AxiosResponse<SubjectI>> {
  return axios.post(`${SERVICE_PATH}/subjects`, req);
}

// Get subject Detail
export async function fetchSubjectDetail(
  id: number
): Promise<AxiosResponse<SubjectI>> {
  return axios.get<SubjectI>(`${SERVICE_PATH}/subjects/${id}`);
}

// Update Subject
export function updateSubject(
  item: RequestUpdateI
): Promise<AxiosResponse<SubjectI>> {
  const { id, ...el } = item;
  return axios.patch(`${SERVICE_PATH}/subjects/${id}`, el);
}
