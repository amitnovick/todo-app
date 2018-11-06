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
      editingTodo: null
    };
  }

  replaceTitle(todoToSave, text) {
    this.props.replaceTitle(todoToSave, text);
    this.deactivateTitleEditMode();
  }

  activateTitleEditMode(todo) {
    this.setState({
      editingTodo: todo
    });
  }

  deactivateTitleEditMode() {
    this.setState({
      editingTodo: null
    });
  }

  isTodoLoading(todo, loadingTodos) {
    for (let i = 0; i < loadingTodos.length; i++) {
      if (loadingTodos[i].id === todo.id) return true;
    }
    return false;
  }

  render() {
    const { todos, loadingTodos, onToggle, onDestroy } = this.props;
    const { editingTodo } = this.state;
    return (
      <div className="main">
        <ul className="todo-list">
          {todos.map(todo => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              isBeingEdited={editingTodo && editingTodo.id === todo.id}
              replaceTitle={title => this.replaceTitle(todo, title)}
              onTitleClick={() => this.activateTitleEditMode(todo)}
              onDestroy={() => onDestroy(todo)}
              onCancelTitleEdit={() => this.deactivateTitleEditMode()}
              isLoading={this.isTodoLoading(todo, loadingTodos)}
              onToggle={() => onToggle(todo)}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoList;
