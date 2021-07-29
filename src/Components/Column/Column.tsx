import React, { FC } from 'react';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import Task from '../Task/Task';
import { task, columna } from '../../Types/taks';
import {
  ContainerColumn,
  TaskList,
  Title,
} from '../Common-Components/Common-componets';

interface propTypes {
  column: columna;
  tasks: task[];
}

const Column: FC<propTypes> = ({ column, tasks }) => (
  <ContainerColumn>
    <Title>{column.title}</Title>
    <Droppable droppableId={column.id}>
      {(provided: DroppableProvided) => (
        <TaskList ref={provided.innerRef} {...provided.droppableProps}>
          {tasks.map((tas, index) => (
            <Task key={tas.id} task={tas} index={index} />
          ))}
          {provided.placeholder}
        </TaskList>
      )}
    </Droppable>
  </ContainerColumn>
);

export default Column;
