export interface MaterialI {
  id: number;
  name: string;
  description: string;
  category_id: number;
  subject_id: number;
}

export interface CategoryI {
  id: number;
  name: string;
}

export const TODO_MATERIALS: MaterialI[] = [
  {
    id: 1,
    category_id: 1,
    subject_id: 1,
    name: 'Оформление задач',
    description:
      '… В широком смысле природа — это весь материальный мир в многообразии его форм. … Природа в широком смысле -- весь материальный мир в многообразии его форм. … представляет собой весь материальный мир в его многообразии …'
  },
  {
    id: 2,
    category_id: 2,
    name: 'Международная система единиц (СИ)',
    subject_id: 1,
    description:
      '… под контролем человека (образование, профессия, материальный достаток, деловые связи и т. …'
  },
  {
    id: 3,
    category_id: 3,
    name: 'Механическое движение',
    subject_id: 1,
    description: 'описание тест 3'
  },
  {
    id: 4,
    category_id: 4,
    name: 'Масса',
    subject_id: 1,
    description: 'описание тест 4'
  },
  {
    id: 5,
    category_id: 5,
    name: 'Скорость',
    subject_id: 1,
    description: 'описание тест 5'
  },
  {
    id: 6,
    category_id: 1,
    name: 'Основные положения МКТ',
    subject_id: 1,
    description: 'описание тест 6'
  },
  {
    id: 7,
    category_id: 1,
    name: 'Внутренняя энергия',
    subject_id: 1,
    description: 'описание тест 7'
  },
  {
    id: 8,
    category_id: 1,
    name: 'Броуновское движение',
    subject_id: 1,
    description: 'описание тест 8'
  },
  {
    id: 9,
    category_id: 2,
    name: 'Хуй',
    subject_id: 1,
    description: 'описание тест 9'
  },
  {
    id: 10,
    category_id: 5,
    name: 'Строение атома',
    subject_id: 1,
    description: 'описание тест 10'
  }
];

export const TODO_CATEGORIES = [
  { id: 1, name: 'общее' },
  { id: 2, name: 'кинематика' },
  { id: 3, name: 'молекулярно-кинетическая теория' },
  { id: 4, name: 'термодинамика' },
  { id: 5, name: 'физика элементарных частиц' }
];
