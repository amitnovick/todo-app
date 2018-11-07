/**
 * External dependencies
 */
import React, { Component } from "react";
/**
 * Internal dependencies
 */
import TodoList from "../components/offline/todo-list/index.js";
import CreateTodoTextbox from "../components/offline/create-todo-textbox/index.js";
import LoginModal from "../components/offline/login-modal/index.js";
import { store, uuid, extend } from "../lib/local-store.js";
/**
 * Style dependencies
 */
import "./style.css";

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.key = "todo-app";

    this.state = {
      todos: store(this.key), // Pass this to TodoList component
      modalIsOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
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
        completed: false
      });

      this.setState({ todos: newTodos });
      this.updateLocalStore(newTodos);
    }
  }

  /* Pass this to TodoList component (`replaceTitle`) */
  updateTodo(todoToSave, text) {
    const newTodos = this.state.todos.map(
      todo => (todo !== todoToSave ? todo : extend({}, todo, { title: text }))
    );
    this.setState({ todos: newTodos });
    this.updateLocalStore(newTodos);
  }

  /* Pass this to TodoList component (`onToggle`) */
  toggleTodo(todoToToggle) {
    const newTodos = this.state.todos.map(
      todo =>
        todo !== todoToToggle
          ? todo
          : extend({}, todo, { completed: !todo.completed })
    );
    this.setState({ todos: newTodos });
    this.updateLocalStore(newTodos);
  }

  /* Pass this to TodoList component (`onDestroy`) */
  deleteTodo(todo) {
    const newTodos = this.state.todos.filter(
      candidate => candidate.id !== todo.id
    );
    this.setState({ todos: newTodos });
    this.updateLocalStore(newTodos);
  }

  componentDidMount() {
    this.toggleModal();
  }

  render() {
    const { todos } = this.state;
    return (
      <div className="todoapp">
        <LoginModal
          modalIsOpen={this.state.modalIsOpen}
          toggleModal={() => this.toggleModal()}
        />
        <CreateTodoTextbox createTodo={title => this.createTodo(title)} />
        <TodoList
          todos={todos}
          onDestroy={todo => this.deleteTodo(todo)}
          onReplaceTitle={(todo, title) => this.updateTodo(todo, title)}
          onToggle={todo => this.toggleTodo(todo)}
        />
      </div>
    );
  }
}

export default AppContainer;
