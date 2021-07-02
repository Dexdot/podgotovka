import React from 'react';

import { AddButton } from '@/components/common/AddButton/AddButton';

import cls from './Questions.module.scss';
import { QuestionsList } from './QuestionsList';
import { QuestionI } from './Question';

type Props = {
  questions: QuestionI[];
  selectedID: string;
  onNameChange: (id: string, name: string) => void;
  onOrderChange: (ids: string[]) => void;
  onQuestionClick: (id: string) => void;
  onAddClick?: (name: string) => void;
};

export const Questions: React.FC<Props> = ({
  questions,
  selectedID,
  onAddClick,
  onNameChange,
  onOrderChange,
  onQuestionClick
}) => {
  return (
    <div>
      {questions.length > 0 && (
        <QuestionsList
          questions={questions}
          selectedID={selectedID}
          onNameChange={onNameChange}
          onOrderChange={onOrderChange}
          onQuestionClick={onQuestionClick}
        />
      )}

      {onAddClick && (
        <div className={cls.add_btn}>
          <AddButton text="Добавить задание" onClick={() => onAddClick('')} />
        </div>
      )}
    </div>
  );
};
