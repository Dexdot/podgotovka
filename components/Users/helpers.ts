import { DropdownItem } from '@/components/common/Dropdown/Dropdown';

export const anySubject: DropdownItem = { id: '', text: 'Все предметы' };

export const statuses: DropdownItem[] = [
  { id: '', text: 'Все' },
  { id: 'true', text: 'Активен' },
  { id: 'false', text: 'Заблокирован' }
];

export const roles: DropdownItem[] = [
  { id: '', text: 'Все роли' },
  { id: 'admin', text: 'Админ' },
  { id: 'teacher', text: 'Учитель' },
  { id: 'checker', text: 'Хоум-чекер' },
  { id: 'curator', text: 'Куратор' },
  { id: 'helper', text: 'Хэлпер' }
];
