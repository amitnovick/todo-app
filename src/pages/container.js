/**
 * External dependencies
 */
import React, { Component } from "react";
/**
 * Internal dependencies
 */
import TodoList from "../components/todo-list/index.js";
import CreateTodoTextbox from "../components/create-todo-textbox/index.js";
import firestore from "../lib/firebase/firestore/index.js";
/**
 * Style dependencies
 */
import "./style.css";

const TODOS = "todos";

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };

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
      this.setState({ todos });
    });
  }

  createTodo(title) {
    const shouldCreateNewTodo = title.length > 0;
    if (!shouldCreateNewTodo) return;
    firestore.collection(TODOS).add({
      title: title,
      completed: false,
      createdAt: new Date().toISOString()
    });
  }

  editTodo(todo, newTitle) {
    firestore
      .collection(TODOS)
      .doc(todo.id)
      .update({
        title: newTitle
      });
  }

  toggleTodo(todo) {
    firestore
      .collection(TODOS)
      .doc(todo.id)
      .update({
        completed: !todo.completed
      });
  }

  deleteTodo(todo) {
    firestore
      .collection(TODOS)
      .doc(todo.id)
      .delete();
  }

  render() {
    const { todos } = this.state;
    return (
      <div className="todoapp">
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

export default AppContainer;
