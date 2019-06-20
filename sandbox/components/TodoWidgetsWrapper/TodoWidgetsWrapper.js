import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { useMachine } from '@xstate/react';

import TodoList from './components/TodoList/TodoList';
import CreateTodoTextbox from './components/CreateTodoTextbox';
import wrapperRadius from './wrapperRadius';
import colors from '../../../src/style/colors';
import todosMachine from './todosMachine';

const centeredDivStyle = `
max-width: 550px;
min-width: 230px;
margin-left: auto;
margin-right: auto;
`;

const todoMvcStyle = `
background: #fff;
position: relative;
margin: 40px 0 40px 0;
box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
  0 25px 50px 0 rgba(0, 0, 0, 0.1);
`;

const myStyle = `
outline: solid ${wrapperRadius}px ${colors.CYAN};
`;

const todoDiv = css`
  ${centeredDivStyle}
  ${todoMvcStyle}
  ${myStyle}
`;

const TodoWidgetsWrapper = ({
  // container state
  todos,
  // container methods
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
        console.log('editTodoWhenEditValueIsDifferent');
        if (todo.title !== editedTodoValue) {
          editTodo({ todo, newTitle: editedTodoValue });
        }
      }
    }
  });
  const [current, send] = useMachine(machineWithActions, { devTools: true }); // { devTools: true }
  const uiState = current.value;
  const { newTodoTitle, editedTodoValue, todo } = current.context;
  const isCreateTodoTextboxBeingEdited = uiState === 'editingNew';
  const isTodoListBeingEdited = uiState === 'editingExisting';
  const isInIdleState = uiState === 'idle';
  return (
    <div className={todoDiv}>
      <CreateTodoTextbox
        onHitEnterKey={args => send('EDITING_NEW_HIT_ENTER_KEY', args)}
        isBeingEdited={isCreateTodoTextboxBeingEdited}
        onClick={() => send('CLICK_NEW_TODO_TEXTBOX')}
        onBlur={() => send('EDITING_NEW_CLICK_AWAY')}
        onInputChange={args => send('EDITING_NEW_INPUT_CHANGE', args)}
        inputValue={newTodoTitle}
      />
      <TodoList
        todos={todos}
        onDelete={args => deleteTodo(args)}
        onEdit={args => editTodo(args)}
        onToggle={args => toggleTodo(args)}
        onBlur={() => send('EDITING_EXISTING_CLICK_AWAY')}
        onClickTitle={args => send('CLICK_EXISTING_TODO_TITLE', args)}
        editedTodo={todo}
        editedTodoValue={editedTodoValue}
        isBeingEdited={isTodoListBeingEdited}
        onChangeEditedTodoValue={args => send('CHANGE_EDITED_TODO_VALUE', args)}
        onHitEnterKey={() => send('HIT_ENTER_KEY')}
        shouldRegisterTitleClick={isInIdleState}
      />
    </div>
  );
};

TodoWidgetsWrapper.propTypes = {
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

export default TodoWidgetsWrapper;
