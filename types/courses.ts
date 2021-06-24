export type CourseStatus = 'draft' | 'archive' | 'removed' | 'published';

export interface CourseI {
  id: number;
  name: string;
  photo_link: string;
  status: CourseStatus;
  time_start: number;
  time_finish: number;
}
