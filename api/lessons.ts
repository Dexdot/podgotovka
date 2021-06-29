import { AxiosResponse } from 'axios';

import { PodgotovkaAPI } from '@/api/instance';
import { CreateLessonI, LessonDetailI, LessonI } from '@/types/lessons';

const { axios } = PodgotovkaAPI;
const SERVICE_PATH = '/core/v1/lessons';

export type LessonsFilters = {
  limit?: number;
  skip?: number;
};

function getCourseLessons(
  course_id: number,
  filters: LessonsFilters
): Promise<AxiosResponse<LessonI[]>> {
  return axios.get<LessonI[]>(`${SERVICE_PATH}/courses/${course_id}`, {
    params: { ...filters }
  });
}

function getLessonDetail(
  lesson_id: number
): Promise<AxiosResponse<LessonDetailI>> {
  return axios.get<LessonDetailI>(`${SERVICE_PATH}/${lesson_id}`);
}

function createLesson(
  lesson: CreateLessonI
): Promise<AxiosResponse<LessonDetailI>> {
  return axios.post<LessonDetailI>(`${SERVICE_PATH}`, lesson);
}

function updateLesson(
  lesson_id: number,
  lesson: CreateLessonI
): Promise<AxiosResponse<LessonDetailI>> {
  return axios.put<LessonDetailI>(`${SERVICE_PATH}/${lesson_id}`, lesson);
}

export const LessonsAPI = {
  getCourseLessons,
  getLessonDetail,
  createLesson,
  updateLesson
};
