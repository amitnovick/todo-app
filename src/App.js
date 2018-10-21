import React, { Component } from "react";

import {
  uploadServerCreateTodo,
  downloadServerReadTodos,
  uploadServerUpdateTodo,
  uploadServerDeleteTodo
} from "./utils.js";

import { ENTER_KEY } from "./constants/index.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: null,
      inputCreateTodoValue: "",
      inputUpdateTodoValue: "" // only needed for debugging API interop
    };

    this.updateStateCreateTodo = this.updateStateCreateTodo.bind(this);
    this.updateStateReadTodos = this.updateStateReadTodos.bind(this);
    this.updateStateUpdateTodo = this.updateStateUpdateTodo.bind(this);
    this.updateStateDeleteTodo = this.updateStateDeleteTodo.bind(this);
  }

  createTodo() {
    const title = this.state.inputCreateTodoValue;
    const shouldCreateNewTodo = title.length > 0;
    if (shouldCreateNewTodo) {
      uploadServerCreateTodo(this.updateStateCreateTodo, title);
    }
  }

  readTodos() {
    downloadServerReadTodos(this.updateStateReadTodos);
  }

  updateTodo(itemId) {
    uploadServerUpdateTodo(
      this.updateStateUpdateTodo,
      this.state.inputUpdateTodoValue,
      itemId
    );
  }

  deleteTodo(itemId) {
    uploadServerDeleteTodo(this.updateStateDeleteTodo, itemId);
  }

  updateStateCreateTodo(todo) {
    const newTodos = this.state.todos.concat([todo]);
    this.setState({ todos: newTodos });
  }

  updateStateReadTodos(todos) {
    this.setState({ todos: todos });
  }

  updateStateUpdateTodo(itemId, newTodo) {
    const newTodos = this.state.todos.map(todo => {
      return todo.id === itemId ? newTodo : todo;
    });
    this.setState({ todos: newTodos });
  }

  updateStateDeleteTodo(itemId) {
    const newTodos = this.state.todos.filter(todo => {
      return todo.id !== itemId;
    });
    this.setState({ todos: newTodos });
  }

  handleNewTodoTextChange(event) {
    this.setState({ inputCreateTodoValue: event.target.value });
  }

  handleEditTodoTextChange(event) {
    this.setState({ inputUpdateTodoValue: event.target.value });
  }

  handleTodoItemOperationUpdate(todoId) {
    this.updateTodo(todoId);
  }

  handleTodoItemOperationDelete(todoId) {
    this.deleteTodo(todoId);
  }

  handleNewTodoKeyDown(event) {
    const pressedEnter = event.keyCode === ENTER_KEY;
    if (!pressedEnter) {
      return;
    }

    event.preventDefault();
    this.createTodo();
  }

  componentDidMount() {
    this.readTodos();
  }

  render() {
    const { todos, inputCreateTodoValue, inputUpdateTodoValue } = this.state;

    if (!todos) {
      return null;
    }
    return (
      <div>
        <div className="todo-creation-field">
          <input
            value={inputCreateTodoValue}
            onChange={event => this.handleNewTodoTextChange(event)}
            type="text"
            placeholder="Enter your task here..."
            onKeyDown={event => this.handleNewTodoKeyDown(event)}
          />
        </div>
        <div className="todo-edit-field">
          <input
            value={inputUpdateTodoValue}
            onChange={event => this.handleEditTodoTextChange(event)}
            type="text"
            placeholder="Edited value for todo"
          />
        </div>
        <div className="todo-items-list">
          {todos.map(todo => (
            <div key={todo.id}>
              <span>{todo.completed.toString() + " "}</span>
              <label>{todo.title + " "}</label>
              <button
                onClick={() => this.handleTodoItemOperationUpdate(todo.id)}
              >
                {"Update"}
              </button>
              <button
                onClick={() => this.handleTodoItemOperationDelete(todo.id)}
              >
                {"X"}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

// class TodoItem extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <div className="todo-items-list">
//         {todos.map(todo => (
//           <div key={todo.id}>
//             <span>{todo.completed.toString() + " "}</span>
//             <label>{todo.title + " "}</label>
//             <button onClick={() => this.handleTodoItemOperationUpdate(todo.id)}>
//               {"Update"}
//             </button>
//             <button onClick={() => this.handleTodoItemOperationDelete(todo.id)}>
//               {"X"}
//             </button>
//           </div>
//         ))}
//       </div>
//     );
//   }
// }

export default App;
