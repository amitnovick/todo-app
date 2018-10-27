import React, { Component } from "react";
import TodoList from "./TodoList.js";
import CreationTextbox from "./CreationTextbox.js";
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
      <SDiv className="todoapp">
        <CreationTextbox createTodo={title => createTodo(title)} />
        {main}
      </SDiv>
    );
  }
}

export default TodoApp;

const SDiv = styled.div`
  // .todoapp
   {
    background: #fff;
    margin: 130px 0 40px 0;
    position: relative;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  }

  // .todoapp input::-webkit-input-placeholder
  input::-webkit-input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }

  // .todoapp input::-moz-placeholder
  input::-moz-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }

  // .todoapp input::input-placeholder
  input::input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }
`;
