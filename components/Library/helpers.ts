export interface MaterialI {
  id: number;
  name: string;
  description: string;
  isPublished: boolean;
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
        description: 'описание для материала 1',
        isPublished: true
      },
      {
        id: 2,
        name: 'Международная система единиц (СИ)',
        description: 'описание для материала 2',
        isPublished: false
      },
      {
        id: 3,
        name: 'Таблица кратности и дольности',
        description: 'описание для материала 3',
        isPublished: true
      },
      {
        id: 4,
        name: 'Измерения в физике',
        description: 'описание для материала 4',
        isPublished: true
      },
      {
        id: 5,
        name: 'Масса',
        description: 'описание для материала 5',
        isPublished: true
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
        description: 'описание для материала 6',
        isPublished: true
      },
      {
        id: 7,
        name: 'Материальная точка',
        description: 'описание для материала 7',
        isPublished: true
      },
      {
        id: 8,
        name: 'Кинематика',
        description: 'описание для материала 8',
        isPublished: false
      },
      {
        id: 9,
        name: 'Траектория, перемещение, путь',
        description: 'описание для материала 9',
        isPublished: true
      },
      {
        id: 10,
        name: 'Скорость',
        description: 'описание для материала 10',
        isPublished: true
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
        description: 'описание для материала 11',
        isPublished: true
      },
      {
        id: 12,
        name: 'Диффузия и броуновское движение',
        description: 'описание для материала 12',
        isPublished: false
      },
      {
        id: 13,
        name: 'Основные характеристики вещества',
        description: 'описание для материала 13',
        isPublished: true
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
        description: 'описание для материала 14',
        isPublished: false
      },
      {
        id: 15,
        name: 'Внутренняя энергия и способы её изменения',
        description: 'описание для материала 15',
        isPublished: true
      },
      {
        id: 16,
        name: 'Внутренняя энергия идеального газа',
        description: 'описание для материала 16',
        isPublished: true
      }
    ]
  }
];

export const TODO_MATERIAL_AUTHOR: MaterialAuthorI = {
  id: 1,
  name: 'Иванов Иван',
  created_at: 1625054751
};

export const TODO_MATERIAL_DESC = [
  {
    id: 'XBVSZsl67h',
    type: 'header',
    data: {
      text: 'Key features',
      level: 3
    }
  },
  {
    id: 'XSeggNtkUT',
    type: 'list',
    data: {
      style: 'unordered',
      items: [
        'It is a block-styled editor',
        'It returns clean data output in JSON',
        'Designed to be extendable and pluggable with a simple API'
      ]
    }
  },
  {
    id: 'gClvzZheK6',
    type: 'header',
    data: {
      text: 'What does it mean «block-styled editor»',
      level: 3
    }
  },
  {
    id: 'guHBgqzVWC',
    type: 'paragraph',
    data: {
      text: 'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class="cdx-marker">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.'
    }
  },
  {
    id: 'YbWlgDL2VI',
    type: 'paragraph',
    data: {
      text: 'There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.'
    }
  }
];

interface SearchResultsI extends MaterialI {
  subject_id: number;
}

export const TODO_SEARCH_RESULTS: SearchResultsI[] = [
  {
    id: 1,
    name: 'Оформление задач',
    description: 'описание для материала 1',
    subject_id: 1,
    isPublished: true
  },
  {
    id: 2,
    name: 'Международная система единиц (СИ)',
    description: 'описание для материала 2',
    subject_id: 1,
    isPublished: true
  },
  {
    id: 3,
    name: 'Таблица кратности и дольности',
    description: 'описание для материала 3',
    subject_id: 1,
    isPublished: true
  },
  {
    id: 4,
    name: 'Измерения в физике',
    description: 'описание для материала 4',
    subject_id: 1,
    isPublished: true
  },
  {
    id: 5,
    name: 'Масса',
    description: 'описание для материала 5',
    subject_id: 1,
    isPublished: true
  }
];
