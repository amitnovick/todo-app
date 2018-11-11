/**
 * External dependencies
 */
import React, { Component } from "react";
/**
 * Internal dependencies
 */
import TodoList from "../components/todo-list/index.js";
import CreateTodoTextbox from "../components/create-todo-textbox/index.js";
import { store, uuid } from "../store/local-store.js";
/**
 * Style dependencies
 */
import "./style.css";

class OfflineContainer extends Component {
  constructor(props) {
    super(props);
    this.key = "todo-app";

    this.state = {
      todos: store(this.key) // Pass this to TodoList component
    };
  }

  updateLocalStore(newTodos) {
    store(this.key, newTodos);
  }

  /* Pass this to CreateTodoTextbox component (`createTodo`) */
  createTodo(title) {
    const shouldCreateNewTodo = title.length > 0;
    if (shouldCreateNewTodo) {
      const newTodos = this.state.todos.concat({
        id: uuid(),
        title: title,
        completed: false,
        createdAt: new Date().toISOString()
      });

      this.setState({ todos: newTodos });
      this.updateLocalStore(newTodos);
    }
  }

  editTodo(todo, newTitle) {
    const newTodos = this.state.todos.map(
      t => (t !== todo ? t : { ...t, title: newTitle })
    );
    this.setState({ todos: newTodos });
    this.updateLocalStore(newTodos);
  }

  toggleTodo(todo) {
    const newTodos = this.state.todos.map(
      t => (t !== todo ? t : { ...t, completed: !t.completed })
    );
    this.setState({ todos: newTodos });
    this.updateLocalStore(newTodos);
  }

  deleteTodo(todo) {
    const newTodos = this.state.todos.filter(
      candidate => candidate.id !== todo.id
    );
    this.setState({ todos: newTodos });
    this.updateLocalStore(newTodos);
  }

  render() {
    const { todos } = this.state;
    return (
      <div className="todoapp">
        <CreateTodoTextbox createTodo={title => this.createTodo(title)} />
        <TodoList
          todos={todos}
          onDelete={todo => this.deleteTodo(todo)}
          onEdit={(todo, title) => this.editTodo(todo, title)}
          onToggle={todo => this.toggleTodo(todo)}
        />
      </div>
    );
  }
}

export default OfflineContainer;
