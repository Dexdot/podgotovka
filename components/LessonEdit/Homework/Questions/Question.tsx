/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import cn from 'classnames';
import Image from 'next/image';

import { DragIcon } from './icons';
import cls from './Questions.module.scss';

export type QuestionI = {
  id: string;
  name: string;
};

type Props = {
  isSelected: boolean;
  question: QuestionI;
  onNameChange: (name: string) => void;
  onQuestionClick: (id: string) => void;
  dragHandleProps: any;
};

export const Question: React.FC<Props> = ({
  isSelected,
  question,
  dragHandleProps,
  onNameChange,
  onQuestionClick
}) => {
  const [name, setName] = useState<string>(question.name);

  return (
    <div className={cn(cls.question, { [cls.question_selected]: isSelected })}>
      <div className={cls.drag_icon} {...dragHandleProps} tabIndex={-1}>
        <DragIcon />
      </div>
      <input
        placeholder="Новый вопрос"
        type="text"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        onBlur={() => onNameChange(name)}
        onClick={() => onQuestionClick(question.id)}
      />
      <Image src="/emoji/exclamation-mark.png" width="22" height="22" />
    </div>
  );
};
