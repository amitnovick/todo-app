/**
 * External dependencies
 */
import React from "react";
/**
 * Internal dependencies
 */
import TodoList from "../todo-list/index.js";
import CreateTodoTextbox from "../create-todo-textbox/index.js";
/**
 *  Style dependencies
 */
import "./style.css";

const App = ({
  todos,
  loadingTodos,
  createTodo,
  replaceTodoTitle,
  destroyTodo,
  toggleTodo,
  loadingNewTodo,
  finishedReadingTodos
}) => {
  let app = null;
  let main = null;
  let newTodoBarContent = null;
  let spinner = <label>{"Loading..."}</label>;
  main =
    todos.length > 0 ? (
      <TodoList
        todos={todos}
        loadingTodos={loadingTodos}
        onDestroy={todo => destroyTodo(todo)}
        replaceTitle={(todo, title) => replaceTodoTitle(todo, title)}
        onToggle={todo => toggleTodo(todo)}
      />
    ) : null;
  newTodoBarContent =
    loadingNewTodo === true ? (
      spinner
    ) : (
      <CreateTodoTextbox createTodo={title => createTodo(title)} />
    );
  app = finishedReadingTodos ? (
    <div className="todoapp">
      {newTodoBarContent}
      {main}
    </div>
  ) : (
    spinner
  );
  return app;
};

export default App;
