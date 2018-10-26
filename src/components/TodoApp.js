import React, { Component } from "react";
import TodoList from "./TodoList.js";
import TodoCreationField from "./TodoCreationField.js";
import styled from "styled-components";

class TodoApp extends Component {
  render() {
    let main = null;
    const {
      todos,
      loadingTodoIDs,
      createTodo,
      replaceTodoTitle,
      destroyTodo,
      toggleTodo
    } = this.props;
    if (todos.length > 0) {
      main = (
        <TodoList
          todos={todos}
          loadingItemIDs={loadingTodoIDs}
          onDestroy={todoID => destroyTodo(todoID)}
          replaceTitle={(todo, title) => replaceTodoTitle(todo, title)}
          onToggle={todo => toggleTodo(todo)}
        />
      );
    }
    return (
      <StyledDiv>
        <TodoCreationField createTodo={title => createTodo(title)} />
        {main}
      </StyledDiv>
    );
  }
}

export default TodoApp;

const StyledDiv = styled.div`
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`;
