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
 *  Style dependencies
 */
import "./style.css";

const editTitleField = "editTitleField";
const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      titleEditItemID: null,
      editTitle: ""
    };
  }
  /* TodoList */
  replaceTitle(todoToSave) {
    const editTitleValue = this.state.editTitle.trim();
    if (editTitleValue.length === 0) this.props.onDestroy(todoToSave);
    else if (editTitleValue !== todoToSave.title) {
      this.props.replaceTitle(todoToSave, editTitleValue);
      this.deactivateTitleEditMode(todoToSave);
      this.setState({ editTitle: "" });
    } else this.deactivateTitleEditMode();
  }

  activateTitleEditMode(todo) {
    this.setState({
      titleEditItemID: todo.id
    });
  }

  deactivateTitleEditMode() {
    this.setState({
      titleEditItemID: null
    });
  }

  /* TodoListItem */
  handleEditTitleTextChange(event) {
    this.setState({ editTitle: event.target.value });
  }

  handleEditTitleKeyDown(event, todo) {
    if (event.which === ESCAPE_KEY) {
      this.deactivateTitleEditMode();
    } else if (event.which === ENTER_KEY) {
      this.replaceTitle(todo);
    }
  }

  handleTitleClick(todo) {
    this.activateTitleEditMode(todo);
    this.setState({ editTitle: todo.title });
  }

  /**
   * Safely manipulate the DOM after updating the state when invoking
   * `this.activateTitleEditMode()` method above.
   * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
   * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
   */
  componentDidUpdate(prevProps, prevState) {
    if (!prevState.titleEditItemID && this.state.titleEditItemID) {
      const node = ReactDOM.findDOMNode(this.refs.editTitleField);
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  }

  render() {
    const { titleEditItemID, editTitle } = this.state;
    const { todos, onToggle } = this.props;
    return (
      <div className="main">
        <ul className="todo-list">
          {todos.map(todo => {
            const isBeingEdited = titleEditItemID === todo.id;
            let content;
            if (isBeingEdited) {
              content = (
                <div key={todo.id}>
                  <input
                    className="edit"
                    ref={editTitleField}
                    value={editTitle}
                    onChange={event => this.handleEditTitleTextChange(event)}
                    onKeyDown={event =>
                      this.handleEditTitleKeyDown(event, todo)
                    }
                    onBlur={() => this.replaceTitle(todo)}
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
                  <label onDoubleClick={() => this.handleTitleClick(todo)}>
                    {todo.title + " "}
                  </label>
                  <button
                    className="destroy"
                    onClick={() => this.props.onDestroy(todo)}
                  />
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
