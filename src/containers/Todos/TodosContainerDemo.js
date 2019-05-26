import React from 'react';

import TodosContext from './TodosContext.js';

/////////////////// UTILS ////////////
const NAMESPACE = 'todos';

const uuid = () => {
  /*jshint bitwise:false */
  let i, random;
  let uuid = '';

  for (i = 0; i < 32; i++) {
    random = (Math.random() * 16) | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-';
    }
    // eslint-disable-next-line
    uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
  }

  return uuid;
};

const defaultInitialData = [
  {
    id: uuid(),
    title: 'Run house chores',
    completed: true,
    createdAt: new Date().toISOString()
  },
  {
    id: uuid(),
    title: 'Cook dinner',
    completed: true,
    createdAt: new Date().toISOString()
  },
  {
    id: uuid(),
    title: 'Do what you really want!',
    completed: false,
    createdAt: new Date().toISOString()
  }
];

const loadFromLocalStorage = () => {
  const localStorageData = localStorage.getItem(NAMESPACE);
  return localStorageData == null
    ? defaultInitialData
    : JSON.parse(localStorageData);
};

const saveToLocalStorage = data =>
  localStorage.setItem(NAMESPACE, JSON.stringify(data));
/////////////////// UTILS ////////////

class TodosContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  createTodo = title => {
    const todo = {
      id: uuid(),
      title: title,
      completed: false,
      createdAt: new Date().toISOString()
    };
    const newTodos = this.state.todos.concat([todo]);

    this.setState({ todos: newTodos });
    saveToLocalStorage(newTodos);
  };

  editTodo = (todo, newTitle) => {
    const newTodos = this.state.todos.map(t =>
      t !== todo ? t : { ...t, title: newTitle }
    );
    this.setState({ todos: newTodos });
    saveToLocalStorage(newTodos);
  };

  toggleTodo = todo => {
    const newTodos = this.state.todos.map(t =>
      t !== todo ? t : { ...t, completed: !t.completed }
    );
    this.setState({ todos: newTodos });
    saveToLocalStorage(newTodos);
  };

  deleteTodo = todo => {
    const newTodos = this.state.todos.filter(t => t.id !== todo.id);
    this.setState({ todos: newTodos });
    saveToLocalStorage(newTodos);
  };

  async componentDidMount() {
    const todos = await loadFromLocalStorage();
    this.setState({ todos });
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
