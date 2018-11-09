/**
 * External dependencies
 */
import React, { Component } from "react";
/**
 * Internal dependencies
 */
/**
 * Style dependencies
 */
import "./style.css";

const ENTER_KEY = 13;

class CreateTodoTextbox extends Component {
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
