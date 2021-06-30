export interface MaterialI {
  id: number;
  name: string;
  description: string;
}

export interface CategoryI {
  id: number;
  name: string;
  materials: MaterialI[];
}

export interface MaterialAuthorI {
  id: number;
  name: string;
  photo_link?: string;
  created_at: number;
}

export const TODO_CATEGORIES: CategoryI[] = [
  {
    id: 1,
    name: 'Общее',
    materials: [
      {
        id: 1,
        name: 'Оформление задач',
        description: 'описание для материала 1'
      },
      {
        id: 2,
        name: 'Международная система единиц (СИ)',
        description: 'описание для материала 2'
      },
      {
        id: 3,
        name: 'Таблица кратности и дольности',
        description: 'описание для материала 3'
      },
      {
        id: 4,
        name: 'Измерения в физике',
        description: 'описание для материала 4'
      },
      {
        id: 5,
        name: 'Масса',
        description: 'описание для материала 5'
      }
    ]
  },
  {
    id: 2,
    name: 'Кинематика',
    materials: [
      {
        id: 6,
        name: 'Механическое движение',
        description: 'описание для материала 6'
      },
      {
        id: 7,
        name: 'Материальная точка',
        description: 'описание для материала 7'
      },
      {
        id: 8,
        name: 'Кинематика',
        description: 'описание для материала 8'
      },
      {
        id: 9,
        name: 'Траектория, перемещение, путь',
        description: 'описание для материала 9'
      },
      {
        id: 10,
        name: 'Скорость',
        description: 'описание для материала 10'
      }
    ]
  },
  {
    id: 3,
    name: 'Молекулярно-кинетическая теория',
    materials: [
      {
        id: 11,
        name: 'Основные положения МКТ и их опытное обоснование',
        description: 'описание для материала 11'
      },
      {
        id: 12,
        name: 'Диффузия и броуновское движение',
        description: 'описание для материала 12'
      },
      {
        id: 13,
        name: 'Основные характеристики вещества',
        description: 'описание для материала 13'
      }
    ]
  },
  {
    id: 4,
    name: 'Термодинамика',
    materials: [
      {
        id: 14,
        name: 'Внутренняя энергия',
        description: 'описание для материала 14'
      },
      {
        id: 15,
        name: 'Внутренняя энергия и способы её изменения',
        description: 'описание для материала 15'
      },
      {
        id: 16,
        name: 'Внутренняя энергия идеального газа',
        description: 'описание для материала 16'
      }
    ]
  }
];

export const TODO_MATERIAL_AUTHOR: MaterialAuthorI = {
  id: 1,
  name: 'Иванов Иван',
  created_at: 1625054751
};
