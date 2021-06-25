import { OptionI } from '@/types/common';
import { CourseStatus } from '@/types/courses';

const isDevBuild = process.env.BUILD_ENV === 'development';

export const COLORS = {
  primary: '#4949d3'
};

export const API_BASE = isDevBuild
  ? 'https://devapi.podgotovka.ru'
  : 'https://api.podgotovka.ru';

export const AUTH_NAME = 'podgotovka_auth';

export const DOMAINS = {
  school: isDevBuild ? 'devschool' : 'school',
  admin: isDevBuild ? 'devadmin' : 'admin'
};

export const COURSE_STATUSES: Record<string, CourseStatus> = {
  draft: 'draft',
  archive: 'archive',
  published: 'published',
  removed: 'removed'
};

// не точно, что будут именно такие id
export const OPTION_FORMATS: OptionI[] = [
  { id: 1, name: 'Текст', type: 'string' },
  { id: 2, name: 'Число', type: 'numeric' },
  { id: 3, name: 'Да или нет', type: 'boolean' }
];
