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
