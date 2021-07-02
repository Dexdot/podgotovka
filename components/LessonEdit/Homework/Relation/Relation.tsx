import React, { useContext, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import { AddButton } from '@/components/common/AddButton/AddButton';
import { HWEditContext } from '@/store/homework-edit';

import { useWindowClick } from '@/hooks/useWindowClick';
import cls from './Relation.module.scss';

export const Relation: React.FC = observer(() => {
  const {
    invalidQuestionsOne,
    questionsOne,
    selectedQuestionIDOne,
    selectedQuestionOne,
    addRelationID,
    removeRelationID
  } = useContext(HWEditContext);
  const [isOpen, setOpen] = useState(false);

  const qsns = useMemo(() => {
    const ids = [...invalidQuestionsOne, selectedQuestionIDOne];
    return questionsOne.filter((q) => !ids.includes(q.id));
  }, [invalidQuestionsOne, questionsOne, selectedQuestionIDOne]);

  const parentQuestion = questionsOne.find((q) =>
    q.relation_ids?.includes(selectedQuestionIDOne)
  );

  useWindowClick((e) => {
    if (!e.target.closest(`.${cls.root}`)) {
      setOpen(false);
    }
  });

  return (
    <div className={cls.root}>
      {parentQuestion ? (
        'parent'
      ) : (
        <>
          <AddButton
            text="Добавить родительскую задачу"
            onClick={() => setOpen(!isOpen)}
            disabled={qsns.length <= 0}
          />

          <ul className={cn(cls.list, { [cls.list_open]: isOpen })}>
            {qsns.map((q, i) => (
              <li key={q.id}>
                <button
                  type="button"
                  onClick={() => {
                    // todo:
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
