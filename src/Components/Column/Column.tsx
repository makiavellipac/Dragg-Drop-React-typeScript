import React, { FC } from 'react';
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
    <TaskList>
      {tasks.map((tas) => (
        <Task key={tas.id} task={tas} />
      ))}
    </TaskList>
  </ContainerColumn>
);

export default Column;
