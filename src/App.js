import React, { Component } from "react";
import { ENTER_KEY } from "./constants/index.js";
import TodoItem from "./TodoItem.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newTodoFieldValue: "",
      editing: false,
      editingId: null
    };
  }

  handleNewTodoTextChange(event) {
    this.setState({ newTodoFieldValue: event.target.value });
  }

  handleNewTodoKeyDown(event) {
    const pressedEnter = event.keyCode === ENTER_KEY;
    if (!pressedEnter) {
      return;
    }

    event.preventDefault();

    const newTodoText = this.state.newTodoFieldValue.trim();
    this.props.controller.createTodo(newTodoText);
    this.setState({ newTodoFieldValue: "" });
  }

  edit(todo) {
    this.setState({ editing: true, editingId: todo.id });
  }

  save(todoToSave, text) {
    this.props.controller.updateTodo(todoToSave, text);
    this.setState({ editing: false, editingId: null });
  }

  cancel() {
    this.setState({ editing: false, editingId: null });
  }

  render() {
    let main = null;
    const todos = this.props.controller.todos;
    const { newTodoFieldValue } = this.state;

    if (todos) {
      main = (
        <TodoList
          controller={this.props.controller}
          todos={todos}
          editingId={this.state.editingId}
          onSave={(...args) => this.save(...args)}
          onEdit={todo => this.edit(todo)}
          onCancel={() => this.cancel()}
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
        {main}
      </div>
    );
  }
}

const TodoList = ({
  controller,
  todos,
  editingId,
  onSave,
  onEdit,
  onCancel
}) => {
  return (
    <div className="todo-items-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          controller={controller}
          todo={todo}
          isEditing={editingId === todo.id}
          onSave={(...args) => onSave(...args)}
          onEdit={() => onEdit(todo)}
          onCancel={() => onCancel()}
          isLoading={controller.loading.includes(todo.id)}
        />
      ))}
    </div>
  );
};

export default App;
