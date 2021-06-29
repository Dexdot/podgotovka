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
  description: string;
  type: LessonType;
  youtube_link: string;
  time_start: number;
}

export interface CreateLessonI {
  course_id: number;
  name: string;
  type: LessonType;
  time_start: number;
  description?: string;
  youtube_link?: string;
  files?: FileI[];
}

export interface UpdateLessonI {
  name: string;
  type: LessonType;
  time_start: number;
  description?: string;
  youtube_link?: string;
  files?: FileI[];
}

export interface LessonEditDetailI extends LessonI {
  course_id: number;
  created_at: number;
  files: FileI[];
}
