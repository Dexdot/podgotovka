import { AxiosResponse } from 'axios';

import { PodgotovkaAPI } from '@/api/instance';
import { CourseEditDetailI, CourseI, CourseTariffI } from '@/types/courses';

const { axios } = PodgotovkaAPI;
const SERVICE_PATH = '/core/v1/courses';

function getCourses(
  limit?: number,
  skip?: number
): Promise<AxiosResponse<CourseI[]>> {
  return axios.get<CourseI[]>(`${SERVICE_PATH}`, { params: { limit, skip } });
}

function getCourseDetail(
  course_id: number
): Promise<AxiosResponse<CourseEditDetailI>> {
  return axios.get<CourseEditDetailI>(`${SERVICE_PATH}/${course_id}`);
}

function getCourseTariff(
  course_id: number
): Promise<AxiosResponse<CourseTariffI | null>> {
  return axios.get<CourseTariffI | null>(`${SERVICE_PATH}/${course_id}/tariff`);
}

export const CoursesAPI = {
  getCourses,
  getCourseDetail,
  getCourseTariff
};
