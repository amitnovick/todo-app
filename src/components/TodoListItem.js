import React, { Component } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

import { ESCAPE_KEY, ENTER_KEY } from "../constants/index.js";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

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
    if (isLoading) {
      return (
        <div key={todo.id}>
          <FontAwesomeIcon icon="spinner" pulse />
        </div>
      );
    }
    if (isBeingEdited) {
      return (
        <div key={todo.id}>
          <input
            ref="editTitleField"
            className="edit-todo-field"
            value={editTitle}
            onChange={event => this.handleEditTitleTextChange(event)}
            onKeyDown={event => this.handleEditTitleKeyDown(event)}
            type="text"
            placeholder="Edited value for todo"
          />
        </div>
      );
    }
    return (
      <li
        className={classNames({
          completed: this.props.todo.completed,
          editing: this.props.editing
        })}
      >
        <div key={todo.id}>
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => this.props.onToggle()}
          />
          <label onDoubleClick={() => this.handleTitleClick()}>
            {todo.title + " "}
          </label>
          <button
            className="destroy"
            onClick={() => this.handleDestroyClick()}
          />
        </div>
      </li>
    );
  }
}

export default TodoListItem;
