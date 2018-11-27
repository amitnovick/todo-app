import React from "react";

import firestore from "../../firebase/db.js";
import { store, uuid } from "../../store/local-store.js";
import withAuthContext from "../AuthContainer/withAuthContext";

export const TodosContext = React.createContext();

const TODOS = "todos";
const userIdToCollectionMap = userID => `todos-${userID}`;

class TodosContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      isAwaitingTodos: true
    };
  }

  updateLocalStore = async newTodos => {
    await store(TODOS, newTodos);
  };

  createTodo = async title => {
    if (this.props.isAuthenticated) {
      const shouldCreateNewTodo = title.length > 0;
      if (!shouldCreateNewTodo) return;
      const todo = {
        title: title,
        completed: false,
        createdAt: new Date().toISOString()
      };
      const todosCollection = userIdToCollectionMap(this.props.userID);
      await firestore.collection(todosCollection).add(todo);
    } else {
      const shouldCreateNewTodo = title.length > 0;
      if (shouldCreateNewTodo) {
        const todo = {
          id: uuid(),
          title: title,
          completed: false,
          createdAt: new Date().toISOString()
        };
        const newTodos = this.state.todos.concat(todo);

        this.setState({ todos: newTodos });
        await this.updateLocalStore(newTodos);
      }
    }
  };

  editTodo = async (todo, newTitle) => {
    if (this.props.isAuthenticated) {
      const todoChange = {
        title: newTitle
      };
      const todosCollection = userIdToCollectionMap(this.props.userID);
      await firestore
        .collection(todosCollection)
        .doc(todo.id)
        .update(todoChange);
    } else {
      const todoChangeFunction = t =>
        t !== todo ? t : { ...t, title: newTitle };
      const newTodos = this.state.todos.map(todoChangeFunction);
      this.setState({ todos: newTodos });
      await this.updateLocalStore(newTodos);
    }
  };

  toggleTodo = async todo => {
    if (this.props.isAuthenticated) {
      const todoChange = {
        completed: !todo.completed
      };
      const todosCollection = userIdToCollectionMap(this.props.userID);
      await firestore
        .collection(todosCollection)
        .doc(todo.id)
        .update(todoChange);
    } else {
      const todoChangeFunction = t =>
        t !== todo ? t : { ...t, completed: !t.completed };
      const newTodos = this.state.todos.map(todoChangeFunction);
      this.setState({ todos: newTodos });
      await this.updateLocalStore(newTodos);
    }
  };

  deleteTodo = async todo => {
    if (this.props.isAuthenticated) {
      const todosCollection = userIdToCollectionMap(this.props.userID);
      await firestore
        .collection(todosCollection)
        .doc(todo.id)
        .delete();
    } else {
      const todoChangeFunction = t => t.id !== todo.id;
      const newTodos = this.state.todos.filter(todoChangeFunction);
      this.setState({ todos: newTodos });
      await this.updateLocalStore(newTodos);
    }
  };

  mountStore = async () => {
    if (this.props.isAuthenticated) {
      const todosCollection = userIdToCollectionMap(this.props.userID);
      await firestore.collection(todosCollection).onSnapshot(snapshot => {
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
    } else {
      const todos = await store(TODOS);
      this.setState({ todos });
    }
    this.setState({ isAwaitingTodos: false });
  };

  componentDidMount() {
    this.mountStore();
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

export default withAuthContext(TodosContainer);
