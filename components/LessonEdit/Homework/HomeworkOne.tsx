import React, { useContext, useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import { HWEditContext } from '@/store/homework-edit';
import { HWUpdateTestQuestionI } from '@/types/homeworks';

import cls from './Homework.module.scss';
import { Questions } from './Questions/Questions';
import { Description } from './Description';
import { Answer } from './Answer';
import { Weight } from './Weight';
import { Text } from './Text';

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

  // Selected question
  const {
    setDescriptionBlocksOne,
    setQuestionFullMatchOne,
    setQuestionAnswerOne,
    setQuestionWeightOne,
    setTextBlocksOne
  } = store;
  const selectedQuestion = questionsOne.find(
    (q) => q.id === selectedQuestionOne
  );

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

      <section className={cls.question}>
        {selectedQuestion && (
          <>
            <Description
              key={selectedQuestion.id}
              blocks={selectedQuestion.descriptionBlocks}
              onChange={(bs) =>
                setDescriptionBlocksOne(selectedQuestion.id, bs)
              }
            />
            <div className={cls.hr} />
            <Answer
              id={selectedQuestion.id}
              checked={selectedQuestion.only_full_match}
              onChecked={(checked) =>
                setQuestionFullMatchOne(selectedQuestion.id, checked)
              }
              answer={selectedQuestion.right_answer_text}
              onAnswerChange={(answer) =>
                setQuestionAnswerOne(selectedQuestion.id, answer)
              }
            />
            <div className={cls.hr} />
            <Weight
              weight={selectedQuestion.weight}
              onChange={(v) => setQuestionWeightOne(selectedQuestion.id, v)}
            />
            <div className={cls.hr} />
            <Text
              key={selectedQuestion.id}
              blocks={selectedQuestion.textBlocks}
              onChange={(bs) => setTextBlocksOne(selectedQuestion.id, bs)}
            />
          </>
        )}
      </section>
    </div>
  );
});
