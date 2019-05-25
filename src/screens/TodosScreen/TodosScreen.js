import React from 'react';

import TodoList from './components/TodoList/index';
import CreateTodoTextbox from './components/CreateTodoTextbox/index';
import styles from './style.module.css';

const Todos = ({
  // container state
  todos,
  // container methods
  createTodo,
  editTodo,
  toggleTodo,
  deleteTodo
}) => {
  return (
    <div className={styles['div-1']}>
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
