import { LevelI, OptionI, TariffValueType } from './common';
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
  options?: OptionI[];
  values?: TariffValueType[];
}
