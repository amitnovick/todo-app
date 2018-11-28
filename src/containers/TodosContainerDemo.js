import React from "react";

import { store, uuid } from "../store/local-store.js";
import TodosContext from "./TodosContext";

const TODOS = "todos";

class TodosContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  updateLocalStore = async newTodos => {
    await store(TODOS, newTodos);
  };

  createTodo = async title => {
    const shouldCreateNewTodo = title.length > 0;
    if (!shouldCreateNewTodo) return;
    const todo = {
      id: uuid(),
      title: title,
      completed: false,
      createdAt: new Date().toISOString()
    };
    const newTodos = this.state.todos.concat(todo);

    this.setState({ todos: newTodos });
    await this.updateLocalStore(newTodos);
  };

  editTodo = async (todo, newTitle) => {
    const todoChangeFunction = t =>
      t !== todo ? t : { ...t, title: newTitle };
    const newTodos = this.state.todos.map(todoChangeFunction);
    this.setState({ todos: newTodos });
    await this.updateLocalStore(newTodos);
  };

  toggleTodo = async todo => {
    const todoChangeFunction = t =>
      t !== todo ? t : { ...t, completed: !t.completed };
    const newTodos = this.state.todos.map(todoChangeFunction);
    this.setState({ todos: newTodos });
    await this.updateLocalStore(newTodos);
  };

  deleteTodo = async todo => {
    const todoChangeFunction = t => t.id !== todo.id;
    const newTodos = this.state.todos.filter(todoChangeFunction);
    this.setState({ todos: newTodos });
    await this.updateLocalStore(newTodos);
  };

  mountStore = async () => {
    const todos = await store(TODOS);
    this.setState({ todos });
  };

  componentDidMount() {
    this.mountStore();
  }

  render() {
    const { todos } = this.state;
    return (
      <TodosContext.Provider
        value={{
          todos,
          createTodo: this.createTodo,
          editTodo: this.editTodo,
          toggleTodo: this.toggleTodo,
          deleteTodo: this.deleteTodo
        }}
      >
        {this.props.children}
      </TodosContext.Provider>
    );
  }
}

export default TodosContainer;
