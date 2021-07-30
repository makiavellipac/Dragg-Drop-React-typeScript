import React, { FC, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DropResult,
} from 'react-beautiful-dnd';
import styled from 'styled-components';
import initialData from '../Data/initial-data';
import { initialDataType } from '../Types/taks';

import Column from './Column/Column';

const Container = styled.div`
  display: flex;
`;

type inputsType = {
  columns: string;
  task: string;
};

const App: FC = () => {
  const [state, setState] = useState<initialDataType>(initialData);
  const [inputs, setInputs] = useState<inputsType>({ columns: '', task: '' });

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return null;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return null;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      };
      setState(newState);
      return null;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      return null;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setState(newState);
    return null;
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column">
          {(provided: DroppableProvided) => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {state.columnOrder.map((columnId, index) => {
                const column = state.columns[columnId];
                const tasks = column.taskIds.map(
                  (taskId) => state.tasks[taskId],
                );
                return (
                  <Column
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
      <Container style={{ alignItems: 'center', height: '50px' }}>
        <TextField
          id="column-input columns"
          label="Column"
          variant="outlined"
          style={{ width: '60%', marginRight: '15px' }}
          onChange={(e) =>
            setInputs({
              ...inputs,
              [e.currentTarget.name]: e.currentTarget.value,
            })
          }
          value={inputs.columns}
          name="columns"
        />
        <Button
          variant="outlined"
          color="primary"
          style={{ width: '150px', height: '56px' }}
          onClick={() => {
            const nameColumn = `column-${state.columnOrder.length + 1}`;
            const column: {
              [key: string]: {
                id: string;
                title: string;
                taskIds: string[];
              };
            } = {
              [nameColumn]: {
                id: nameColumn,
                title: inputs.columns,
                taskIds: [],
              },
            };
            const newInitialData: initialDataType = {
              ...state,
              columns: { ...state.columns, ...column },
              columnOrder: [...state.columnOrder, nameColumn],
            };
            setState(newInitialData);
            setInputs({ columns: '', task: '' });
          }}>
          Añadir Columna
        </Button>
      </Container>
      <Container
        style={{ alignItems: 'center', height: '50px', marginTop: '15px' }}>
        <TextField
          id="column-input task"
          label="Task"
          variant="outlined"
          style={{ width: '60%', marginRight: '15px' }}
          onChange={(e) =>
            setInputs({
              ...inputs,
              [e.currentTarget.name]: e.currentTarget.value,
            })
          }
          value={inputs.task}
          name="task"
        />
        <Button
          variant="outlined"
          color="primary"
          style={{ width: '150px', height: '56px' }}
          onClick={() => {
            const nameTask = `task-${Object.keys(state.tasks).length + 1}`;
            const auxTasks: {
              [key: string]: {
                id: string;
                content: string;
              };
            } = {
              [nameTask]: {
                id: nameTask,
                content: inputs.task,
              },
            };
            const tas = state.columns['column-1'].taskIds;
            tas.push(nameTask);
            const newInitialData: initialDataType = {
              ...state,
              columns: {
                ...state.columns,
                'column-1': { ...state.columns['column-1'], taskIds: tas },
              },
              tasks: { ...state.tasks, ...auxTasks },
            };
            setState(newInitialData);
            setInputs({ columns: '', task: '' });
          }}>
          Añadir Task
        </Button>
      </Container>
    </>
  );
};

export default App;
