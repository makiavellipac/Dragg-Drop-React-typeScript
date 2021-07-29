import styled from 'styled-components';

export interface propsTaskList {
  isDragging: boolean;
}

const ContainerColumn = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;

const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div<propsTaskList>`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDragging ? 'skyblue' : 'white')};
`;

const ContainerTask = styled.div<propsTaskList>`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
`;

export { ContainerColumn, Title, TaskList, ContainerTask };
