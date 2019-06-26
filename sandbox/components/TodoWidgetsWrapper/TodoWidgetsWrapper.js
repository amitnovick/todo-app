import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

import TodoList from './components/TodoList/TodoList';
import CreateTodoTextbox from './components/CreateTodoTextbox';

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

const todoDiv = css`
  ${centeredDivStyle}
  ${todoMvcStyle}
`;

const TodoWidgetsWrapper = ({
  currentTodosMachineStateNode,
  send,
  newTodoTitle,
  editedTodoValue,
  todo,
  todos
}) => {
  const uiState = currentTodosMachineStateNode.value;
  const isCreateTodoTextboxBeingEdited = uiState === 'editingNew';
  const isTodoListBeingEdited = uiState === 'editingExisting';
  return (
    <div className={todoDiv}>
      <CreateTodoTextbox
        onHitEnterKey={() => send({ type: 'EDITING_NEW_HIT_ENTER_KEY' })}
        isBeingEdited={isCreateTodoTextboxBeingEdited}
        onClick={() => send('CLICK_NEW_TODO_TEXTBOX')}
        onBlur={() => send('EDITING_NEW_CLICK_AWAY')}
        onInputChange={args =>
          send({ ...args, type: 'EDITING_NEW_INPUT_CHANGE' })
        }
        inputValue={newTodoTitle}
      />
      <TodoList
        todos={todos}
        onDelete={({ todo }) => send({ type: 'CLICK_DELETE_BUTTON', todo })}
        onToggle={({ todo }) => send({ type: 'CLICK_TOGGLE_BUTTON', todo })}
        onBlur={() => send('EDITING_EXISTING_CLICK_AWAY')}
        onClickTitle={({ todo }) =>
          send({ type: 'CLICK_EXISTING_TODO_TITLE', todo })
        }
        editedTodo={todo}
        editedTodoValue={editedTodoValue}
        isBeingEdited={isTodoListBeingEdited}
        onChangeEditedTodoValue={args =>
          send({ ...args, type: 'CHANGE_EDITED_TODO_VALUE' })
        }
        onHitEnterKey={() => send('HIT_ENTER_KEY')}
      />
    </div>
  );
};

TodoWidgetsWrapper.propTypes = {
  currentTodosMachineStateNode: PropTypes.any.isRequired,
  send: PropTypes.func.isRequired
};

export default TodoWidgetsWrapper;
