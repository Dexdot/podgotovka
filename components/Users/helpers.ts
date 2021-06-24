import { DropdownItem } from '@/components/common/Dropdown/Dropdown';

export const TODO_STATUS_ITEMS: DropdownItem[] = [
  { id: '1', text: 'Заблокирован' },
  { id: '2', text: 'Активен' }
];

export const TODO_SUBJECT_ITEMS: DropdownItem[] = [
  { id: '1', text: 'Русский (ЕГЭ)' },
  { id: '2', text: 'Физика (ЕГЭ)' },
  { id: '3', text: 'Математика (ЕГЭ)' },
  { id: '4', text: 'История (ЕГЭ)' }
];

export const TODO_ROLE_ITEMS: DropdownItem[] = [
  { id: '1', text: 'Админ' },
  { id: '2', text: 'Преподаватель' },
  { id: '3', text: 'Хоум-чекер' },
  { id: '4', text: 'Куратор' },
  { id: '5', text: 'Хэлпер' }
];

export const TODO_USERS = [
  {
    id: 1,
    name: 'Иванов Иван',
    login: 'ivanov',
    photo_link: '',
    subject_id: '1',
    role_id: '1',
    status_id: '1'
  },
  {
    id: 2,
    name: 'Петров Петр',
    login: 'petrov',
    photo_link: '',
    subject_id: '2',
    role_id: '2',
    status_id: '2'
  }
];
