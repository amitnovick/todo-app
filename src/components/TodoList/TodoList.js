/**
 * External dependencies
 */
import React, { Component } from "react";
/**
 * Internal dependencies
 */
import TodoListItem from "../TodoListItem/TodoListItem.js";
/* Styled components */
import ListWrapper from "./styles/ListWrapper.js";
import StyledTodoList from "./styles/StyledTodoList.js";

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      titleEditItemID: null
    };

    this.deactivateTitleEditMode = this.deactivateTitleEditMode.bind(this);
  }

  replaceTitle(todoToSave, text) {
    this.props.replaceTitle(todoToSave, text);
    this.deactivateTitleEditMode();
  }

  activateTitleEditMode(todo) {
    this.setState({
      titleEditItemID: todo.id
    });
  }

  deactivateTitleEditMode() {
    this.setState({
      titleEditItemID: null
    });
  }

  /* Utility method */
  isLastChild(i, arr) {
    return i === arr.length - 1;
  }

  render() {
    const { todos, loadingItemIDs, onToggle } = this.props;
    const { titleEditItemID } = this.state;
    return (
      <ListWrapper>
        <StyledTodoList>
          {todos.map((todo, i, arr) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              isBeingEdited={titleEditItemID === todo.id}
              replaceTitle={title => this.replaceTitle(todo, title)}
              onTitleClick={() => this.activateTitleEditMode(todo)}
              onDestroy={() => this.props.onDestroy(todo.id)}
              onCancelTitleEdit={() => this.deactivateTitleEditMode()}
              isLoading={loadingItemIDs.includes(todo.id)}
              onToggle={() => onToggle(todo)}
              isLastChild={this.isLastChild(i, arr)}
            />
          ))}
        </StyledTodoList>
      </ListWrapper>
    );
  }
}

export default TodoList;
