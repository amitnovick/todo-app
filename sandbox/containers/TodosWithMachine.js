import React from 'react';
import { useMachine } from '@xstate/react';

import TodoWidgetWrapper from '../components/TodoWidgetsWrapper/TodoWidgetsWrapper';
import todosMachine from '../states/todos/todosMachine';

// import {
//   createTodo,
//   editTodo,
//   toggleTodo,
//   deleteTodo
// } from './stateTransformers';

// import initialState from './initialState';

// const actions = {
//   updateTodosEnterExistingTodoEdit: assign({
//     editedTodoValue: (_, { todo }) => todo.title,
//     todo: (_, { todo }) => todo
//   }),
//   updateEditedTodoValue: assign({ editedTodoValue: (_, event) => event.title }),
//   updateNewTodoValue: assign({
//     newTodoTitle: (_, event) => event.title
//   }),
//   createTodoWhenTitleNotEmpty: assign({
//     todos: ({ newTodoTitle, todos }, _) =>
//       newTodoTitle.length > 0
//         ? createTodo(todos, { title: newTodoTitle })
//         : todos
//   }),
//   resetNewTodoInput: assign({
//     newTodoTitle: (_, __) => ''
//   }),
//   editTodo: assign({
//     todos: ({ todo, editedTodoValue, todos }, _) =>
//       editTodo(todos, { todo, newTitle: editedTodoValue })
//   }),
//   toggleTodo: assign({
//     todos: ({ todos }, { todo }) => toggleTodo(todos, { todo })
//   }),
//   deleteTodo: assign({
//     todos: ({ todos }, { todo }) => deleteTodo(todos, { todo })
//   }),
//   editTodoWhenEditValueIsDifferent: assign({
//     todos: ({ todo, editedTodoValue, todos }, _) =>
//       todo.title !== editedTodoValue
//         ? editTodo(todos, { todo, newTitle: editedTodoValue })
//         : todos
//   })
// }

const TodosWithMachine = () => {
  const [current, send] = useMachine(todosMachine, { devTools: true });

  return (
    <TodoWidgetWrapper currentTodosMachineStateNode={current} send={send} />
  );
};

export default TodosWithMachine;
