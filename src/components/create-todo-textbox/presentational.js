import React from "react";

import "./style.css";

const CreateTodoTextbox = ({
  // container state
  newTitle,
  // container methods
  handleNewTitleChange,
  handleNewTitleKeyDown
}) => {
  return (
    <input
      className="new-todo"
      value={newTitle}
      onChange={event => handleNewTitleChange(event)}
      type="text"
      placeholder="Enter your task here..."
      onKeyDown={event => handleNewTitleKeyDown(event)}
      autoFocus={true}
    />
  );
};

export default CreateTodoTextbox;
