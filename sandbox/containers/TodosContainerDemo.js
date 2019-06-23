import React from 'react';
import { useMachine } from '@xstate/react';

import TodoWidgetWrapper from '../components/TodoWidgetsWrapper/TodoWidgetsWrapper';
import todosMachine from '../states/todos/todosMachine';
import initialState from '../states/todos/initialState';
import {
  createTodo,
  editTodo,
  toggleTodo,
  deleteTodo
} from '../states/todos/stateTransformers';

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
  const [todos, setTodos] = React.useState(loadFromLocalStorage());
  const [todo, setTodo] = React.useState({});
  const [editedTodoValue, setEditedTodoValue] = React.useState('');
  const [newTodoTitle, setNewTodoTitle] = React.useState('');
  console.log('todos:', todos);
  console.log('todo:', todo);
  console.log('editedTodoValue:', editedTodoValue);
  console.log('newTodoTitle:', newTodoTitle);
  console.log('--------');

  const setTodosAndSave = todos => {
    setTodos(todos);
    saveToLocalStorage(todos);
  };
  const todosMachineWithActions = todosMachine.withConfig({
    actions: {
      updateTodosEnterExistingTodoEdit: (_, { todo }) => {
        setEditedTodoValue(todo.title);
        setTodo(todo);
      },
      updateEditedTodoValue: (_, event) => {
        console.log('updateEditedTodoValue: title:', event.title);
        setEditedTodoValue(event.title);
      },
      updateNewTodoValue: (_, event) => setNewTodoTitle(event.title),
      createTodoWhenTitleNotEmpty: (
        _,
        __ // TODO: Check why not working
      ) => {
        console.log('edit: newTodoTitle', newTodoTitle);
        setTodosAndSave(
          newTodoTitle.length > 0
            ? createTodo(todos, { title: newTodoTitle })
            : todos
        );
      },
      resetNewTodoInput: (_, __) => {
        console.log('reset');
        setNewTodoTitle('');
      },
      editTodo: (
        _,
        __ // TODO: Check why not working
      ) => {
        console.log('editTodo: editedTodoValue:', editedTodoValue);
        console.log('editTodo: todo:', todo);
        console.log('editTodo: todos:', todos);
        const newTodos = editTodo(todos, { todo, newTitle: editedTodoValue });

        setTodosAndSave(newTodos);
      },
      toggleTodo: (_, { todo }) => setTodosAndSave(toggleTodo(todos, { todo })),
      deleteTodo: (_, { todo }) => {
        console.log('deleteTodo: todos:', todos);
        setTodosAndSave(deleteTodo(todos, { todo }));
      },
      editTodoWhenEditValueIsDifferent: (_, __) =>
        setTodosAndSave(
          todo.title !== editedTodoValue
            ? editTodo(todos, { todo, newTitle: editedTodoValue })
            : todos
        )
    }
  });
  const [current, send] = useMachine(todosMachineWithActions, {
    devTools: true
  });
  return (
    <TodoWidgetWrapper
      currentTodosMachineStateNode={current}
      send={send}
      todos={todos}
      todo={todo}
      editedTodoValue={editedTodoValue}
      newTodoTitle={newTodoTitle}
    />
  );
};

export default TodosContainer;
