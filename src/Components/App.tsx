import React, { FC } from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@material-ui/core';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import useApp from '../Hooks/useApp';
import { initialDataType } from '../Types/taks';
import Column from './Column/Column';

const Container = styled.div`
  display: flex;
`;

const App: FC = () => {
  const { onDragEnd, state, setState, setInputs, inputs } = useApp();
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
