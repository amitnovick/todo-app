/**
 * External dependencies
 */
import React, { Component } from "react";
/**
 * Internal dependencies
 */
import {
  uploadServerCreateTodo,
  downloadServerReadTodos,
  uploadServerUpdateTodo,
  uploadServerToggleTodo,
  uploadServerDeleteTodo
} from "../lib/rest-endpoint.js";
import App from "../components/todo-app/index.js";

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      loadingTodoIDs: [],
      loadingNewTodo: false,
      finishedReadingTodos: false
    };

    this.createTodo = this.createTodo.bind(this);
    this.readTodos = this.readTodos.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  createTodo(title) {
    const shouldCreateNewTodo = title.length > 0;
    if (shouldCreateNewTodo) {
      this.setState({ loadingNewTodo: true });
      uploadServerCreateTodo(title)
        .then(res => {
          const todo = res.data; // { 'id':..., 'title':..., 'completed':... }
          this.setState({ loadingNewTodo: false });
          const newTodos = this.state.todos.concat([todo]);
          this.setState({ todos: newTodos });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  readTodos() {
    this.setState({ finishedReadingTodos: false });
    downloadServerReadTodos()
      .then(res => {
        const todos = res.data; // [ { 'id':..., 'title':..., 'completed':... }, {...}, ... ]
        this.setState({ finishedReadingTodos: true });
        this.setState({ todos: todos });
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateTodo(todo, newTitle) {
    this.startLoading(todo.id);
    uploadServerUpdateTodo(newTitle, todo.id, todo.completed)
      .then(res => {
        const updatedTodo = res.data; // { 'id':..., 'title':..., 'completed':... }
        this.stopLoading(todoID);

        const newTodos = this.state.todos.map(todo => {
          return todo.id === todoID ? updatedTodo : todo;
        });
        this.setState({ todos: newTodos });
      })
      .catch(err => {
        console.log(err);
      });
  }

  toggleTodo(todo) {
    this.startLoading(todo.id);
    uploadServerToggleTodo(todo.title, !todo.completed, todo.id)
      .then(res => {
        const updatedTodo = res.data; // { 'id':..., 'title':..., 'completed':... }
        this.stopLoading(todoID);

        const newTodos = this.state.todos.map(todo => {
          return todo.id === todoID ? updatedTodo : todo;
        });
        this.setState({ todos: newTodos });
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteTodo(todoID) {
    this.startLoading(todoID);
    uploadServerDeleteTodo(todoID)
      .then(() => {
        this.stopLoading(todoID);
        const newTodos = this.state.todos.filter(todo => {
          return todo.id !== todoID;
        });
        this.setState({ todos: newTodos });
      })
      .catch(err => {
        console.log(err);
      });
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
      <App
        todos={this.state.todos}
        loadingTodoIDs={this.state.loadingTodoIDs}
        loadingNewTodo={this.state.loadingNewTodo}
        createTodo={title => this.createTodo(title)}
        replaceTodoTitle={(todo, title) => this.updateTodo(todo, title)}
        destroyTodo={todoID => this.deleteTodo(todoID)}
        toggleTodo={todo => this.toggleTodo(todo)}
        finishedReadingTodos={this.state.finishedReadingTodos}
      />
    );
  }
}

export default AppContainer;
