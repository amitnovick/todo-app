import React, { Component } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

import { ESCAPE_KEY, ENTER_KEY } from "../constants/index.js";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import Button from "./Button.js";

library.add(faSpinner);

class TodoListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editTitle: ""
    };

    this.cancelTitleEdit = this.cancelTitleEdit.bind(this);
  }

  handleEditTitleTextChange(event) {
    this.setState({ editTitle: event.target.value });
  }

  handleEditTitleKeyDown(event) {
    if (event.which === ESCAPE_KEY) {
      this.cancelTitleEdit();
    } else if (event.which === ENTER_KEY) {
      this.replaceTitle();
    }
  }

  handleTitleClick() {
    this.props.onTitleClick();
  }

  handleDestroyClick() {
    this.props.onDestroyClick();
  }

  replaceTitle() {
    const editTitleValue = this.state.editTitle.trim();
    if (editTitleValue.length > 0) {
      this.props.replaceTitle(editTitleValue);
      this.setState({ editTitle: "" });
    }
  }

  cancelTitleEdit() {
    this.props.onCancelTitleEdit();
    this.setState({ editTitle: this.props.todo.title });
  }

  /**
   * Safely manipulate the DOM after updating the state when invoking
   * `this.props.onTitleClick()` in the `handleTitleClick` method above.
   * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
   * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
   */
  componentDidUpdate(prevProps) {
    if (!prevProps.isBeingEdited && this.props.isBeingEdited) {
      const node = ReactDOM.findDOMNode(this.refs.editTitleField);
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  }

  render() {
    const { todo, isLoading, isBeingEdited } = this.props;
    const { editTitle } = this.state;
    let content;
    if (isLoading) {
      content = (
        <div key={todo.id}>
          <FontAwesomeIcon icon="spinner" pulse />
        </div>
      );
    } else if (isBeingEdited) {
      content = (
        <div key={todo.id}>
          <StyledEditTitleField
            ref="editTitleField"
            value={editTitle}
            onChange={event => this.handleEditTitleTextChange(event)}
            onKeyDown={event => this.handleEditTitleKeyDown(event)}
            type="text"
            placeholder="Edited value for todo"
          />
        </div>
      );
    } else {
      content = (
        <div className="view">
          <StyledCheckbox
            type="checkbox"
            checked={todo.completed}
            onChange={() => this.props.onToggle()}
          />
          <StyledTitleLabel onDoubleClick={() => this.handleTitleClick()}>
            {todo.title + " "}
          </StyledTitleLabel>
          <StyledDeleteButton onClick={() => this.handleDestroyClick()} />
        </div>
      );
    }
    return (
      <StyledListItem
        className={classNames({
          completed: this.props.todo.completed,
          editing: this.props.editing
        })}
      >
        {content}
      </StyledListItem>
    );
  }
}

export default TodoListItem;

const StyledCheckbox = styled.input`
  text-align: center;
  width: 40px;
  /* auto, since non-WebKit browsers doesn't support input styling */
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none; /* Mobile Safari */
  -webkit-appearance: none;
  appearance: none;
  opacity: 0;
`;

const StyledDeleteButton = styled("Button")`
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;

  :hover {
    color: #af5b5e;
  }

  :after {
    content: "×";
  }
`;

const StyledListItem = styled.li`
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;

  :last-child {
    border-bottom: none;
  }
`;

const StyledTitleLabel = styled.label`
  word-break: break-all;
  padding: 15px 15px 15px 60px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
`;

const StyledEditTitleField = styled.input`
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

  /* From =.todo-list li .edit=, disabled cuz don't know  how to make visible yet */
  // display: none;
`;
