/**
 * External dependencies
 */
import React, { Component } from "react";
/**
 * Internal dependencies
 */
import TodoListItem from "../todo-list-item/index.js";
/**
 *  Style dependencies
 */
import "./style.css";

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      titleEditItemID: null
    };
  }

  replaceTitle(todoToSave, text) {
    this.props.replaceTitle(todoToSave, text);
    this.deactivateTitleEditMode();
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

  render() {
    const { todos, onToggle } = this.props;
    const { titleEditItemID } = this.state;
    return (
      <div className="main">
        <ul className="todo-list">
          {todos.map(todo => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              isBeingEdited={titleEditItemID === todo.id}
              replaceTitle={title => this.replaceTitle(todo, title)}
              onTitleClick={() => this.activateTitleEditMode(todo)}
              onDestroy={() => this.props.onDestroy(todo.id)}
              onCancelTitleEdit={() => this.deactivateTitleEditMode()}
              onToggle={() => onToggle(todo)}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoList;
