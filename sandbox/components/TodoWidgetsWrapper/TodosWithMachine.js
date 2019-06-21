import React from 'react';
import PropTypes from 'prop-types';
import { useMachine } from '@xstate/react';

import TodoWidgetWrapper from './TodoWidgetsWrapper';
import todosMachine from './todosMachine';

const TodosWithMachine = ({
  todos,
  createTodo,
  editTodo,
  toggleTodo,
  deleteTodo
}) => {
  const machineWithActions = todosMachine.withConfig({
    actions: {
      createTodoWhenTitleNotEmpty: (_, { title }) => {
        if (title.length > 0) {
          createTodo({ title });
        }
      },
      editTodo: ({ todo, editedTodoValue }, _) =>
        editTodo({ todo, newTitle: editedTodoValue }),
      toggleTodo: ({ todo }, _) => toggleTodo({ todo }),
      deleteTodo: ({ todo }, _) => deleteTodo({ todo }),
      editTodoWhenEditValueIsDifferent: ({ todo, editedTodoValue }, _) => {
        if (todo.title !== editedTodoValue) {
          editTodo({ todo, newTitle: editedTodoValue });
        }
      }
    }
  });

  const [_, __, service] = useMachine(machineWithActions, { devTools: true });

  return (
    <TodoWidgetWrapper
      machineService={service}
      todos={todos}
      createTodo={createTodo}
      editTodo={editTodo}
      toggleTodo={toggleTodo}
      deleteTodo={deleteTodo}
    />
  );
};

TodosWithMachine.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired
    })
  ),
  createTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
};

export default TodosWithMachine;
