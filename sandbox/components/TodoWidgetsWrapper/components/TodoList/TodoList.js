import React from 'react';
import PropTypes from 'prop-types';

import {
  liStyle,
  buttonStyle,
  input1Style,
  input2Style,
  ulStyle,
  divStyle,
  labelStyle
} from './style';

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

const Li = ({ ...props }) => <li {...props} className={liStyle} />;

const TodoItemBeingEdited = ({
  todo,
  editedTodoValue,
  onChangeEditedTodoValue,
  handleEditTitleKeyDown,
  onBlur
}) => {
  return (
    <Li key={todo.id}>
      <div key={todo.id}>
        <input
          className={input2Style}
          value={editedTodoValue}
          onChange={({ target }) =>
            onChangeEditedTodoValue({ title: target.value })
          }
          onKeyDown={event => handleEditTitleKeyDown(event)}
          onBlur={onBlur}
          autoFocus={true} // Crucial here!
          type="text"
        />
      </div>
    </Li>
  );
};

const TodoItemIdle = ({ todo, onToggle, onClickTitle, onDelete }) => {
  return (
    <Li key={todo.id}>
      <div>
        <input
          className={input1Style}
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle({ todo })}
        />
        <label
          className={labelStyle}
          style={
            todo.completed
              ? {
                  color: '#d9d9d9',
                  textDecoration: 'line-through',
                  backgroundImage: `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E')`
                }
              : {}
          }
          onDoubleClick={() => onClickTitle({ todo })}
        >
          {todo.title + ' '}
        </label>
        <button className={buttonStyle} onClick={() => onDelete({ todo })} />
      </div>
    </Li>
  );
};

const TodoList = ({
  onToggle,
  onDelete,
  onBlur,
  todos,
  editedTodo,
  editedTodoValue,
  isBeingEdited,
  onChangeEditedTodoValue,
  onClickTitle,
  onHitEnterKey
}) => {
  const handleEditTitleKeyDown = event => {
    if (event.which === ESCAPE_KEY) {
      onBlur();
    } else if (event.which === ENTER_KEY) {
      onHitEnterKey();
    }
  };

  return (
    <div className={divStyle}>
      <ul className={ulStyle}>
        {todos.map(todo => {
          const isThisTodoBeingEdited = isBeingEdited && todo === editedTodo;
          if (isThisTodoBeingEdited) {
            return (
              <TodoItemBeingEdited
                todo={todo}
                editedTodoValue={editedTodoValue}
                onChangeEditedTodoValue={onChangeEditedTodoValue}
                handleEditTitleKeyDown={handleEditTitleKeyDown}
                onBlur={onBlur}
              />
            );
          } else {
            return (
              <TodoItemIdle
                todo={todo}
                onToggle={onToggle}
                onClickTitle={onClickTitle}
                onDelete={onDelete}
              />
            );
          }
        })}
      </ul>
    </div>
  );
};

TodoList.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  editedTodo: PropTypes.object.isRequired,
  editedTodoValue: PropTypes.string.isRequired,
  isBeingEdited: PropTypes.bool.isRequired,
  onChangeEditedTodoValue: PropTypes.func.isRequired,
  onHitEnterKey: PropTypes.func.isRequired,
  shouldRegisterTitleClick: PropTypes.bool.isRequired
};

export default TodoList;
