/**
 * External dependencies
 */
import React, { Component } from "react";
/**
 * Internal dependencies
 */
import TodoList from "../components/todo-list/index.js";
import CreateTodoTextbox from "../components/create-todo-textbox/index.js";
import firestore from "../store/firebase/firestore.js";
import { store, uuid } from "../store/local-store.js";
import { auth } from "../store/firebase/oauth.js";
/**
 * Style dependencies
 */
import "./style.css";

const TODOS = "todos";

class Container extends Component {
  constructor(props) {
    super(props);
    this.key = "todo-app";

    this.state = {
      todos: [],
      isAuthenticated: null
    };

    this.createTodo = this.createTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  updateLocalStore(newTodos) {
    store(this.key, newTodos);
  }

  createTodo(title) {
    if (this.state.isAuthenticated) {
      const shouldCreateNewTodo = title.length > 0;
      if (!shouldCreateNewTodo) return;
      firestore.collection(TODOS).add({
        title: title,
        completed: false,
        createdAt: new Date().toISOString()
      });
    } else {
      const shouldCreateNewTodo = title.length > 0;
      if (shouldCreateNewTodo) {
        const newTodos = this.state.todos.concat({
          id: uuid(),
          title: title,
          completed: false,
          createdAt: new Date().toISOString()
        });

        this.setState({ todos: newTodos });
        this.updateLocalStore(newTodos);
      }
    }
  }

  editTodo(todo, newTitle) {
    if (this.state.isAuthenticated) {
      firestore
        .collection(TODOS)
        .doc(todo.id)
        .update({
          title: newTitle
        });
    } else {
      const newTodos = this.state.todos.map(
        t => (t !== todo ? t : { ...t, title: newTitle })
      );
      this.setState({ todos: newTodos });
      this.updateLocalStore(newTodos);
    }
  }

  toggleTodo(todo) {
    if (this.state.isAuthenticated) {
      firestore
        .collection(TODOS)
        .doc(todo.id)
        .update({
          completed: !todo.completed
        });
    } else {
      const newTodos = this.state.todos.map(
        t => (t !== todo ? t : { ...t, completed: !t.completed })
      );
      this.setState({ todos: newTodos });
      this.updateLocalStore(newTodos);
    }
  }

  deleteTodo(todo) {
    if (this.state.isAuthenticated) {
      firestore
        .collection(TODOS)
        .doc(todo.id)
        .delete();
    } else {
      const newTodos = this.state.todos.filter(
        candidate => candidate.id !== todo.id
      );
      this.setState({ todos: newTodos });
      this.updateLocalStore(newTodos);
    }
  }

  componentDidMount() {
    auth.getAuth().onAuthStateChanged(user => {
      if (user) {
        firestore.collection(TODOS).onSnapshot(snapshot => {
          let todos = [];
          snapshot.forEach(doc => {
            const todo = doc.data();
            todo.id = doc.id;
            todos.push(todo);
          });

          const timeCreated = (todoA, todoB) => {
            return (
              new Date(todoA.createdAt).getTime() -
              new Date(todoB.createdAt).getTime()
            );
          };

          todos.sort(timeCreated);
          // Anytime the state of our database changes, we update state
          this.setState({ todos, isAuthenticated: true });
        });
      } else {
        this.setState({ todos: store(this.key), isAuthenticated: false });
      }
    });
  }

  render() {
    const { todos, isAuthenticated } = this.state;
    return (
      <div className="todoapp">
        <label>{isAuthenticated ? "Logged-in" : "Disconnected"}</label>
        <CreateTodoTextbox createTodo={title => this.createTodo(title)} />
        <TodoList
          todos={todos}
          onDelete={todo => this.deleteTodo(todo)}
          onEdit={(todo, title) => this.editTodo(todo, title)}
          onToggle={todo => this.toggleTodo(todo)}
        />
      </div>
    );
  }
}

export default Container;
