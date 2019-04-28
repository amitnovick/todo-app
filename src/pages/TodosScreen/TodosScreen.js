import React from 'react';

import TodoList from './components/TodoList/index.js.js';
import CreateTodoTextbox from './components/CreateTodoTextbox/index.js';
import styles from './style.module.css';

const Todos = ({
  // container state
  todos,
  // container methods
  createTodo,
  editTodo,
  toggleTodo,
  deleteTodo,
}) => {
  return (
    <div className={`todoapp ${styles['div-1']}`}>
      <CreateTodoTextbox createTodo={createTodo} />
      <TodoList
        todos={todos}
        onDelete={todo => deleteTodo(todo)}
        onEdit={(todo, title) => editTodo(todo, title)}
        onToggle={todo => toggleTodo(todo)}
      />
    </div>
  );
};

export default Todos;
