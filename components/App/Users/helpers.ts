import { RoleType } from '@/types/app/users';

import { DropdownType } from '@/components/common/Dropdown/Dropdown';

export const anyStatus: DropdownType = { id: '', text: 'Все' };
export const anyRole: DropdownType = { id: '', text: 'Все роли' };
export const anySubject: DropdownType = { id: '', text: 'Все предметы' };

export const statuses: DropdownType[] = [
  { id: 'true', text: 'Активен' },
  { id: 'false', text: 'Заблокирован' }
];

export const roles: DropdownType[] = [
  { id: 'admin', text: 'Админ' },
  { id: 'teacher', text: 'Учитель' },
  { id: 'checker', text: 'Хоум-чекер' },
  { id: 'curator', text: 'Куратор' },
  { id: 'helper', text: 'Хэлпер' }
];

export const roleHasSubject = (role: RoleType): boolean =>
  role === 'teacher' || role === 'checker';
