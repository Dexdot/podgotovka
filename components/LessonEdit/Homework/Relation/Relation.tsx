import React, { useContext, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import { AddButton } from '@/components/common/AddButton/AddButton';
import { HWEditContext } from '@/store/homework-edit';
import { HWUpdateTestQuestionI } from '@/types/homeworks';

import { useWindowClick } from '@/hooks/useWindowClick';
import cls from './Relation.module.scss';
import { DeleteIcon } from './icons';

export const Relation: React.FC = observer(() => {
  const {
    invalidQuestionsOne,
    questionsOne,
    selectedQuestionIDOne,
    addRelationID,
    removeRelationID
  } = useContext(HWEditContext);
  const [isOpen, setOpen] = useState(false);

  const qsns = useMemo(() => {
    const ids = [...invalidQuestionsOne, selectedQuestionIDOne];
    return questionsOne.filter((q) => !ids.includes(q.id));
  }, [invalidQuestionsOne, questionsOne, selectedQuestionIDOne]);

  const parentQuestionIndex = questionsOne.findIndex((q) =>
    q.relation_ids?.includes(selectedQuestionIDOne)
  );
  const parentQuestion: HWUpdateTestQuestionI | undefined =
    questionsOne[parentQuestionIndex];

  useWindowClick((e) => {
    if (!e.target.closest(`.${cls.root}`)) {
      setOpen(false);
    }
  });

  return (
    <div className={cls.root}>
      {parentQuestion ? (
        <div className={cls.question}>
          <div>
            <span>{parentQuestionIndex + 1}.</span>
            {parentQuestion.name}
          </div>
          <button
            type="button"
            onClick={() =>
              removeRelationID(parentQuestion.id, selectedQuestionIDOne)
            }
          >
            <DeleteIcon />
          </button>
        </div>
      ) : (
        <>
          <AddButton
            text="Добавить родительский вопрос"
            onClick={() => setOpen(!isOpen)}
            disabled={qsns.length <= 0}
          />

          <ul className={cn(cls.list, { [cls.list_open]: isOpen })}>
            {qsns.map((q, i) => (
              <li key={q.id}>
                <button
                  type="button"
                  onClick={() => {
                    addRelationID(q.id, selectedQuestionIDOne);
                    setOpen(false);
                  }}
                >
                  <span>{i + 1}</span>
                  {q.name}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
});
