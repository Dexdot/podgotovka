/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { reorderDND } from '@/utils/common';

import cls from './Questions.module.scss';
import { Question, QuestionI } from './Question';

type Props = {
  questions: QuestionI[];
  selectedID: string;
  onNameChange: (id: string, name: string) => void;
  onOrderChange: (ids: string[]) => void;
  onQuestionClick: (id: string) => void;
};

export const QuestionsList: React.FC<Props> = ({
  questions,
  selectedID,
  onNameChange,
  onOrderChange,
  onQuestionClick
}) => {
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const reordered = reorderDND(
      questions,
      result.source.index,
      result.destination.index
    );

    onOrderChange(reordered.map(({ id }) => id));
  };

  return (
    <div className={cls.list_wrap}>
      <ul className={cls.orders}>
        {questions.map((q, i) => (
          <li key={q.id}>
            <span className={cls.order_number}>{i + 1}.</span>
          </li>
        ))}
      </ul>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="vertical">
          {(provided) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={cls.list}
            >
              {questions.map((question, i) => {
                const key = question.id;

                return (
                  <Draggable key={key} draggableId={key} index={i}>
                    {({ innerRef, draggableProps, dragHandleProps }) => (
                      <li
                        key={key}
                        ref={innerRef}
                        {...draggableProps}
                        style={draggableProps.style}
                      >
                        <Question
                          isSelected={key === selectedID}
                          question={question}
                          onNameChange={(n) => onNameChange(key, n)}
                          dragHandleProps={dragHandleProps}
                          onQuestionClick={onQuestionClick}
                        />
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
