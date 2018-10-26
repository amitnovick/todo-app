import React, { Component } from "react";
import { ENTER_KEY } from "../constants/index.js";
import styled from "styled-components";
import Input from "./Input.js";

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
        <StyledInput
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

const StyledInput = styled("Input")`
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);

  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;
