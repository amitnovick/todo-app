import React, { Component } from "react";
import { ESCAPE_KEY, ENTER_KEY } from "./constants/index.js";

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
          editing={editingId === todo.id}
          onSave={(...args) => onSave(...args)}
          onEdit={() => onEdit(todo)}
          onCancel={() => onCancel()}
        />
      ))}
    </div>
  );
};

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
    const pressedEnter = event.keyCode === ENTER_KEY;
    if (!pressedEnter) {
      return;
    }

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
      this.props.onSave(this.props.todo, editTextValue); // TODO <-- complete
      this.setState({ editText: "" });
      // TODO setState for App component, `editing`: false
    }
  }

  deleteTodo() {
    this.props.controller.deleteTodo(this.props.todo.id);
  }

  handleEdit() {
    this.props.onEdit();
  }

  render() {
    const { todo, editing } = this.props;
    const { editText } = this.state;
    if (todo.loading) {
      return <span key={todo.id}>{"Loading..."}</span>;
    }
    if (editing) {
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

export default App;
