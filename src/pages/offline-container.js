/**
 * External dependencies
 */
import React, { Component } from "react";
/**
 * Internal dependencies
 */
import { store, uuid, extend } from "../lib/local-store.js";
import App from "../components/offline/todo-app/index.js";

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.key = "todo-app";

    this.state = {
      todos: store(this.key)
    };
  }

  createTodo(title) {
    const shouldCreateNewTodo = title.length > 0;
    if (shouldCreateNewTodo) {
      const newTodos = this.state.todos.concat({
        id: uuid(),
        title: title,
        completed: false
      });

      this.setState({ todos: newTodos });
    }
  }

  updateTodo(todoToSave, text) {
    const newTodos = this.state.todos.map(
      todo => (todo !== todoToSave ? todo : extend({}, todo, { title: text }))
    );
    this.setState({ todos: newTodos });
  }

  toggleTodo(todoToToggle) {
    const newTodos = this.state.todos.map(
      todo =>
        todo !== todoToToggle
          ? todo
          : extend({}, todo, { completed: !todo.completed })
    );
    this.setState({ todos: newTodos });
  }

  deleteTodo(todoID) {
    const newTodos = this.state.todos.filter(
      candidate => candidate.id !== todoID
    );
    this.setState({ todos: newTodos });
  }

  render() {
    return (
      <App
        todos={this.state.todos}
        createTodo={title => this.createTodo(title)}
        replaceTodoTitle={(todo, title) => this.updateTodo(todo, title)}
        toggleTodo={todo => this.toggleTodo(todo)}
        destroyTodo={todoID => this.deleteTodo(todoID)}
      />
    );
  }
}

export default AppContainer;
