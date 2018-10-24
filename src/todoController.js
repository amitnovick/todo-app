import {
  uploadServerCreateTodo,
  downloadServerReadTodos,
  uploadServerUpdateTodo,
  uploadServerDeleteTodo
} from "./apiFetch.js";

/* TODO Purpose: re-sending failed requests
    Proposition:
    - create queue of unsuccessful tasks as a class field
      a task added to the queue should have type
      e.g. values like { 'create', 'read', 'update', 'delete' }
    - every time a task is first attempted it is added to the queue
    */

class TodoController {
  constructor() {
    this.todos = [];
    this.renderControl = null;
    this.loading = [];

    this.createTodo = this.createTodo.bind(this);
    this.readTodos = this.readTodos.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.inform = this.inform.bind(this);
    this.updateLocalDataCreateTodo = this.updateLocalDataCreateTodo.bind(this);
    this.updateLocalDataReadTodos = this.updateLocalDataReadTodos.bind(this);
    this.updateLocalDataUpdateTodo = this.updateLocalDataUpdateTodo.bind(this);
    this.updateLocalDataDeleteTodo = this.updateLocalDataDeleteTodo.bind(this);
  }

  subscribe(renderControl) {
    this.renderControl = renderControl;
    this.readTodos();
  }

  inform() {
    this.renderControl();
  }

  createTodo(title) {
    const shouldCreateNewTodo = title.length > 0;
    if (shouldCreateNewTodo) {
      uploadServerCreateTodo(this.updateLocalDataCreateTodo, title);
    }
  }

  readTodos() {
    downloadServerReadTodos(this.updateLocalDataReadTodos);
  }

  updateTodo(todo, newTitle) {
    this.startLoading(todo.id);
    uploadServerUpdateTodo(this.updateLocalDataUpdateTodo, newTitle, todo.id);
  }

  deleteTodo(todoId) {
    uploadServerDeleteTodo(this.updateLocalDataDeleteTodo, todoId);
  }

  updateLocalDataCreateTodo(todo) {
    // this.stopLoading(todo.id);
    const newTodos = this.todos.concat([todo]);
    this.todos = newTodos;
    this.inform();
  }

  updateLocalDataReadTodos(todos) {
    this.todos = todos;
    this.inform();
  }

  updateLocalDataUpdateTodo(todoId, newTodo) {
    this.stopLoading(todoId);

    const newTodos = this.todos.map(todo => {
      return todo.id === todoId ? newTodo : todo;
    });
    this.todos = newTodos;
    this.inform();
  }

  updateLocalDataDeleteTodo(todoId) {
    // this.startLoading(todoId);
    const newTodos = this.todos.filter(todo => {
      return todo.id !== todoId;
    });
    this.todos = newTodos;
    this.inform();
  }

  startLoading(todoID) {
    this.loading = this.loading.concat([todoID]);
  }

  stopLoading(todoId) {
    this.loading = this.loading.filter(todoID => {
      return todoID !== todoId;
    });
  }
}

export default TodoController;
