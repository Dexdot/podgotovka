import { DropdownItem } from '@/components/common/Dropdown/Dropdown';
import { CourseI, CourseStatus } from '@/types/courses';
import { COURSE_STATUSES } from '@/utils/consts';

const photo_link =
  'https://storage.yandexcloud.net/nastavnik-data-dev/tmp/enpzmm/rqtlrg/obzqca/nurfek/gvguba/qauedy/a7b8c7a1-d0a9-45b6-bca1-b417b80bf17c.jpg';

export const courses: CourseI[] = [
  {
    photo_link,
    id: 1,
    name: 'СГ Сентябрь',
    status: 'published',
    time_start: 1630443600,
    time_finish: 1632949200
  },
  {
    photo_link,
    id: 2,
    name: 'Пандора',
    status: 'draft',
    time_start: 1633035600,
    time_finish: 1635109200
  },
  {
    photo_link,
    id: 3,
    name: 'Марс',
    status: 'removed',
    time_start: 1630270800,
    time_finish: 1632949200
  },
  {
    photo_link,
    id: 4,
    name: 'Марс +',
    status: 'archive',
    time_start: 1628974800,
    time_finish: 1654981200
  }
];

export const statusesMap: Record<CourseStatus, DropdownItem> = {
  draft: { id: COURSE_STATUSES.draft, text: 'Черновик' },
  archive: { id: COURSE_STATUSES.archive, text: 'В архиве' },
  published: { id: COURSE_STATUSES.published, text: 'Опубликовано' },
  removed: { id: COURSE_STATUSES.removed, text: 'Удален' }
};

export const statuses: DropdownItem[] = [...Object.values(statusesMap)];

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
