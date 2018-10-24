import React, { Component } from "react";
import {
  uploadServerCreateTodo,
  downloadServerReadTodos,
  uploadServerUpdateTodo,
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
    this.deleteTodo = this.deleteTodo.bind(this);
    this.callbackCreateTodo = this.callbackCreateTodo.bind(this);
    this.callbackReadTodos = this.callbackReadTodos.bind(this);
    this.callbackUpdateTodo = this.callbackUpdateTodo.bind(this);
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

  deleteTodo(todoId) {
    uploadServerDeleteTodo(this.callbackDeleteTodo, todoId);
  }

  callbackCreateTodo(todo) {
    // this.stopLoading(todo.id);
    const newTodos = this.state.todos.concat([todo]);
    this.setState({ todos: newTodos });
  }

  callbackReadTodos(todos) {
    this.setState({ todos: todos });
  }

  callbackUpdateTodo(todoId, newTodo) {
    this.stopLoading(todoId);

    const newTodos = this.state.todos.map(todo => {
      return todo.id === todoId ? newTodo : todo;
    });
    this.setState({ todos: newTodos });
  }

  callbackDeleteTodo(todoId) {
    // this.startLoading(todoId);
    const newTodos = this.state.todos.filter(todo => {
      return todo.id !== todoId;
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
        createTodo={text => this.createTodo(text)}
        submitTitle={(todo, text) => this.updateTodo(todo, text)}
        destroyTodo={todoID => this.deleteTodo(todoID)}
      />
    );
  }
}

export default TodoAppContainer;
