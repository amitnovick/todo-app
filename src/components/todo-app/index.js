/**
 * External dependencies
 */
import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
/**
 * Internal dependencies
 */
import TodoList from "../todo-list/index.js";
import CreateTodoTextbox from "../create-todo-textbox/index.js";
/**
 *  Style dependencies
 */
import { Wrapper } from "./style.js";

library.add(faSpinner);

const App = ({
  todos,
  loadingTodoIDs,
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
  let spinner = <FontAwesomeIcon icon="spinner" pulse />;
  main =
    todos.length > 0 ? (
      <TodoList
        todos={todos}
        loadingItemIDs={loadingTodoIDs}
        onDestroy={todoID => destroyTodo(todoID)}
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
    <Wrapper>
      {newTodoBarContent}
      {main}
    </Wrapper>
  ) : (
    spinner
  );
  return app;
};

export default App;
