import React, { Component } from "react";
import { ENTER_KEY } from "../constants/index.js";

class TodoCreationField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newTitle: ""
    };
  }

  handleNewTitleChange(event) {
    this.setState({ newTitle: event.target.value });
  }

  handleNewTitleKeyDown(event) {
    const pressedEnter = event.keyCode === ENTER_KEY;
    if (!pressedEnter) return;

    const newTitleValue = this.state.newTitle.trim();
    this.props.createTodo(newTitleValue);
    this.setState({ newTitle: "" });
  }

  render() {
    const { newTitle } = this.state;
    return (
      <header className="todo-creation-header">
        <input
          className="todo-creation-field"
          value={newTitle}
          onChange={event => this.handleNewTitleChange(event)}
          type="text"
          placeholder="Enter your task here..."
          onKeyDown={event => this.handleNewTitleKeyDown(event)}
          autoFocus={true}
        />
      </header>
    );
  }
}

export default TodoCreationField;
