import React from "react";
import classNames from "classnames";

import "./style.css";

class TodoList extends React.Component {
  render() {
    const {
      // grandparent methods
      onToggle,
      onDelete,
      todos,
      // container state
      editTitle,
      // container methods
      isTodoBeingEdited,
      handleEditTitleTextChange,
      handleEditTitleKeyDown,
      handleTitleClick,
      replaceTitle,
      inputRef
    } = this.props;
    return (
      <div className="main">
        <ul className="todo-list">
          {todos.map(todo => {
            const isBeingEdited = isTodoBeingEdited(todo);
            let content;
            if (isBeingEdited) {
              content = (
                <div key={todo.id}>
                  <input
                    className="edit"
                    ref={inputRef}
                    value={editTitle}
                    onChange={event => handleEditTitleTextChange(event)}
                    onKeyDown={event => handleEditTitleKeyDown(event, todo)}
                    onBlur={() => replaceTitle(todo)}
                    type="text"
                    placeholder="Edited value for todo"
                  />
                </div>
              );
            } else {
              content = (
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo)}
                  />
                  <label onDoubleClick={() => handleTitleClick(todo)}>
                    {todo.title + " "}
                  </label>
                  <button className="destroy" onClick={() => onDelete(todo)} />
                </div>
              );
            }
            return (
              <li
                key={todo.id}
                className={classNames({
                  completed: todo.completed,
                  editing: isBeingEdited
                })}
              >
                {content}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default TodoList;
