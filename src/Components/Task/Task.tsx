import React, { FC } from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { ContainerTask } from '../Common-Components/Common-componets';

type propTypes = {
  task: {
    id: string;
    content: string;
  };
  index: number;
};
const Task: FC<propTypes> = ({ task, index }) => (
  <Draggable draggableId={task.id} index={index}>
    {(provided: DraggableProvided) => (
      <ContainerTask
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}>
        {task.content}
      </ContainerTask>
    )}
  </Draggable>
);

export default Task;
