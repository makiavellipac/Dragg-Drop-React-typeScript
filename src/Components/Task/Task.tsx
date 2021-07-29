import React, { FC } from 'react';
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';
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
    {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
      <ContainerTask
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}>
        {task.content}
      </ContainerTask>
    )}
  </Draggable>
);

export default Task;
