import React from 'react';
import PropTypes from 'prop-types';
import { Atom, useAtom, swap, deref } from '@dbeining/react-atom';

import TodoWidgetWrapper from '../../../components/TodoWidgetsWrapper/TodoWidgetsWrapper';
import firestore from '../../../firebase/realtimeDb.js';
import withAuth from '../../Auth/withAuth';
import initialTodosState from '../../../states/todos/initialState';
import todosMachine from '../../../states/todos/todosMachine';
import { useMachine } from '@xstate/react';
import firestoreTodosCollectionMachine from './firestoreTodosCollectionMachine';

const mapUserIdToCollection = userId => `todos-${userId}`;

const initialAtomState = {
  todos: initialTodosState,
  todo: {},
  editedTodoValue: '',
  newTodoTitle: ''
};

const atom = Atom.of(initialAtomState);

const createTodo = (todosCollection, { title }) => {
  const todo = {
    title: title,
    completed: false,
    createdAt: new Date().toISOString()
  };
  firestore.collection(todosCollection).add(todo);
};

const editTodo = (todosCollection, { todo, newTitle }) => {
  const todoChange = {
    title: newTitle
  };
  firestore
    .collection(todosCollection)
    .doc(todo.id)
    .update(todoChange);
};

const toggleTodo = (todosCollection, { todo }) => {
  const todoChange = {
    completed: !todo.completed
  };
  firestore
    .collection(todosCollection)
    .doc(todo.id)
    .update(todoChange);
};

const deleteTodo = (todosCollection, { todo }) => {
  firestore
    .collection(todosCollection)
    .doc(todo.id)
    .delete();
};

const subscribeToFirestore = async ({ todosCollection }) => {
  /* Returned value: an `unsubscribe` function */
  return await firestore.collection(todosCollection).onSnapshot(snapshot => {
    let todos = [];

    snapshot.forEach(doc => {
      const todo = doc.data();
      todo.id = doc.id;
      todos.push(todo);
    });

    const scoreByCreatedAt = (todoA, todoB) => {
      return (
        new Date(todoA.createdAt).getTime() -
        new Date(todoB.createdAt).getTime()
      );
    };

    todos.sort(scoreByCreatedAt);
    /* Every time the state of remote database changes, we update local state */
    swap(atom, currentAtom => ({ ...currentAtom, todos: todos }));
  });
};

const TodosContainer = ({ userOAuth }) => {
  const { uid: userId } = userOAuth;
  const { todos, todo, editedTodoValue, newTodoTitle } = useAtom(atom);
  const todosCollection = mapUserIdToCollection(userId);

  const todosMachineWithActions = todosMachine.withConfig({
    actions: {
      updateTodosEnterExistingTodoEdit: (_, { todo }) => {
        swap(atom, currentAtom => ({
          ...currentAtom,
          editedTodoValue: todo.title,
          todo: todo
        }));
      },
      updateEditedTodoValue: (_, event) => {
        swap(atom, currentAtom => ({
          ...currentAtom,
          editedTodoValue: event.title
        }));
      },
      updateNewTodoValue: (_, event) =>
        swap(atom, currentAtom => ({
          ...currentAtom,
          newTodoTitle: event.title
        })),
      createTodoWhenTitleNotEmpty: (_, __) => {
        const { newTodoTitle } = deref(atom);
        if (newTodoTitle.length > 0) {
          createTodo(todosCollection, { title: newTodoTitle });
        }
      },
      resetNewTodoInput: (_, __) => {
        swap(atom, currentAtom => ({ ...currentAtom, newTodoTitle: '' }));
      },
      editTodo: (_, __) => {
        const { editedTodoValue, todo } = deref(atom);
        editTodo(todosCollection, { todo, newTitle: editedTodoValue });
      },
      toggleTodo: (_, { todo }) => {
        toggleTodo(todosCollection, { todo });
      },
      deleteTodo: (_, { todo }) => {
        deleteTodo(todosCollection, { todo });
      },
      editTodoWhenEditValueIsDifferent: (_, __) => {
        const { todo, editedTodoValue } = deref(atom);
        if (todo.title !== editedTodoValue) {
          editTodo(todosCollection, { todo, newTitle: editedTodoValue });
        }
      }
    }
  });
  const [currentTodosMachine, sendTodosMachine] = useMachine(
    todosMachineWithActions
  );
  const firestoreTodosCollectionMachineWithContext = firestoreTodosCollectionMachine.withConfig(
    {
      services: {
        subscribeToFirestore: subscribeToFirestore
      }
    },
    {
      todosCollection: todosCollection
    }
  );
  const [currentFirestore, sendFirestore] = useMachine(
    firestoreTodosCollectionMachineWithContext
  );

  React.useEffect(() => {
    return () => sendFirestore('UNSUBSCRIBE');
  }, [sendFirestore]);

  switch (currentFirestore.value) {
    case 'loading':
      return <h2>Loading...</h2>;
    case 'connected':
      return (
        <TodoWidgetWrapper
          currentTodosMachineStateNode={currentTodosMachine}
          send={sendTodosMachine}
          todos={todos}
          todo={todo}
          editedTodoValue={editedTodoValue}
          newTodoTitle={newTodoTitle}
        />
      );
    case 'disconnected':
      return <h2>Disconnected</h2>;
    default:
      return <h2>Unknown state</h2>;
  }
};

TodosContainer.propTypes = {
  userOAuth: PropTypes.object.isRequired
};

export default withAuth(TodosContainer);
