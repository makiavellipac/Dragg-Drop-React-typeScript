import React, { FC } from 'react';
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';
import { ContainerTask, Handle } from '../Common-Components/Common-componets';
import tresPuntos from '../../Assets/Images/tres.png';

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
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}>
        <Handle {...provided.dragHandleProps}>
          <img src={tresPuntos} alt="puntos" style={{ width: '100%' }} />
        </Handle>
        {task.content}
      </ContainerTask>
    )}
  </Draggable>
);

export default Task;
