import React from "react";

import TodoList from "../../components/TodoList";
import CreateTodoTextbox from "../../components/CreateTodoTextbox";

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
