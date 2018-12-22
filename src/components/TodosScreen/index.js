import React from 'react';

import TodoList from '../TodoList/index.js';
import CreateTodoTextbox from '../CreateTodoTextbox/index.js';
import { StyledDiv } from './style.js';

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
      <CreateTodoTextbox createTodo={createTodo} />
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
