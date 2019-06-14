import React from 'react';
import uuid from 'uuid/v4';

import TodoScreen from '../../screens/TodosScreen/TodosScreen';

/////////////////// UTILS ////////////
const NAMESPACE = 'todos';

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
    this.mounted = true; // Hack, see: https://stackoverflow.com/questions/49906437/how-to-cancel-a-fetch-on-componentwillunmount
    // Also, don't rename to `isMounted` since it's a preserved React keyword, see: https://github.com/azmenak/react-stripe-checkout/issues/83
    const todos = await loadFromLocalStorage();
    if (this.mounted === true) {
      this.setState({ todos });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { todos } = this.state;
    return (
      <TodoScreen
        todos={todos}
        createTodo={this.createTodo}
        editTodo={this.editTodo}
        toggleTodo={this.toggleTodo}
        deleteTodo={this.deleteTodo}
      />
    );
  }
}

export default TodosContainer;
