import React, { Component } from "react";
import {
  uploadServerCreateTodo,
  downloadServerReadTodos,
  uploadServerUpdateTodo,
  uploadServerToggleTodo,
  uploadServerDeleteTodo
} from "../apiFetch.js";
import TodoApp from "./TodoApp.js";

/* TODO Purpose: re-sending failed requests
      Proposition:
      - create queue of unsuccessful tasks as a class field
        a task added to the queue should have type
        e.g. values like { 'create', 'read', 'update', 'delete' }
      - every time a task is first attempted it is added to the queue
      */

class TodoAppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      loadingTodoIDs: []
    };

    this.createTodo = this.createTodo.bind(this);
    this.readTodos = this.readTodos.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.callbackCreateTodo = this.callbackCreateTodo.bind(this);
    this.callbackReadTodos = this.callbackReadTodos.bind(this);
    this.callbackUpdateTodo = this.callbackUpdateTodo.bind(this);
    this.callbackToggleTodo = this.callbackToggleTodo.bind(this);
    this.callbackDeleteTodo = this.callbackDeleteTodo.bind(this);
  }

  createTodo(title) {
    const shouldCreateNewTodo = title.length > 0;
    if (shouldCreateNewTodo) {
      uploadServerCreateTodo(this.callbackCreateTodo, title);
    }
  }

  readTodos() {
    downloadServerReadTodos(this.callbackReadTodos);
  }

  updateTodo(todo, newTitle) {
    this.startLoading(todo.id);
    uploadServerUpdateTodo(this.callbackUpdateTodo, newTitle, todo.id);
  }

  deleteTodo(todoID) {
    this.startLoading(todoID);
    uploadServerDeleteTodo(this.callbackDeleteTodo, todoID);
  }

  toggleTodo(todo) {
    this.startLoading(todo.id);
    uploadServerToggleTodo(
      this.callbackToggleTodo,
      todo.title,
      !todo.completed,
      todo.id
    );
  }

  callbackCreateTodo(todo) {
    // this.stopLoading(todo.id);
    const newTodos = this.state.todos.concat([todo]);
    this.setState({ todos: newTodos });
  }

  callbackReadTodos(todos) {
    this.setState({ todos: todos });
  }

  callbackUpdateTodo(todoID, newTodo) {
    this.stopLoading(todoID);

    const newTodos = this.state.todos.map(todo => {
      return todo.id === todoID ? newTodo : todo;
    });
    this.setState({ todos: newTodos });
  }

  callbackToggleTodo(todoID, newTodo) {
    this.stopLoading(todoID);

    const newTodos = this.state.todos.map(todo => {
      return todo.id === todoID ? newTodo : todo;
    });
    this.setState({ todos: newTodos });
  }

  callbackDeleteTodo(todoID) {
    this.stopLoading(todoID);
    const newTodos = this.state.todos.filter(todo => {
      return todo.id !== todoID;
    });
    this.setState({ todos: newTodos });
  }

  startLoading(todoID) {
    const newLoadingTodoIDs = this.state.loadingTodoIDs.concat([todoID]);
    this.setState({ loadingTodoIDs: newLoadingTodoIDs });
  }

  stopLoading(todoId) {
    const newLoadingTodoIDs = this.state.loadingTodoIDs.filter(todoID => {
      return todoID !== todoId;
    });
    this.setState({ loadingTodoIDs: newLoadingTodoIDs });
  }

  componentDidMount() {
    this.readTodos();
  }

  render() {
    return (
      <TodoApp
        todos={this.state.todos}
        loadingTodoIDs={this.state.loadingTodoIDs}
        createTodo={title => this.createTodo(title)}
        replaceTodoTitle={(todo, title) => this.updateTodo(todo, title)}
        destroyTodo={todoID => this.deleteTodo(todoID)}
        toggleTodo={todo => this.toggleTodo(todo)}
      />
    );
  }
}

export default TodoAppContainer;
