import { DropdownType } from '@/components/common/Dropdown/Dropdown';

export const anySubject: DropdownType = { id: '', text: 'Все предметы' };

export const statuses: DropdownType[] = [
  { id: '', text: 'Все' },
  { id: 'true', text: 'Активен' },
  { id: 'false', text: 'Заблокирован' }
];

export const roles: DropdownType[] = [
  { id: '', text: 'Все роли' },
  { id: 'admin', text: 'Админ' },
  { id: 'teacher', text: 'Учитель' },
  { id: 'checker', text: 'Хоум-чекер' },
  { id: 'curator', text: 'Куратор' },
  { id: 'helper', text: 'Хэлпер' }
];
