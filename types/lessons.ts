import { FileI } from './common';

export type LessonType =
  | 'webinar'
  | 'examwork'
  | 'extra_lesson'
  | 'psychologist'
  | 'motivation';

export interface LessonI {
  id: number;
  name: string;
  type: LessonType;
  time_start: number;
  description?: string;
  youtube_link?: string;
}

export interface CreateLessonI {
  course_id: number;
  name: string;
  type: LessonType;
  time_start: number;
  description?: string;
  youtube_link?: string;
  time_codes?: string;
  files?: FileI[];
}

export interface UpdateLessonI {
  name: string;
  type: LessonType;
  time_start: number;
  description?: string;
  youtube_link?: string;
  time_codes?: string;
  files?: FileI[];
}

export interface LessonEditDetailI extends LessonI {
  subject_id: number;
  course_id: number;
  created_at: number;
  files: FileI[];
  time_codes?: string;
  count_test_questions?: number;
}
