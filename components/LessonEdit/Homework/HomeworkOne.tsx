import React, { useContext, useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import { HWEditContext } from '@/store/homework-edit';
import { HWUpdateTestQuestionI } from '@/types/homeworks';

import cls from './Homework.module.scss';
import { Questions } from './Questions/Questions';
import { Relation } from './Relation/Relation';
import { Text } from './Text';
import { Answer } from './Answer';
import { Weight } from './Weight';
import { Description } from './Description';

export const HomeworkOne: React.FC = observer(() => {
  const store = useContext(HWEditContext);

  // Questions list
  const {
    questionsOne,
    setQuestionsOne,
    selectedQuestionIDOne,
    selectQuestionOne,
    setQuestionNameOne,
    selectedQuestionOne,
    invalidQuestionsOne
  } = store;
  const questions = useMemo(
    () =>
      questionsOne.map((q) => ({
        id: String(q.id),
        name: q.name,
        showWarning: invalidQuestionsOne.includes(q.id)
      })),
    [questionsOne, invalidQuestionsOne]
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

  // Selected question data
  const {
    setDescriptionBlocksOne,
    setQuestionFullMatchOne,
    setQuestionAnswerOne,
    setQuestionWeightOne,
    setTextBlocksOne
  } = store;

  return (
    <div className={cls.root}>
      <aside className={cls.questions}>
        <Questions
          questions={questions}
          selectedID={String(selectedQuestionIDOne)}
          onQuestionClick={(id) => selectQuestionOne(Number(id))}
          onNameChange={(id, name) => setQuestionNameOne(Number(id), name)}
          onOrderChange={onOrderChange}
        />
      </aside>

      <section className={cls.question}>
        {selectedQuestionOne && (
          <>
            <Relation />
            <Text
              key={`Text-one-${selectedQuestionIDOne}`}
              blocks={selectedQuestionOne.textBlocks}
              onChange={(bs) => setTextBlocksOne(selectedQuestionIDOne, bs)}
            />
            <div className={cls.hr} />
            <Answer
              id={selectedQuestionIDOne}
              checked={selectedQuestionOne.only_full_match}
              onChecked={(checked) =>
                setQuestionFullMatchOne(selectedQuestionIDOne, checked)
              }
              answer={selectedQuestionOne.right_answer_text}
              onAnswerChange={(answer) =>
                setQuestionAnswerOne(selectedQuestionIDOne, answer)
              }
            />
            <div className={cls.hr} />
            <Weight
              weight={selectedQuestionOne.weight}
              onChange={(v) => setQuestionWeightOne(selectedQuestionIDOne, v)}
            />
            <div className={cls.hr} />
            <Description
              key={`Description-one-${selectedQuestionIDOne}`}
              blocks={selectedQuestionOne.descriptionBlocks}
              onChange={(bs) =>
                setDescriptionBlocksOne(selectedQuestionIDOne, bs)
              }
            />
          </>
        )}
      </section>
    </div>
  );
});
