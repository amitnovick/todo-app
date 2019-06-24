import uuid from 'uuid/v4';

export const createTodo = (todos, payload) => {
  const { title } = payload;
  const todo = {
    id: uuid(),
    title: title,
    completed: false,
    createdAt: new Date().toISOString()
  };
  return todos.concat([todo]);
};

export const editTodo = (todos, payload) => {
  const { todo, newTitle } = payload;
  return todos.map(t => (t.id !== todo.id ? t : { ...t, title: newTitle }));
};

export const toggleTodo = (todos, payload) => {
  const { todo } = payload;
  return todos.map(t =>
    t.id !== todo.id ? t : { ...t, completed: !t.completed }
  );
};

export const deleteTodo = (todos, payload) => {
  const { todo } = payload;
  return todos.filter(t => t.id !== todo.id);
};
