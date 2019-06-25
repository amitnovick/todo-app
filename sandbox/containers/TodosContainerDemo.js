import React from 'react';
import { useMachine } from '@xstate/react';
import { Atom, useAtom, deref, swap } from '@dbeining/react-atom';

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
const initialAtomState = {
  todos: loadFromLocalStorage(),
  todo: {},
  editedTodoValue: '',
  newTodoTitle: ''
};

const atom = Atom.of(initialAtomState);

const setTodosAndSave = todos => {
  swap(atom, currentAtom => ({ ...currentAtom, todos: todos }));
  saveToLocalStorage(todos);
};
const todosMachineWithActions = todosMachine.withConfig({
  actions: {
    updateTodosEnterExistingTodoEdit: (_, { todo }) => {
      swap(atom, currentAtom => ({
        ...currentAtom,
        editedTodoValue: todo.title,
        todo: todo
      }));
    },
    updateEditedTodoValue: (_, event) => {
      swap(atom, currentAtom => ({
        ...currentAtom,
        editedTodoValue: event.title
      }));
    },
    updateNewTodoValue: (_, event) =>
      swap(atom, currentAtom => ({
        ...currentAtom,
        newTodoTitle: event.title
      })),
    createTodoWhenTitleNotEmpty: (_, __) => {
      const { newTodoTitle, todos } = deref(atom);
      setTodosAndSave(
        newTodoTitle.length > 0
          ? createTodo(todos, { title: newTodoTitle })
          : todos
      );
    },
    resetNewTodoInput: (_, __) => {
      swap(atom, currentAtom => ({ ...currentAtom, newTodoTitle: '' }));
    },
    editTodo: (_, __) => {
      const { editedTodoValue, todos, todo } = deref(atom);
      const newTodos = editTodo(todos, { todo, newTitle: editedTodoValue });

      setTodosAndSave(newTodos);
    },
    toggleTodo: (_, { todo }) => {
      const { todos } = deref(atom);
      setTodosAndSave(toggleTodo(todos, { todo }));
    },
    deleteTodo: (_, { todo }) => {
      const { todos } = deref(atom);
      setTodosAndSave(deleteTodo(todos, { todo }));
    },
    editTodoWhenEditValueIsDifferent: (_, __) => {
      const { todos, todo, editedTodoValue } = deref(atom);
      setTodosAndSave(
        todo.title !== editedTodoValue
          ? editTodo(todos, { todo, newTitle: editedTodoValue })
          : todos
      );
    }
  }
});

const TodosContainer = () => {
  const { todos, todo, editedTodoValue, newTodoTitle } = useAtom(atom);

  const [current, send] = useMachine(todosMachineWithActions);

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
