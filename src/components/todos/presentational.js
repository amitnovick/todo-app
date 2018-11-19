import React from "react";

import TodoList from "../todo-list/index.js";
import CreateTodoTextbox from "../create-todo-textbox/index.js";

import "./style.css";

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
      <CreateTodoTextbox createTodo={title => createTodo(title)} />
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
