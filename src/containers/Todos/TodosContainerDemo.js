import React from 'react';
import uuid from 'uuid/v4';

import TodoScreen from '../../components/TodosScreen/TodosScreen';

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

const todosReducer = (todos, action) => {
  switch (action.type) {
    case 'CREATE_TODO': {
      const { title } = action.payload;
      const todo = {
        id: uuid(),
        title: title,
        completed: false,
        createdAt: new Date().toISOString()
      };
      return todos.concat([todo]);
    }
    case 'EDIT_TODO': {
      const { todo, newTitle } = action.payload;
      return todos.map(t => (t !== todo ? t : { ...t, title: newTitle }));
    }
    case 'TOGGLE_TODO': {
      const { todo } = action.payload;
      return todos.map(t =>
        t !== todo ? t : { ...t, completed: !t.completed }
      );
    }
    case 'DELETE_TODO': {
      const { todo } = action.payload;
      return todos.filter(t => t.id !== todo.id);
    }
    default:
      return todos;
  }
};

const TodosContainer = () => {
  const [todos, setTodos] = React.useState(loadFromLocalStorage());

  const processAction = action => {
    const newTodos = todosReducer(todos, action);
    setTodos(newTodos);
    saveToLocalStorage(newTodos);
  };

  const createTodo = title => {
    processAction({
      type: 'CREATE_TODO',
      payload: {
        title
      }
    });
  };

  const editTodo = (todo, newTitle) => {
    processAction({
      type: 'EDIT_TODO',
      payload: {
        todo,
        newTitle
      }
    });
  };

  const toggleTodo = todo => {
    processAction({
      type: 'TOGGLE_TODO',
      payload: {
        todo
      }
    });
  };

  const deleteTodo = todo => {
    processAction({
      type: 'DELETE_TODO',
      payload: {
        todo
      }
    });
  };

  return (
    <TodoScreen
      todos={todos}
      createTodo={createTodo}
      editTodo={editTodo}
      toggleTodo={toggleTodo}
      deleteTodo={deleteTodo}
    />
  );
};

export default TodosContainer;
