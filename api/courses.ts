import { AxiosResponse } from 'axios';

import { PodgotovkaAPI } from '@/api/instance';
import {
  CourseEditDetailI,
  CourseI,
  CourseStatus,
  CourseTariffI,
  UpdateCourseDataI,
  UpdateCourseTariffI
} from '@/types/courses';

const { axios } = PodgotovkaAPI;
const SERVICE_PATH = '/core/v1/courses';

export type CoursesFilters = {
  limit?: number;
  skip?: number;
  subject_id?: number;
  status?: CourseStatus;
};

function getCourses(
  filters: CoursesFilters
): Promise<AxiosResponse<CourseI[]>> {
  return axios.get<CourseI[]>(`${SERVICE_PATH}`, { params: { ...filters } });
}

function getCourseDetail(
  course_id: number
): Promise<AxiosResponse<CourseEditDetailI>> {
  return axios.get<CourseEditDetailI>(`${SERVICE_PATH}/${course_id}`);
}

function updateCourse(
  course_id: number,
  course: UpdateCourseDataI
): Promise<AxiosResponse<CourseEditDetailI>> {
  return axios.patch<CourseEditDetailI>(`${SERVICE_PATH}/${course_id}`, course);
}

function getCourseTariff(
  course_id: number
): Promise<AxiosResponse<CourseTariffI | null>> {
  return axios.get<CourseTariffI | null>(`${SERVICE_PATH}/${course_id}/tariff`);
}

// TODO: request data
function updateCourseTariff(
  course_id: number,
  tariff: UpdateCourseTariffI
): Promise<AxiosResponse<CourseTariffI>> {
  return axios.patch<CourseTariffI>(
    `${SERVICE_PATH}/${course_id}/tariff`,
    tariff
  );
}

export const CoursesAPI = {
  getCourses,
  getCourseDetail,
  getCourseTariff,
  updateCourse,
  updateCourseTariff
};
