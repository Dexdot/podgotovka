import { DropdownType } from '@/components/common/Dropdown/Dropdown';

export const ACTION_DELETE = 'ACTION_DELETE';
export const ACTION_COPY = 'ACTION_COPY';

export const STATUS_DRAFT = 'STATUS_DRAFT';
export const STATUS_PUBLISHED = 'STATUS_PUBLISHED';

export const moreOpitons: DropdownType[] = [
  { id: ACTION_DELETE, text: 'Удалить' },
  { id: ACTION_COPY, text: 'Копировать' }
];

export const statusOptions: DropdownType[] = [
  { id: STATUS_DRAFT, text: 'Черновик' },
  { id: STATUS_PUBLISHED, text: 'Опубликовано' }
];

export const getStatusColor = (status_id?: string): string => {
  if (status_id && status_id === STATUS_PUBLISHED) {
    return 'var(--color-green)';
  }

  return 'var(--color-gray)';
};
