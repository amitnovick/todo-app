import React from "react";

import TodosContext from "./TodosContext";
import realtimeDb from "../firebase/initializeRealtimeDb.js";

const mapUserIdToCollection = userId => `todos-${userId}`;

class TodosContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      isAwaitingTodos: true
    };
  }

  createTodo = async title => {
    const shouldCreateNewTodo = title.length > 0;
    if (!shouldCreateNewTodo) return;
    const todo = {
      title: title,
      completed: false,
      createdAt: new Date().toISOString()
    };
    const userId = this.props.userId;
    const todosCollection = mapUserIdToCollection(userId);
    await realtimeDb.collection(todosCollection).add(todo);
  };

  editTodo = async (todo, newTitle) => {
    const todoChange = {
      title: newTitle
    };
    const userId = this.props.userId;
    const todosCollection = mapUserIdToCollection(userId);
    await realtimeDb
      .collection(todosCollection)
      .doc(todo.id)
      .update(todoChange);
  };

  toggleTodo = async todo => {
    const todoChange = {
      completed: !todo.completed
    };
    const userId = this.props.userId;
    const todosCollection = mapUserIdToCollection(userId);
    await realtimeDb
      .collection(todosCollection)
      .doc(todo.id)
      .update(todoChange);
  };

  deleteTodo = async todo => {
    const userId = this.props.userId;
    const todosCollection = mapUserIdToCollection(userId);
    await realtimeDb
      .collection(todosCollection)
      .doc(todo.id)
      .delete();
  };

  _mountStore = async () => {
    const userId = this.props.userId;
    const todosCollection = mapUserIdToCollection(userId);
    await realtimeDb.collection(todosCollection).onSnapshot(snapshot => {
      if (this.isUnmounted) {
        return;
      }

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
    this.setState({ isAwaitingTodos: false });
  };

  componentDidMount() {
    this._mountStore();
  }

  /* 
  Added to attempt solving:
  > Warning: Can't call setState (or forceUpdate) on an unmounted component.
  > This is a no-op, but it indicates a memory leak in your application.
  Solution by https://stackoverflow.com/a/51247126 */
  componentWillUnmount() {
    this.isUnmounted = true;
  }

  render() {
    const { todos, isAwaitingTodos } = this.state;
    return (
      <TodosContext.Provider
        value={{
          todos,
          isAwaitingTodos,
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
