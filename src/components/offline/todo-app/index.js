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
import { Wrapper } from "./style.js";

const App = ({
  todos,
  createTodo,
  replaceTodoTitle,
  destroyTodo,
  toggleTodo
}) => {
  let app = null;
  let main = null;
  let newTodoBarContent = null;
  main =
    todos.length > 0 ? (
      <TodoList
        todos={todos}
        onDestroy={todoID => destroyTodo(todoID)}
        replaceTitle={(todo, title) => replaceTodoTitle(todo, title)}
        onToggle={todo => toggleTodo(todo)}
      />
    ) : null;
  newTodoBarContent = (
    <CreateTodoTextbox createTodo={title => createTodo(title)} />
  );
  app = (
    <Wrapper>
      {newTodoBarContent}
      {main}
    </Wrapper>
  );
  return app;
};

export default App;
