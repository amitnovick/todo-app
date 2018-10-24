import React, { Component } from "react";
import { ESCAPE_KEY, ENTER_KEY } from "../constants/index.js";

import LOADING_SPINNER_URI from "../img/loading_spinner.gif";

class TodoListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editTitle: ""
    };
  }

  handleEditTitleTextChange(event) {
    this.setState({ editTitle: event.target.value });
  }

  handleEditTitleKeyDown(event) {
    if (event.which === ESCAPE_KEY) {
      this.setState({ editTitle: this.props.todo.title });
      this.props.onCancelTitleEdit();
    } else if (event.which === ENTER_KEY) {
      this.submitTitle();
    }
  }

  submitTitle() {
    const editTitleValue = this.state.editTitle.trim();
    if (editTitleValue.length > 0) {
      this.props.submitTitle(editTitleValue);
      this.setState({ editTitle: "" });
    }
  }

  handleTitleClick() {
    this.props.onTitleClick();
  }

  handleDestroyClick() {
    this.props.onDestroyClick();
  }

  render() {
    const { todo, isLoading, isBeingEdited } = this.props;
    const { editTitle } = this.state;
    if (isLoading) {
      return (
        <div key={todo.id}>
          <img src={LOADING_SPINNER_URI} alt={"Loading..."} />
        </div>
      );
    }
    if (isBeingEdited) {
      return (
        <div key={todo.id} className="edit-todo-field">
          <input
            value={editTitle}
            onChange={event => this.handleEditTitleTextChange(event)}
            onKeyDown={event => this.handleEditTitleKeyDown(event)}
            type="text"
            placeholder="Edited value for todo"
          />
        </div>
      );
    }
    return (
      <div key={todo.id}>
        <span>{todo.completed.toString() + " "}</span>
        <label onDoubleClick={() => this.handleTitleClick()}>
          {todo.title + " "}
        </label>
        <button onClick={() => this.handleDestroyClick()}>{"X"}</button>
      </div>
    );
  }
}

export default TodoListItem;
