import React from 'react';
import { useMachine } from '@xstate/react';

import TodoWidgetWrapper from '../components/TodoWidgetsWrapper/TodoWidgetsWrapper';
import todosMachine from '../states/todos/todosMachine';
import initialState from '../states/todos/initialState';

/////////////////// UTILS ////////////
const NAMESPACE = 'todos';

const saveToLocalStorage = data =>
  localStorage.setItem(NAMESPACE, JSON.stringify(data));

const loadFromLocalStorage = () => {
  const localStorageData = localStorage.getItem(NAMESPACE);
  return localStorageData == null ? initialState : JSON.parse(localStorageData);
};
/////////////////// UTILS ////////////

const TodosContainer = () => {
  const [current, send] = useMachine(todosMachine, { devTools: true });
  const [todos, setTodos] = React.useState(loadFromLocalStorage());
  const setTodosAndSave = todos => {
    setTodos(todos);
    saveToLocalStorage(todos);
  };
  return (
    <TodoWidgetWrapper currentTodosMachineStateNode={current} send={send} />
  );
};

export default TodosContainer;
