import { LevelI, OptionI, TariffValueType } from './common';
import { SubjectI } from './subjects';

export type CourseStatus = 'draft' | 'archive' | 'removed' | 'published';

interface CourseBaseI {
  id: number;
  name?: string;
  description?: string;
  time_start?: number;
  time_finish?: number;
}

export interface CourseI extends CourseBaseI {
  status: CourseStatus;
}

export interface CourseEditI extends CourseBaseI {
  subject_id: number;
  tariff: {
    values: TariffValueType[];
  };
}

export interface CourseEditDetailI extends CourseBaseI {
  status: CourseStatus;
  subject: SubjectI;
  tariff?: {
    levels?: LevelI[];
    options?: OptionI[];
    values?: TariffValueType[];
  };
}
