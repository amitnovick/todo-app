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
import App from "../components/online/todo-app/index.js";

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      loadingTodos: [],
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
    this.startLoading(todo);
    uploadServerUpdateTodo(newTitle, todo.id, todo.completed)
      .then(res => {
        const updatedTodo = res.data; // { 'id':..., 'title':..., 'completed':... }
        this.stopLoading(todo);

        const newTodos = this.state.todos.map(t => {
          return t.id === todo.id ? updatedTodo : t;
        });
        this.setState({ todos: newTodos });
      })
      .catch(err => {
        console.log(err);
      });
  }

  toggleTodo(todo) {
    this.startLoading(todo);
    uploadServerToggleTodo(todo.title, !todo.completed, todo.id)
      .then(res => {
        const updatedTodo = res.data; // { 'id':..., 'title':..., 'completed':... }
        this.stopLoading(todo);

        const newTodos = this.state.todos.map(t => {
          return t.id === todo.id ? updatedTodo : t;
        });
        this.setState({ todos: newTodos });
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteTodo(todo) {
    this.startLoading(todo);
    uploadServerDeleteTodo(todo.id)
      .then(() => {
        this.stopLoading(todo);
        const newTodos = this.state.todos.filter(t => {
          return t.id !== todo.id;
        });
        this.setState({ todos: newTodos });
      })
      .catch(err => {
        console.log(err);
      });
  }

  startLoading(todo) {
    const newLoadingTodos = this.state.loadingTodos.concat([todo]);
    this.setState({ loadingTodos: newLoadingTodos });
  }

  stopLoading(todo) {
    const newLoadingTodos = this.state.loadingTodos.filter(t => {
      return t.id !== todo.id;
    });
    this.setState({ loadingTodos: newLoadingTodos });
  }

  componentDidMount() {
    this.readTodos();
  }

  render() {
    return (
      <App
        todos={this.state.todos}
        loadingTodos={this.state.loadingTodos}
        loadingNewTodo={this.state.loadingNewTodo}
        createTodo={title => this.createTodo(title)}
        replaceTodoTitle={(todo, title) => this.updateTodo(todo, title)}
        destroyTodo={todo => this.deleteTodo(todo)}
        toggleTodo={todo => this.toggleTodo(todo)}
        finishedReadingTodos={this.state.finishedReadingTodos}
      />
    );
  }
}

export default AppContainer;
