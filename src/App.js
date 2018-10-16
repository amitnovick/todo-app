import React, { Component } from "react";
import {
  uploadServerCreateTodo,
  downloadServerReadTodos,
  uploadServerUpdateTodo,
  uploadServerDeleteTodo
} from "./Utils.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      inputCreateTodoValue: "",
      inputUpdateTodoValue: "" // only needed for debugging API interop
    };

    this.updateStateCreateTodo = this.updateStateCreateTodo.bind(this);
    this.updateStateReadTodos = this.updateStateReadTodos.bind(this);
    this.updateStateUpdateTodo = this.updateStateUpdateTodo.bind(this);
    this.updateStateDeleteTodo = this.updateStateDeleteTodo.bind(this);
    this.createTodo = this.createTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateInputCreateTodoValue = this.updateInputCreateTodoValue.bind(
      this
    );
    this.updateInputUpdateTodoValue = this.updateInputUpdateTodoValue.bind(
      this
    );
  }

  componentDidMount() {
    this.readTodos();
  }

  createTodo() {
    if (this.state.inputCreateTodoValue.length > 0) {
      uploadServerCreateTodo(
        this.updateStateCreateTodo,
        this.state.inputCreateTodoValue
      );
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

  updateStateUpdateTodo(itemId, updatedTodo) {
    const replaceTodoById = todo => {
      if (todo.id === itemId) {
        return updatedTodo;
        // return {
        //   [TODO_ID]: todo.id,
        //   [TODO_TITLE]: inputUpdateTodoValue,
        //   [TODO_COMPLETED]: todo.completed,
        // };
      }
      return todo;
    };
    const newTodos = this.state.todos.map(replaceTodoById);
    this.setState({ todos: newTodos });
  }

  updateStateDeleteTodo(itemId) {
    const isNotId = todo => todo.id !== itemId;
    const newTodos = this.state.todos.filter(isNotId);
    this.setState({ todos: newTodos });
  }

  updateInputCreateTodoValue(event) {
    this.setState({ inputCreateTodoValue: event.target.value });
  }

  updateInputUpdateTodoValue(event) {
    this.setState({ inputUpdateTodoValue: event.target.value });
  }

  render() {
    const { todos, inputCreateTodoValue, inputUpdateTodoValue } = this.state;

    return (
      <div>
        <TodoCreationInput
          createTodo={this.createTodo}
          inputCreateTodoValue={inputCreateTodoValue}
          updateInputCreateTodoValue={this.updateInputCreateTodoValue}
        />
        <input
          value={inputUpdateTodoValue}
          onChange={this.updateInputUpdateTodoValue}
          type="text"
          placeholder="Edited value for todo"
        />
        <TodoTable
          todosList={todos}
          updateTodo={this.updateTodo}
          deleteTodo={this.deleteTodo}
        />
      </div>
    );
  }
}

const Button = ({ onClick, className = "", children }) => (
  <button onClick={() => onClick()} className={className} type="button">
    {children}
  </button>
);

const TodoCreationInput = ({
  createTodo,
  inputCreateTodoValue,
  updateInputCreateTodoValue
}) => (
  <div>
    <Button onClick={createTodo}>{"+"}</Button>
    <input
      value={inputCreateTodoValue}
      onChange={updateInputCreateTodoValue}
      type="text"
      placeholder="Enter your task here..."
    />
  </div>
);

const TodoTable = ({ todosList, updateTodo, deleteTodo }) => (
  <div>
    {todosList.map(todo => (
      <div key={todo.id}>
        <span>{todo.completed.toString() + " "}</span>
        <label>{todo.title + " "}</label>
        <Button onClick={() => updateTodo(todo.id)}>{"Update"}</Button>
        <Button onClick={() => deleteTodo(todo.id)}>{"X"}</Button>
      </div>
    ))}
  </div>
);

export default App;
