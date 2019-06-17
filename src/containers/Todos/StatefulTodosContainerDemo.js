import React from 'react';
import uuid from 'uuid/v4';
import TodosContainerDemo from './TodosContainerDemo';

const defaultInitialData = [
  {
    id: uuid(),
    title: 'Run house chores',
    completed: true,
    createdAt: new Date().toISOString()
  },
  {
    id: uuid(),
    title: 'Cook dinner',
    completed: true,
    createdAt: new Date().toISOString()
  },
  {
    id: uuid(),
    title: 'Do what you really want!',
    completed: false,
    createdAt: new Date().toISOString()
  }
];
/////////////////// UTILS ////////////
const NAMESPACE = 'todos';

const saveToLocalStorage = data =>
  localStorage.setItem(NAMESPACE, JSON.stringify(data));

const loadFromLocalStorage = () => {
  const localStorageData = localStorage.getItem(NAMESPACE);
  return localStorageData == null
    ? defaultInitialData
    : JSON.parse(localStorageData);
};

/////////////////// UTILS ////////////

const StatefulTodosContainerDemo = () => {
  const [todos, setTodos] = React.useState(loadFromLocalStorage());
  const setTodosAndSave = todos => {
    setTodos(todos);
    saveToLocalStorage(todos);
  };
  return <TodosContainerDemo todos={todos} setTodos={setTodosAndSave} />;
};

export default StatefulTodosContainerDemo;
