import React from "react";

import firestore from "../../firebase/db.js";
import { store, uuid } from "../../store/local-store.js";
import withAuthContext from "../AuthContainer/withAuthContext";

export const TodosContext = React.createContext();

const TODOS = "todos";

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
      await firestore.collection(TODOS).add({
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
        await this.updateLocalStore(newTodos);
      }
    }
  };

  editTodo = async (todo, newTitle) => {
    if (this.props.isAuthenticated) {
      await firestore
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
      await this.updateLocalStore(newTodos);
    }
  };

  toggleTodo = async todo => {
    if (this.props.isAuthenticated) {
      await firestore
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
      await this.updateLocalStore(newTodos);
    }
  };

  deleteTodo = async todo => {
    if (this.props.isAuthenticated) {
      await firestore
        .collection(TODOS)
        .doc(todo.id)
        .delete();
    } else {
      const newTodos = this.state.todos.filter(t => t.id !== todo.id);
      this.setState({ todos: newTodos });
      await this.updateLocalStore(newTodos);
    }
  };

  mountStore = async () => {
    if (this.props.isAuthenticated) {
      await firestore.collection(TODOS).onSnapshot(snapshot => {
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

  // componentDidUpdate(prevProps) {
  //   if (prevProps.isAuthenticated !== this.props.isAuthenticated)
  //     this.mountStore();
  // }

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
