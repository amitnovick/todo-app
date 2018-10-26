import React, { Component } from "react";
import TodoListItem from "./TodoListItem.js";
import styled from "styled-components";

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

  handleDestroyClick(itemID) {
    this.props.onDestroy(itemID);
  }

  render() {
    const { todos, loadingItemIDs, onToggle } = this.props;
    const { titleEditItemID } = this.state;

    return (
      <StyledSection>
        <StyledUnorderedList>
          {todos.map(todo => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              isBeingEdited={titleEditItemID === todo.id}
              replaceTitle={title => this.replaceTitle(todo, title)}
              onTitleClick={() => this.activateTitleEditMode(todo)}
              onDestroyClick={() => this.handleDestroyClick(todo.id)}
              onCancelTitleEdit={() => this.deactivateTitleEditMode()}
              isLoading={loadingItemIDs.includes(todo.id)}
              onToggle={() => onToggle(todo)}
            />
          ))}
        </StyledUnorderedList>
      </StyledSection>
    );
  }
}

export default TodoList;

const StyledUnorderedList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const StyledSection = styled.section`
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
`;
