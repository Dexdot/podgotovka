import React, { useContext, useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import { HWEditContext } from '@/store/homework-edit';
import { HWUpdateTestQuestionI } from '@/types/homeworks';

import cls from './Homework.module.scss';
import { Questions } from './Questions/Questions';

export const HomeworkOne: React.FC = observer(() => {
  const store = useContext(HWEditContext);

  // Questions list
  const {
    questionsOne,
    setQuestionsOne,
    selectedQuestionOne,
    selectQuestionOne,
    setQuestionNameOne
  } = store;
  const questions = useMemo(
    () =>
      questionsOne.map((q) => ({
        id: String(q.id),
        name: q.name
      })),
    [questionsOne]
  );

  const onOrderChange = (ids: string[]) => {
    const questionsMap: Record<string, HWUpdateTestQuestionI> = {};
    questionsOne.forEach((q) => {
      questionsMap[q.id] = { ...q };
    });
    const reorderedQuestions = ids.map((id) => {
      return questionsMap[id];
    });
    setQuestionsOne(reorderedQuestions);
  };

  return (
    <div className={cls.root}>
      <aside className={cls.questions}>
        <Questions
          questions={questions}
          selectedID={String(selectedQuestionOne)}
          onQuestionClick={(id) => selectQuestionOne(Number(id))}
          onNameChange={(id, name) => setQuestionNameOne(Number(id), name)}
          onOrderChange={onOrderChange}
        />
      </aside>
    </div>
  );
});
