import React, { FC, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import initialData from '../Data/initial-data';
import { initialDataType } from '../Types/taks';
import Column from './Column/Column';

const App: FC = () => {
  const [state, setState] = useState<initialDataType>(initialData);
  const onDragEnd = (result: DropResult) => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {state.columnOrder.map((columnId) => {
        const column = state.columns[columnId];
        const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
};

export default App;
