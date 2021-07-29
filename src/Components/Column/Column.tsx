import React, { FC } from 'react';
import styled from 'styled-components';
import {
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import puntos from '../../Assets/Images/mas.png';
import Task from '../Task/Task';
import { task, columna } from '../../Types/taks';
import {
  ContainerColumn,
  Handle,
  TaskList,
  Title,
} from '../Common-Components/Common-componets';

interface propTypes {
  column: columna;
  tasks: task[];
  index: number;
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Column: FC<propTypes> = ({ column, tasks, index }) => (
  <Draggable draggableId={column.id} index={index}>
    {(provided: DraggableProvided) => (
      <ContainerColumn {...provided.draggableProps} ref={provided.innerRef}>
        <Container>
          <Handle {...provided.dragHandleProps}>
            <img src={puntos} alt="puntos" style={{ width: '100%' }} />
          </Handle>
          <Title>{column.title}</Title>
        </Container>
        <Droppable droppableId={column.id}>
          {(
            providedDroppable: DroppableProvided,
            snapshot: DroppableStateSnapshot,
          ) => (
            <TaskList
              ref={providedDroppable.innerRef}
              {...providedDroppable.droppableProps}
              isDragging={snapshot.isDraggingOver}>
              {tasks.map((tas, inde) => (
                <Task key={tas.id} task={tas} index={inde} />
              ))}
              {providedDroppable.placeholder}
            </TaskList>
          )}
        </Droppable>
      </ContainerColumn>
    )}
  </Draggable>
);

export default Column;
