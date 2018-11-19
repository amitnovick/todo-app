import React from "react";

import TodoList from "./presentational.js";

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

class TodoListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editingTodo: null,
      editTitle: ""
    };

    this.inputRef = React.createRef();
  }

  replaceTitle = todo => {
    const editTitleValue = this.state.editTitle.trim();
    if (editTitleValue.length === 0) this.props.onDelete(todo);
    else if (editTitleValue !== todo.title) {
      this.props.onEdit(todo, editTitleValue);
      this.deactivateTitleEditMode();
      this.setState({ editTitle: "" });
    } else this.deactivateTitleEditMode();
  };

  activateTitleEditMode = todo => {
    this.setState({
      editingTodo: todo
    });
  };

  deactivateTitleEditMode = () => {
    this.setState({
      editingTodo: null
    });
  };

  isTodoBeingEdited = todo => {
    return this.state.editingTodo && todo.id === this.state.editingTodo.id;
  };

  /* TodoListItem */
  handleTitleClick = todo => {
    this.activateTitleEditMode(todo);
    this.setState({ editTitle: todo.title });
  };

  handleEditTitleTextChange = event => {
    this.setState({ editTitle: event.target.value });
  };

  handleEditTitleKeyDown = (event, todo) => {
    if (event.which === ESCAPE_KEY) {
      this.deactivateTitleEditMode();
    } else if (event.which === ENTER_KEY) {
      this.replaceTitle(todo);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      !(prevState.editingTodo && prevState.editingTodo.id) &&
      (this.state.editingTodo && this.state.editingTodo.id)
    ) {
      this.inputRef.current.focus();
    }
  }

  render() {
    return (
      <TodoList
        {...this.props}
        {...this.state}
        isTodoBeingEdited={this.isTodoBeingEdited}
        handleEditTitleTextChange={this.handleEditTitleTextChange}
        handleEditTitleKeyDown={this.handleEditTitleKeyDown}
        handleTitleClick={this.handleTitleClick}
        replaceTitle={this.replaceTitle}
        inputRef={this.inputRef}
      />
    );
  }
}

export default TodoListContainer;
