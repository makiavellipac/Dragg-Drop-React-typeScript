export type task = {
  id: string;
  content: string;
};

export type columna = {
  id: string;
  title: string;
  taskIds: string[];
};

export type initialDataType = {
  tasks: {
    [key: string]: {
      id: string;
      content: string;
    };
  };
  columns: {
    [key: string]: {
      id: string;
      title: string;
      taskIds: string[];
    };
  };
  columnOrder: string[];
};
