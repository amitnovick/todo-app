import React from "react";

import "./style.css";

import TodoList from "../TodoList";
import CreateTodoTextbox from "../CreateTodoTextbox";

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
    <div className="todoapp">
      <CreateTodoTextbox onSubmit={title => createTodo(title)} />
      <TodoList
        todos={todos}
        onDelete={todo => deleteTodo(todo)}
        onEdit={(todo, title) => editTodo(todo, title)}
        onToggle={todo => toggleTodo(todo)}
      />
    </div>
  );
};

export default Todos;
