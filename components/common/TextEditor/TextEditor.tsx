import React from 'react';
import EditorJs from 'react-editor-js';
import type { API, OutputData } from '@editorjs/editorjs';
import cn from 'classnames';

import { EDITOR_JS_TOOLS } from './tools.js';
import { i18n } from './i18n';
import cls from './TextEditor.module.scss';

interface Props {
  data: OutputData;
  onChange?: (data: OutputData) => void;
  onReady?: () => void;
  readOnly?: boolean;
  autofocus?: boolean;
  resetStyles?: boolean;
  placeholder?: string;
}

// Use only via dynamic import:
// const TextEditor = dynamic(
//   () => import('@/components/common/TextEditor/TextEditor'),
//   { ssr: false }
// );

const TextEditor: React.FC<Props> = ({
  data,
  readOnly,
  onReady,
  onChange,
  autofocus,
  placeholder,
  resetStyles
}) => {
  return (
    <div className={cn(cls.root, { [cls.root_reset]: resetStyles })}>
      <EditorJs
        i18n={i18n}
        data={data}
        tools={EDITOR_JS_TOOLS}
        readOnly={readOnly}
        onReady={onReady}
        autofocus={autofocus}
        placeholder={placeholder}
        onChange={async (api: API) => {
          const changedData = await api.saver.save();
          if (onChange) {
            onChange(changedData);
          }
        }}
      />
    </div>
  );
};

export default TextEditor;
