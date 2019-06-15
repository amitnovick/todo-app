import React from 'react';
import PropTypes from 'prop-types';

import TodoScreen from '../../components/TodosScreen/TodosScreen';
import firestore from '../../firebase/realtimeDb.js';
import withAuth from '../../containers/Auth/withAuth';

class TodosContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      isAwaitingTodos: true
    };
  }

  createTodo = title => {
    const todo = {
      title: title,
      completed: false,
      createdAt: new Date().toISOString()
    };
    firestore.collection(this.todosCollection).add(todo);
  };

  editTodo = (todo, newTitle) => {
    const todoChange = {
      title: newTitle
    };
    firestore
      .collection(this.todosCollection)
      .doc(todo.id)
      .update(todoChange);
  };

  toggleTodo = todo => {
    const todoChange = {
      completed: !todo.completed
    };
    firestore
      .collection(this.todosCollection)
      .doc(todo.id)
      .update(todoChange);
  };

  deleteTodo = todo => {
    firestore
      .collection(this.todosCollection)
      .doc(todo.id)
      .delete();
  };

  mountStore = async () => {
    await firestore.collection(this.todosCollection).onSnapshot(snapshot => {
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
      // Anytime the state of remote database changes, we update local state
      this.setState({ todos });
    });
    this.setState({ isAwaitingTodos: false });
  };

  mapUserIdToCollection = userId => `todos-${userId}`;

  componentDidMount() {
    const { userOAuth } = this.props;
    const { uid: userId } = userOAuth;
    this.todosCollection = this.mapUserIdToCollection(userId);
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
      <TodoScreen
        todos={todos}
        isAwaitingTodos={isAwaitingTodos}
        createTodo={this.createTodo}
        editTodo={this.editTodo}
        toggleTodo={this.toggleTodo}
        deleteTodo={this.deleteTodo}
      />
    );
  }
}

TodosContainer.propTypes = {
  userOAuth: PropTypes.object.isRequired
};

export default withAuth(TodosContainer);
