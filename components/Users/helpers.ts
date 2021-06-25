import { DropdownItem } from '@/components/common/Dropdown/Dropdown';

export const statuses: DropdownItem[] = [
  { id: 'true', text: 'Активен' },
  { id: 'false', text: 'Заблокирован' }
];

export const roles: DropdownItem[] = [
  { id: 'admin', text: 'Админ' },
  { id: 'teacher', text: 'Учитель' },
  { id: 'checker', text: 'Хоум-чекер' },
  { id: 'curator', text: 'Куратор' },
  { id: 'helper', text: 'Хэлпер' }
];
