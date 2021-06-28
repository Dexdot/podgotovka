import { LevelI, OptionI, TariffValueType } from './common';
import { SubjectI } from './subjects';

export type CourseStatus = 'draft' | 'archive' | 'removed' | 'published';

// TODO: Add name, photo_link on backend
export interface CourseI {
  id: number;
  name?: string;
  description?: string;
  photo_link?: string;
  time_start?: number;
  time_finish?: number;
  status: CourseStatus;
}

export interface CourseEditDetailI {
  id: number;
  name?: string;
  description?: string;
  time_start?: number;
  time_finish?: number;
  status: CourseStatus;
  subject: SubjectI;
}

export interface CourseTariffI {
  levels?: LevelI[];
  options?: OptionI[];
  values?: TariffValueType[];
}

export interface UpdateCourseTariffI {
  level_prices?: { level_id: number; price: number }[];
  values?: TariffValueType[];
}

export interface UpdateCourseDataI {
  subject_id?: number;
  name?: string;
  description?: string;
  time_start?: number;
  time_finish?: number;
}
