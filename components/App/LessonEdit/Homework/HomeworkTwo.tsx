import React, { useContext, useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import { HWEditContext } from '@/store/homework-edit';
import { HWSimpleQuestionI } from '@/types/homeworks';

import cls from './Homework.module.scss';
import { Questions } from './Questions/Questions';
import { Text } from './Text';
import { Description } from './Description';
import { getEmptySimpleQuestion } from './helpers';
import { Type } from './Type';

export const HomeworkTwo: React.FC = observer(() => {
  const store = useContext(HWEditContext);

  // Questions list
  const {
    questionsTwo,
    setQuestionsTwo,
    selectedQuestionIDTwo,
    selectQuestionTwo,
    setQuestionNameTwo,
    selectedQuestionTwo,
    invalidQuestionsTwo,
    addQuestionTwo
  } = store;
  const questions = useMemo(
    () =>
      questionsTwo.map((q) => ({
        id: String(q.id),
        name: q.name,
        showWarning: invalidQuestionsTwo.includes(q.id)
      })),
    [questionsTwo, invalidQuestionsTwo]
  );

  const onOrderChange = (ids: string[]) => {
    const questionsMap: Record<string, HWSimpleQuestionI> = {};
    questionsTwo.forEach((q) => {
      questionsMap[q.id] = { ...q };
    });
    const reorderedQuestions = ids.map((id) => {
      return questionsMap[id];
    });
    setQuestionsTwo(reorderedQuestions);
  };

  // Selected question data
  const { setDescriptionBlocksTwo, setTextBlocksTwo, setQuestionTypeTwo } =
    store;

  return (
    <div className={cls.root}>
      <aside className={cls.questions}>
        <Questions
          questions={questions}
          selectedID={String(selectedQuestionIDTwo)}
          onQuestionClick={(id) => selectQuestionTwo(Number(id))}
          onNameChange={(id, name) => setQuestionNameTwo(Number(id), name)}
          onOrderChange={onOrderChange}
          onAddClick={(v) => addQuestionTwo(getEmptySimpleQuestion(v))}
        />
      </aside>

      <section className={cls.question}>
        {selectedQuestionTwo && (
          <>
            <Text
              key={`Text-two-${selectedQuestionIDTwo}`}
              blocks={selectedQuestionTwo.textBlocks}
              onChange={(bs) => setTextBlocksTwo(selectedQuestionIDTwo, bs)}
            />
            <div className={cls.hr} />
            <Type
              type={selectedQuestionTwo.type}
              onChange={(t) => setQuestionTypeTwo(selectedQuestionIDTwo, t)}
            />
            <div className={cls.hr} />
            <Description
              key={`Description-two-${selectedQuestionIDTwo}`}
              blocks={selectedQuestionTwo.descriptionBlocks}
              onChange={(bs) =>
                setDescriptionBlocksTwo(selectedQuestionIDTwo, bs)
              }
            />
          </>
        )}
      </section>
    </div>
  );
});
