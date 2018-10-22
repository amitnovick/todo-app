import React, { Component } from "react";
import { createTodo, readTodos, updateTodo, deleteTodo } from "./controller.js";
import { ENTER_KEY } from "./constants/index.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: null,
      newTodoFieldValue: "",
      editTodoFieldValue: "" // only needed for debugging API interop
    };

    this.updateStateCreateTodo = this.updateStateCreateTodo.bind(this);
    this.updateStateReadTodos = this.updateStateReadTodos.bind(this);
    this.updateStateUpdateTodo = this.updateStateUpdateTodo.bind(this);
    this.updateStateDeleteTodo = this.updateStateDeleteTodo.bind(this);
  }

  updateStateCreateTodo(todo) {
    const newTodos = this.state.todos.concat([todo]);
    this.setState({ todos: newTodos });
  }

  updateStateReadTodos(todos) {
    this.setState({ todos: todos });
  }

  updateStateUpdateTodo(todoId, newTodo) {
    const newTodos = this.state.todos.map(todo => {
      return todo.id === todoId ? newTodo : todo;
    });
    this.setState({ todos: newTodos });
  }

  updateStateDeleteTodo(todoId) {
    const newTodos = this.state.todos.filter(todo => {
      return todo.id !== todoId;
    });
    this.setState({ todos: newTodos });
  }

  handleNewTodoTextChange(event) {
    this.setState({ newTodoFieldValue: event.target.value });
  }

  handleEditTodoTextChange(event) {
    this.setState({ editTodoFieldValue: event.target.value });
  }

  handleNewTodoKeyDown(event) {
    const pressedEnter = event.keyCode === ENTER_KEY;
    if (!pressedEnter) {
      return;
    }

    event.preventDefault();
    createTodo(this.updateStateCreateTodo, this.state.newTodoFieldValue);
  }

  handleTodoItemOperationUpdate(todoId) {
    updateTodo(
      this.updateStateUpdateTodo,
      this.state.newTodoFieldValue,
      todoId
    );
  }

  handleTodoItemOperationDelete(todoId) {
    deleteTodo(this.updateStateDeleteTodo, todoId);
  }

  componentDidMount() {
    readTodos(this.updateStateReadTodos);
  }

  render() {
    const { todos, newTodoFieldValue, editTodoFieldValue } = this.state;

    if (!todos) {
      return null;
    }
    return (
      <div>
        <div className="todo-creation-field">
          <input
            value={newTodoFieldValue}
            onChange={event => this.handleNewTodoTextChange(event)}
            type="text"
            placeholder="Enter your task here..."
            onKeyDown={event => this.handleNewTodoKeyDown(event)}
          />
        </div>
        <div className="todo-edit-field">
          <input
            value={editTodoFieldValue}
            onChange={event => this.handleEditTodoTextChange(event)}
            type="text"
            placeholder="Edited value for todo"
          />
        </div>
        <TodoList
          todos={todos}
          onUpdate={todoId => this.handleTodoItemOperationUpdate(todoId)}
          onDelete={todoId => this.handleTodoItemOperationDelete(todoId)}
        />
      </div>
    );
  }
}

const TodoList = ({ todos, onUpdate, onDelete }) => {
  return (
    <div className="todo-items-list">
      {todos.map(todo => (
        <div key={todo.id}>
          <span>{todo.completed.toString() + " "}</span>
          <label>{todo.title + " "}</label>
          <button onClick={() => onUpdate(todo.id)}>{"Update"}</button>
          <button onClick={() => onDelete(todo.id)}>{"X"}</button>
        </div>
      ))}
    </div>
  );
};

export default App;
