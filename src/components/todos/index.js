import React from "react";

import firestore from "../../firebase/store/firestore.js";
import { store, uuid } from "../../store/local-store.js";
import withAuthContext from "../../containers/withAuthContext";
import Todos from "./presentational.js";

const TODOS = "todos";

class TodosContainer extends React.Component {
  constructor(props) {
    super(props);
    this.key = "todo-app";

    this.state = {
      todos: []
    };
  }

  updateLocalStore = newTodos => {
    store(this.key, newTodos);
  };

  createTodo = title => {
    if (this.props.isAuthenticated) {
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
  };

  editTodo = (todo, newTitle) => {
    if (this.props.isAuthenticated) {
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
  };

  toggleTodo = todo => {
    if (this.props.isAuthenticated) {
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
  };

  deleteTodo = todo => {
    if (this.props.isAuthenticated) {
      firestore
        .collection(TODOS)
        .doc(todo.id)
        .delete();
    } else {
      const newTodos = this.state.todos.filter(t => t.id !== todo.id);
      this.setState({ todos: newTodos });
      this.updateLocalStore(newTodos);
    }
  };

  mountStore = () => {
    if (this.props.isAuthenticated) {
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
    } else {
      this.setState({ todos: store(this.key) });
    }
  };

  componentDidMount() {
    this.mountStore();
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.isAuthenticated !== this.props.isAuthenticated)
  //     this.mountStore();
  // }

  render() {
    return (
      <Todos
        {...this.props}
        {...this.state}
        createTodo={this.createTodo}
        editTodo={this.editTodo}
        toggleTodo={this.toggleTodo}
        deleteTodo={this.deleteTodo}
      />
    );
  }
}

export default withAuthContext(TodosContainer);
