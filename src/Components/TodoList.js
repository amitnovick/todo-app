import React, { Component } from "react";
import TodoListItem from "./TodoListItem.js";

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      titleEditModeActive: false,
      titleEditItemID: null
    };
  }

  submitTitle(todoToSave, text) {
    this.props.submitTitle(todoToSave, text);
    this.setState({ titleEditModeActive: false, titleEditItemID: null });
  }

  activateTitleEditMode(todo) {
    this.setState({ titleEditModeActive: true, titleEditItemID: todo.id });
  }

  deactivateTitleEditMode() {
    this.setState({ titleEditModeActive: false, titleEditItemID: null });
  }

  handleDestroyClick(itemID) {
    this.props.onDestroy(itemID);
  }

  render() {
    const { todos, loadingItemIDs } = this.props;
    const { titleEditItemID } = this.state;

    return (
      <div className="todo-app-list">
        {todos.map(todo => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            isBeingEdited={titleEditItemID === todo.id}
            submitTitle={title => this.submitTitle(todo, title)}
            onTitleClick={() => this.activateTitleEditMode(todo)}
            onDestroyClick={() => this.handleDestroyClick(todo.id)}
            onCancelTitleEdit={() => this.deactivateTitleEditMode()()}
            isLoading={loadingItemIDs.includes(todo.id)}
          />
        ))}
      </div>
    );
  }
}

export default TodoList;
