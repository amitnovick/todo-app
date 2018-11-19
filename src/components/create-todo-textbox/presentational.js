import React from "react";

import "./style.css";

const ENTER_KEY = 13;

class CreateTodoTextbox extends React.Component {
  handleNewTitleChange = event => {
    this.setState({ newTitle: event.target.value });
  };

  handleNewTitleKeyDown = event => {
    const pressedEnter = event.keyCode === ENTER_KEY;
    if (!pressedEnter) return;

    const newTitleValue = this.state.newTitle.trim();
    this.props.createTodo(newTitleValue);
    this.setState({ newTitle: "" });
  };

  render() {
    const { newTitle } = this.props;
    return (
      <input
        className="new-todo"
        value={newTitle}
        onChange={event => this.handleNewTitleChange(event)}
        type="text"
        placeholder="Enter your task here..."
        onKeyDown={event => this.handleNewTitleKeyDown(event)}
        autoFocus={true}
      />
    );
  }
}

export default CreateTodoTextbox;
