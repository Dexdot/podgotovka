import Embed from '@editorjs/embed';
import Table from 'editorjs-table-readonly';
import List from '@editorjs/list';
import Warning from '@editorjs/warning';
import Code from '@editorjs/code';
import LinkTool from '@editorjs/link';
import Image from '@editorjs/image';
import Raw from '@editorjs/raw';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import CheckList from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import SimpleImage from '@editorjs/simple-image';
import Attaches from 'editorjs-attaches-readonly';

import { uploadImage, uploadFile } from './helpers';

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: {
    class: Table,
    config: {
      InsertColBefore: 'Вставить столбец слева',
      InsertColAfter: 'Вставить столбец справа',
      InsertRowBefore: 'Вставить строку выше',
      InsertRowAfter: 'Вставить строку ниже',
      DeleteRow: 'Удалить строку',
      DeleteCol: 'Удалить столбец'
    }
  },
  list: List,
  warning: {
    class: Warning,
    inlineToolbar: true,
    config: {
      titlePlaceholder: 'Заголовок',
      messagePlaceholder: 'Сообщение'
    }
  },
  code: {
    class: Code,
    config: {
      placeholder: 'Введите код'
    }
  },
  linkTool: LinkTool,
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByFile(file) {
          return uploadImage(file);
        }
      }
    }
  },
  raw: {
    class: Raw,
    config: {
      placeholder: 'Введите HTML код'
    }
  },
  header: Header,
  quote: {
    class: Quote,
    inlineToolbar: true,
    config: {
      quotePlaceholder: 'Введите цитату',
      captionPlaceholder: 'Автор цитаты'
    }
  },
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
  attaches: {
    class: Attaches,
    config: {
      buttonText: 'Выберите файл для загрузки',
      uploader: {
        uploadByFile(file) {
          return uploadFile(file);
        }
      }
    }
  }
};
