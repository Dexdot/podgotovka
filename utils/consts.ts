import { DirectionType } from '@/types/common';
import { CourseStatus } from '@/types/app/courses';
import { LessonType } from '@/types/app/lessons';

const isDevBuild = process.env.BUILD_ENV === 'development';

export const COLORS = {
  primary: '#4949d3'
};

export const API_BASE = isDevBuild
  ? 'https://devapi.podgotovka.ru'
  : 'https://api.podgotovka.ru';

export const AUTH_NAME = 'Kh06l5kTkzEoJMu23f1hVSB';

export const COURSE_STATUSES: Record<string, CourseStatus> = {
  draft: 'draft',
  archive: 'archive',
  published: 'published',
  removed: 'removed'
};

export const OPTION_TYPES = [
  { name: 'Текст', type: 'string' },
  { name: 'Число', type: 'numeric' },
  { name: 'Да или нет', type: 'boolean' }
];

export const DIRECTIONS_MAP: Record<DirectionType, string> = {
  USE: 'ЕГЭ',
  BSE: 'ОГЭ'
};

export const LESSON_TYPES: Record<string, LessonType> = {
  webinar: 'webinar',
  examwork: 'examwork',
  extra_lesson: 'extra_lesson',
  psychologist: 'psychologist',
  motivation: 'motivation'
};
