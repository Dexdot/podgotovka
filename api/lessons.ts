import { AxiosResponse } from 'axios';

import { PodgotovkaAPI } from '@/api/instance';
import { LessonI } from '@/types/lessons';

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

export const LessonsAPI = {
  getCourseLessons
};
