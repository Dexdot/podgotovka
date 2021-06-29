import { AxiosResponse } from 'axios';

import { PodgotovkaAPI } from '@/api/instance';
import {
  CreateLessonI,
  LessonEditDetailI,
  LessonI,
  UpdateLessonI
} from '@/types/lessons';

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

function getLessonEditDetail(
  lesson_id: number
): Promise<AxiosResponse<LessonEditDetailI>> {
  return axios.get<LessonEditDetailI>(`${SERVICE_PATH}/${lesson_id}`);
}

function createLesson(
  lesson: CreateLessonI
): Promise<AxiosResponse<LessonEditDetailI>> {
  return axios.post<LessonEditDetailI>(`${SERVICE_PATH}`, lesson);
}

function updateLesson(
  lesson_id: number,
  lesson: UpdateLessonI
): Promise<AxiosResponse<LessonEditDetailI>> {
  return axios.put<LessonEditDetailI>(`${SERVICE_PATH}/${lesson_id}`, lesson);
}

export const LessonsAPI = {
  getCourseLessons,
  getLessonEditDetail,
  createLesson,
  updateLesson
};
