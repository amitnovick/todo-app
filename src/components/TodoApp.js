import React, { Component } from "react";
import TodoList from "./TodoList.js";
import TodoCreationField from "./TodoCreationField.js";

class TodoApp extends Component {
  render() {
    let main = null;
    const {
      todos,
      loadingTodoIDs,
      createTodo,
      replaceTodoTitle,
      destroyTodo,
      toggleTodo
    } = this.props;
    if (todos.length > 0) {
      main = (
        <TodoList
          todos={todos}
          loadingItemIDs={loadingTodoIDs}
          onDestroy={todoID => destroyTodo(todoID)}
          replaceTitle={(todo, title) => replaceTodoTitle(todo, title)}
          onToggle={todo => toggleTodo(todo)}
        />
      );
    }
    return (
      <div>
        <TodoCreationField createTodo={title => createTodo(title)} />
        {main}
      </div>
    );
  }
}

export default TodoApp;
