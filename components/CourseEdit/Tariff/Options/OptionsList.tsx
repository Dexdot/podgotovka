/* eslint-disable react/jsx-props-no-spreading */

import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { reorderDND } from '@/utils/common';
import { CourseEditContext } from '@/store/course-edit';

import cls from './Options.module.scss';
import { Option } from './Option';

export const OptionsList: React.FC = observer(() => {
  const store = useContext(CourseEditContext);

  const { options, setOptions } = store;

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
});
