import React from 'react';
import uuid from 'uuid/v4';

import { storiesOf } from '@storybook/react';

import TodoWidgetsWrapper from '../../src/components/TodoWidgetsWrapper/TodoWidgetsWrapper';
import TodoWidgetsWrapper2 from '../components/TodoWidgetsWrapper/TodoWidgetsWrapper';
/* 
storiesOf('Category', module).add('Subcategory', () => <Jumbotron />)
// */

////////////// <DATA TRANSFORMATIONS> (in this case: pure) ///////////
const createTodo = (todos, payload) => {
  const { title } = payload;
  const todo = {
    id: uuid(),
    title: title,
    completed: false,
    createdAt: new Date().toISOString()
  };
  return todos.concat([todo]);
};

const editTodo = (todos, payload) => {
  const { todo, newTitle } = payload;
  return todos.map(t => (t !== todo ? t : { ...t, title: newTitle }));
};

const toggleTodo = (todos, payload) => {
  const { todo } = payload;
  return todos.map(t => (t !== todo ? t : { ...t, completed: !t.completed }));
};

const deleteTodo = (todos, payload) => {
  const { todo } = payload;
  return todos.filter(t => t.id !== todo.id);
};
////////////// </DATA TRANSFORMATIONS> ///////////

const initialTodos = [
  {
    id: uuid(),
    title: 'Run house chores',
    completed: true,
    createdAt: new Date().toISOString()
  },
  {
    id: uuid(),
    title: 'Cook dinner',
    completed: true,
    createdAt: new Date().toISOString()
  },
  {
    id: uuid(),
    title: 'Do what you really want!',
    completed: false,
    createdAt: new Date().toISOString()
  }
];

const URL = 'ws://localhost:3030';

/* Work In Progress */
const withWebSocket = Component => {
  const WithWebSocket = props => {
    const [todos, setTodos] = React.useState(initialTodos);
    const [ws, setWs] = React.useState(null);
    React.useEffect(() => {
      const initialWs = new WebSocket(URL);
      setWs(initialWs);
    }, []);

    React.useEffect(() => {
      if (ws !== null) {
        ws.addEventListener('open', () => {
          // on connecting, do nothing but log it to the console
          console.log('connected');
          const action = {
            type: 'GET_STATE'
          };
          ws.send(JSON.stringify(action));
        });
        ws.addEventListener('message', event => {
          console.log('received message');
          const newTodos = JSON.parse(event.data);
          setTodos(newTodos);
        });
        ws.addEventListener('close', () => {
          console.log('disconnected');
          // automatically try to reconnect on connection loss
          const newWs = new WebSocket(URL);
          setWs(newWs);
        });
        ws.addEventListener('error', () => {
          console.log('error');
        });

        return () => ws.close();
      }
    }, [ws]);

    const sendAction = newTodos => {
      if (ws !== null) {
        const action = {
          type: 'UPDATE_STATE',
          payload: newTodos
        };
        ws.send(JSON.stringify(action));
      }
    };

    return <Component {...props} todos={todos} sendAction={sendAction} />;
  };
  return WithWebSocket;
};

const TodoWidgetsWrapperContainer = ({ todos, sendAction }) => {
  return (
    <TodoWidgetsWrapper
      todos={todos}
      createTodo={args => sendAction(createTodo(todos, args))}
      editTodo={args => sendAction(editTodo(todos, args))}
      toggleTodo={args => sendAction(toggleTodo(todos, args))}
      deleteTodo={args => sendAction(deleteTodo(todos, args))}
    />
  );
};

const TodoWidgetsWrapperContainer2 = ({ todos, sendAction }) => {
  return (
    <TodoWidgetsWrapper2
      todos={todos}
      createTodo={args => sendAction(createTodo(todos, args))}
      editTodo={args => sendAction(editTodo(todos, args))}
      toggleTodo={args => sendAction(toggleTodo(todos, args))}
      deleteTodo={args => sendAction(deleteTodo(todos, args))}
    />
  );
};

const TodoWithWebSocket = withWebSocket(TodoWidgetsWrapperContainer);

const TodoWithWebSocket2 = withWebSocket(TodoWidgetsWrapperContainer2);

storiesOf('Components', module).add('Todo', () => <TodoWithWebSocket />);

storiesOf('Components', module).add('Todo2', () => <TodoWithWebSocket2 />);

// const StatefulTodosContainerDemo = () => {
//   const [todos, setTodos] = React.useState(loadFromLocalStorage());
//   const setAndSaveTodos = newTodos => {
//     setTodos(newTodos);
//     saveToLocalStorage(newTodos);
//   };
//   React.useEffect(() => {
//     window.addEventListener('storage', e => {
//       if (e.key === NAMESPACE) {
//         setAndSaveTodos(JSON.parse(e.newValue));
//       }
//     });
//   }, []);
//   return <TodosContainerDemo todos={todos} setTodos={setAndSaveTodos} />;
// };
