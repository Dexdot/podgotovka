import { LevelI, LevelPriceI, OptionI, TariffValueType } from './common';
import { SubjectI } from './subjects';

export type CourseStatus = 'draft' | 'archive' | 'removed' | 'published';

export interface CourseI {
  id: number;
  name?: string;
  description?: string;
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
  level_prices?: LevelPriceI[];
  options?: OptionI[];
  values?: TariffValueType[];
}

export interface UpdateCourseTariffI {
  level_prices?: LevelPriceI[];
  values?: TariffValueType[];
  options_order?: number[];
}

export interface UpdateCourseDataI {
  subject_id?: number;
  name?: string;
  description?: string;
  time_start?: number;
  time_finish?: number;
}
