import React, { Component } from "react";
import { ENTER_KEY } from "./constants/index.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newTodoFieldValue: "",
      editTodoFieldValue: "" // only needed for debugging API interop
    };
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

    const newVal = this.state.newTodoFieldValue.trim();
    this.props.controller.createTodo(newVal);
    this.setState({ newTodoFieldValue: "" });
  }

  updateTodo(todoId) {
    const updateVal = this.state.editTodoFieldValue.trim();
    this.props.controller.updateTodo(updateVal, todoId);
    this.setState({ editTodoFieldValue: "" });
  }

  deleteTodo(todoId) {
    this.props.controller.deleteTodo(todoId);
  }

  render() {
    let main = null;
    const todos = this.props.controller.todos;
    const { newTodoFieldValue, editTodoFieldValue } = this.state;

    if (todos) {
      main = (
        <TodoList
          todos={todos}
          onUpdate={todoId => this.updateTodo(todoId)}
          onDelete={todoId => this.deleteTodo(todoId)}
        />
      );
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
        {main}
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
