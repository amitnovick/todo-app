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
import List from "../List/index.js";
import CreationTextbox from "../CreationTextbox/index.js";
import Div from "./Div.js";

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
      <List
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
      <CreationTextbox createTodo={title => createTodo(title)} />
    );
  app = finishedReadingTodos ? (
    <Div className="todoapp">
      {newTodoBarContent}
      {main}
    </Div>
  ) : (
    spinner
  );
  return app;
};

export default App;
