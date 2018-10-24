import React, { Component } from "react";
import { ENTER_KEY } from "../constants/index.js";
import TodoList from "./TodoList.js";

class TodoApp extends Component {
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

    event.preventDefault();

    const newTitleValue = this.state.newTitle.trim();
    this.props.createTodo(newTitleValue);
    this.setState({ newTitle: "" });
  }

  render() {
    let main = null;
    const { todos, loadingTodoIDs, submitTitle, destroyTodo } = this.props;
    const { newTitle } = this.state;

    if (todos) {
      main = (
        <TodoList
          todos={todos}
          loadingItemIDs={loadingTodoIDs}
          onDestroy={todoID => destroyTodo(todoID)}
          submitTitle={(todo, title) => submitTitle(todo, title)}
        />
      );
    }
    return (
      <div>
        <div className="todo-app-header">
          <input
            value={newTitle}
            onChange={event => this.handleNewTitleChange(event)}
            type="text"
            placeholder="Enter your task here..."
            onKeyDown={event => this.handleNewTitleKeyDown(event)}
          />
        </div>
        {main}
      </div>
    );
  }
}

export default TodoApp;
