/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { LevelType, OptionI } from '@/types/common';
import { reorderDND } from '@/utils/common';

import cls from './Options.module.scss';
import { Option } from './Option';

const initialOptions: OptionI[] = [
  { id: 1, name: 'Какая-то строковая опция', type: 'string' },
  { id: 2, name: 'Беседа единомышленников', type: 'numeric' },
  { id: 3, name: 'Хэлпер', type: 'boolean' }
];

type Props = {
  levels: LevelType[];
};

export const OptionsList: React.FC<Props> = ({ levels }) => {
  const [options, setOptions] = useState(initialOptions);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const reordered = reorderDND(
      options,
      result.source.index,
      result.destination.index
    );

    setOptions(reordered);
  };

  return (
    <div className={cls.list_wrap}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-options-list" direction="vertical">
          {(provided) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={cls.list}
            >
              {options.map((option, i) => {
                const key = String(option.id);

                return (
                  <Draggable key={key} draggableId={key} index={i}>
                    {({ innerRef, draggableProps, dragHandleProps }) => (
                      <li
                        key={key}
                        ref={innerRef}
                        {...draggableProps}
                        style={draggableProps.style}
                      >
                        <Option
                          levels={levels}
                          option={option}
                          dragHandleProps={dragHandleProps}
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
