import React, { Component } from "react";
import Utils from "./utils.js";

import {
  uploadServerCreateTodo,
  downloadServerReadTodos,
  uploadServerUpdateTodo,
  uploadServerDeleteTodo
} from "./utils.js";

import {
  TODO_ID,
  TODO_TITLE,
  TODO_COMPLETED,
  TODO_COMPLETED_DEFAULT
} from "./constants/index.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      inputCreateTodoValue: "",
      inputUpdateTodoValue: "" // only needed for debugging API interop
    };

    // this.createTodo = this.createTodo.bind(this);
    // this.updateTodo = this.updateTodo.bind(this);
    // this.deleteTodo = this.deleteTodo.bind(this);
    // this.updateInputCreateTodoValue = this.updateInputCreateTodoValue.bind(
    //   this
    // );
    // this.updateInputUpdateTodoValue = this.updateInputUpdateTodoValue.bind(
    //   this
    // );
  }

  createTodo() {
    const title = this.state.inputCreateTodoValue;
    if (title.length > 0) {
      const newTodo = this.createNewTodo(title);
      this.updateStateCreateTodo(newTodo);
      // uploadServerCreateTodo(newTodo);
    }
  }

  readTodos() {
    const todos = this.retrieveStoredTodos();
    this.updateStateReadTodos(todos);
    // downloadServerReadTodos(this.updateStateReadTodos);
  }

  updateTodo(itemId) {
    const newTodos = this.updateExistingTodo(
      itemId,
      this.state.inputUpdateTodoValue,
      this.state.todos
    );
    this.updateStateUpdateTodo(newTodos);
    // uploadServerUpdateTodo(
    //   this.updateStateUpdateTodo,
    //   this.state.inputUpdateTodoValue,
    //   itemId
    // );
  }

  deleteTodo(itemId) {
    const newTodos = this.deleteExistingTodo(itemId, this.state.todos);
    this.updateStateDeleteTodo(newTodos);
    // uploadServerDeleteTodo(this.updateStateDeleteTodo, itemId);
  }

  updateStateCreateTodo(todo) {
    const newTodos = this.state.todos.concat([todo]);
    this.setState({ todos: newTodos });
  }

  updateStateReadTodos(todos) {
    this.setState({ todos: todos });
  }

  updateStateUpdateTodo(newTodos) {
    this.setState({ todos: newTodos });
  }

  updateStateDeleteTodo(newTodos) {
    this.setState({ todos: newTodos });
  }

  createNewTodo(title) {
    return {
      [TODO_ID]: Utils.uuid(),
      [TODO_TITLE]: title,
      [TODO_COMPLETED]: TODO_COMPLETED_DEFAULT
    };
  }

  retrieveStoredTodos() {
    const list = [
      {
        id: "24fef44223434343",
        title: "Finish the Todos app using React",
        completed: false
      },
      {
        id: "asd6263afs6dasd6",
        title: "Create some more interesting React projects",
        completed: false
      },
      {
        id: "22f4a52656fa6wsa6",
        title: "Get a job as a Junior front-end developer",
        completed: false
      }
    ];
    return list;
  }

  updateExistingTodo(itemId, title, todos) {
    const replaceTodoById = todo => {
      if (todo.id === itemId) {
        return {
          [TODO_ID]: todo.id,
          [TODO_TITLE]: title,
          [TODO_COMPLETED]: todo.completed
        };
      }
      return todo;
    };
    const newTodos = todos.map(replaceTodoById);
    return newTodos;
  }

  deleteExistingTodo(itemId, todos) {
    const isNotId = todo => todo.id !== itemId;
    const newTodos = todos.filter(isNotId);
    return newTodos;
  }

  updateInputCreateTodoValue(event) {
    this.setState({ inputCreateTodoValue: event.target.value });
  }

  updateInputUpdateTodoValue(event) {
    this.setState({ inputUpdateTodoValue: event.target.value });
  }

  componentDidMount() {
    this.readTodos();
  }

  render() {
    const { todos, inputCreateTodoValue, inputUpdateTodoValue } = this.state;

    return (
      <div>
        <TodoCreationInput
          createTodo={() => this.createTodo()}
          inputCreateTodoValue={inputCreateTodoValue}
          updateInputCreateTodoValue={event =>
            this.updateInputCreateTodoValue(event)
          }
        />
        <input
          value={inputUpdateTodoValue}
          onChange={event => this.updateInputUpdateTodoValue(event)}
          type="text"
          placeholder="Edited value for todo"
        />
        <TodoTable
          todosList={todos}
          updateTodo={itemId => this.updateTodo(itemId)}
          deleteTodo={itemId => this.deleteTodo(itemId)}
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
