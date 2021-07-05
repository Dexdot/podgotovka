import { DropdownType } from '@/components/common/Dropdown/Dropdown';
import { CourseI, CourseStatus } from '@/types/app/courses';
import { COURSE_STATUSES } from '@/utils/consts';

export const courses: CourseI[] = [
  {
    id: 1,
    name: 'СГ Сентябрь',
    description: 'СГ Сентябрь',
    status: 'published',
    time_start: 1630443600,
    time_finish: 1632949200
  },
  {
    id: 2,
    name: 'Пандора',
    description: 'Пандора',
    status: 'draft',
    time_start: 1633035600,
    time_finish: 1635109200
  },
  {
    id: 3,
    name: 'Марс',
    description: 'Марс',
    status: 'removed',
    time_start: 1630270800,
    time_finish: 1632949200
  },
  {
    id: 4,
    name: 'Марс +',
    description: 'Марс +',
    status: 'archive',
    time_start: 1628974800,
    time_finish: 1654981200
  }
];

export const statusesMap: Record<CourseStatus, DropdownType> = {
  draft: { id: COURSE_STATUSES.draft, text: 'Черновик' },
  archive: { id: COURSE_STATUSES.archive, text: 'В архиве' },
  published: { id: COURSE_STATUSES.published, text: 'Опубликовано' },
  removed: { id: COURSE_STATUSES.removed, text: 'Удален' }
};

export const statuses: DropdownType[] = [...Object.values(statusesMap)];

export function getStatusColor(status: CourseStatus | undefined): string {
  if (status) {
    if (status === COURSE_STATUSES.published) {
      return 'var(--color-green)';
    }

    if (status === COURSE_STATUSES.removed) {
      return 'var(--color-red)';
    }
  }

  return '#7A869A';
}
