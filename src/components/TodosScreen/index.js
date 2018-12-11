import React from "react";

import TodoList from "../TodoList";
import CreateTodoTextbox from "../CreateTodoTextbox";
import { StyledDiv } from "./style.js";

const Todos = ({
  // container state
  todos,
  // container methods
  createTodo,
  editTodo,
  toggleTodo,
  deleteTodo
}) => {
  return (
    <StyledDiv className="todoapp">
      <CreateTodoTextbox onSubmit={title => createTodo(title)} />
      <TodoList
        todos={todos}
        onDelete={todo => deleteTodo(todo)}
        onEdit={(todo, title) => editTodo(todo, title)}
        onToggle={todo => toggleTodo(todo)}
      />
    </StyledDiv>
  );
};

export default Todos;
