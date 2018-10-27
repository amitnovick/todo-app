import React, { Component } from "react";
import List from "../List/index.js";
import CreationTextbox from "../CreationTextbox/index.js";
import Div from "./Div.js";

class App extends Component {
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
        <List
          todos={todos}
          loadingItemIDs={loadingTodoIDs}
          onDestroy={todoID => destroyTodo(todoID)}
          replaceTitle={(todo, title) => replaceTodoTitle(todo, title)}
          onToggle={todo => toggleTodo(todo)}
        />
      );
    }
    return (
      <Div className="todoapp">
        <CreationTextbox createTodo={title => createTodo(title)} />
        {main}
      </Div>
    );
  }
}

export default App;
