import styled from 'styled-components';

export interface propsTaskList {
  isDragging: boolean;
}

const ContainerColumn = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div<propsTaskList>`
  padding: 8px;
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-height: 100px;
  background-color: ${(props) => (props.isDragging ? 'skyblue' : 'white')};
`;

const ContainerTask = styled.div<propsTaskList>`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  display: flex;
  background-color: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
`;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  margin-right: 8px;
`;
export { ContainerColumn, Title, TaskList, ContainerTask, Handle };
