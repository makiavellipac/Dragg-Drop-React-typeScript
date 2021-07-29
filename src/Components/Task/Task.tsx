import React, { FC } from 'react';
import { ContainerTask } from '../Common-Components/Common-componets';

type propTypes = {
  task: {
    id: string;
    content: string;
  };
};
const Task: FC<propTypes> = ({ task }) => (
  <ContainerTask>{task.content}</ContainerTask>
);

export default Task;
