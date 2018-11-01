/**
 * External dependencies
 */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
/**
 * Internal dependencies
 */
/**
 * Styled dependencies
 */
import "./style.css";

const editTitleField = "editTitleField";
const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

class TodoListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editTitle: this.props.todo.title
    };
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
    this.setState({ editTitle: this.props.todo.title });
    this.props.onTitleClick();
  }

  replaceTitle() {
    const editTitleValue = this.state.editTitle.trim();
    if (editTitleValue.length === 0) this.props.onDestroy();
    else if (editTitleValue !== this.props.todo.title) {
      this.props.replaceTitle(editTitleValue);
      this.setState({ editTitle: "" });
    } else this.cancelTitleEdit();
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
    const { todo, isBeingEdited, onToggle } = this.props;
    const { editTitle } = this.state;
    let content;
    if (isBeingEdited) {
      content = (
        <div key={todo.id}>
          <input
            className="edit"
            ref={editTitleField}
            value={editTitle}
            onChange={event => this.handleEditTitleTextChange(event)}
            onKeyDown={event => this.handleEditTitleKeyDown(event)}
            onBlur={() => this.replaceTitle()}
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
            onChange={() => onToggle()}
          />
          <label onDoubleClick={() => this.handleTitleClick()}>
            {todo.title + " "}
          </label>
          <button className="destroy" onClick={() => this.props.onDestroy()} />
        </div>
      );
    }
    return (
      <li
        className={classNames({
          completed: todo.completed,
          editing: isBeingEdited
        })}
      >
        {content}
      </li>
    );
  }
}

export default TodoListItem;
