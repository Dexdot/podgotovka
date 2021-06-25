import { AxiosResponse } from 'axios';

import { PodgotovkaAPI } from '@/api/instance';
import { CourseEditDetailI, CourseTariffI } from '@/types/courses';

const { axios } = PodgotovkaAPI;
const SERVICE_PATH = '/core/v1/courses';

export function getCourseDetail(
  course_id: number
): Promise<AxiosResponse<CourseEditDetailI>> {
  return axios.get<CourseEditDetailI>(`${SERVICE_PATH}/${course_id}`);
}

export function getCourseTariff(
  course_id: number
): Promise<AxiosResponse<CourseTariffI | null>> {
  return axios.get<CourseTariffI | null>(`${SERVICE_PATH}/${course_id}/tariff`);
}

export const CoursesAPI = {
  getCourseDetail,
  getCourseTariff
};
