import React from 'react';

import { store, uuid } from '../../utils.js';
import TodosContext from './TodosContext.js';

const TODOS = 'todos';

class TodosContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  createTodo = async title => {
    const todo = {
      id: uuid(),
      title: title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    const newTodos = this.state.todos.concat([todo]);

    this.setState({ todos: newTodos });
    await this.updateLocalStore(newTodos);
  };

  editTodo = async (todo, newTitle) => {
    const newTodos = this.state.todos.map(
      t => (t !== todo ? t : { ...t, title: newTitle }),
    );
    this.setState({ todos: newTodos });
    await this.updateLocalStore(newTodos);
  };

  toggleTodo = async todo => {
    const newTodos = this.state.todos.map(
      t => (t !== todo ? t : { ...t, completed: !t.completed }),
    );
    this.setState({ todos: newTodos });
    await this.updateLocalStore(newTodos);
  };

  deleteTodo = async todo => {
    const newTodos = this.state.todos.filter(t => t.id !== todo.id);
    this.setState({ todos: newTodos });
    await this.updateLocalStore(newTodos);
  };

  updateLocalStore = async newTodos => {
    await store(TODOS, newTodos);
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
          deleteTodo: this.deleteTodo,
        }}
      >
        {this.props.children}
      </TodosContext.Provider>
    );
  }
}

export default TodosContainer;
