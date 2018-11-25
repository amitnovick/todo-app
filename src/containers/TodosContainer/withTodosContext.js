import React from "react";

import { TodosContext } from "./index.js";

const withTodosContext = Component => props => (
  <TodosContext.Consumer>
    {context => (
      <Component
        {...props}
        todos={context.todos}
        isAwaitingTodos={context.isAwaitingTodos}
        createTodo={context.createTodo}
        editTodo={context.editTodo}
        toggleTodo={context.toggleTodo}
        deleteTodo={context.deleteTodo}
      />
    )}
  </TodosContext.Consumer>
);

export default withTodosContext;
