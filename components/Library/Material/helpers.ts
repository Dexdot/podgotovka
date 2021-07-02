import { DropdownItem } from '@/components/common/Dropdown/Dropdown';

export const ACTION_DELETE = 'ACTION_DELETE';
export const ACTION_COPY = 'ACTION_COPY';

export const STATUS_DRAFT = 'STATUS_DRAFT';
export const STATUS_PUBLISHED = 'STATUS_PUBLISHED';

export const moreOpitons: DropdownItem[] = [
  { id: ACTION_DELETE, text: 'Удалить' },
  { id: ACTION_COPY, text: 'Копировать' }
];

export const statusOptions: DropdownItem[] = [
  { id: STATUS_DRAFT, text: 'Черновик' },
  { id: STATUS_PUBLISHED, text: 'Опубликовано' }
];
