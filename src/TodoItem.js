import React, { Component } from "react";
import { ESCAPE_KEY, ENTER_KEY } from "./constants/index.js";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editText: ""
    };
  }

  handleEditTodoTextChange(event) {
    this.setState({ editText: event.target.value });
  }

  handleEditTodoKeyDown(event) {
    if (event.which === ESCAPE_KEY) {
      this.setState({ editText: this.props.todo.title });
      this.props.onCancel();
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit();
    }
  }

  handleSubmit() {
    const editTextValue = this.state.editText.trim();
    if (editTextValue.length > 0) {
      this.props.onSave(this.props.todo, editTextValue);
      this.setState({ editText: "" });
    }
  }

  deleteTodo() {
    this.props.controller.deleteTodo(this.props.todo.id);
  }

  handleEdit() {
    this.props.onEdit();
  }

  render() {
    const { isLoading, todo, isEditing } = this.props;
    const { editText } = this.state;
    if (isLoading) {
      return <span key={todo.id}>{"Loading..."}</span>;
    }
    if (isEditing) {
      return (
        <div key={todo.id} className="edit-todo-field">
          <input
            value={editText}
            onChange={event => this.handleEditTodoTextChange(event)}
            onKeyDown={event => this.handleEditTodoKeyDown(event)}
            type="text"
            placeholder="Edited value for todo"
          />
        </div>
      );
    }
    return (
      <div key={todo.id}>
        <span>{todo.completed.toString() + " "}</span>
        <label onDoubleClick={() => this.handleEdit()}>
          {todo.title + " "}
        </label>
        <button onClick={() => this.deleteTodo()}>{"X"}</button>
      </div>
    );
  }
}

export default TodoItem;
