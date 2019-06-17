import React from 'react';
import uuid from 'uuid/v4';

import { storiesOf } from '@storybook/react';

import TodosContainerDemo from '../containers/Todos/TodosContainerDemo';
import TodosContainerDemo2 from '../containers/Todos/TodosContainerDemo2';
/* 
storiesOf('Category', module).add('Subcategory', () => <Jumbotron />)
// */

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

let ws1 = new WebSocket(URL);

const StatefulTodosContainerDemo = () => {
  const [todos, setTodos] = React.useState([]);
  React.useEffect(() => {
    ws1.addEventListener('open', () => {
      // on connecting, do nothing but log it to the console
      console.log('connected');
    });
    ws1.addEventListener('message', event => {
      console.log('received message');
      const newTodos = JSON.parse(event.data);
      setTodos(newTodos);
    });
    ws1.addEventListener('close', () => {
      console.log('disconnected');
      // automatically try to reconnect on connection loss
      ws1 = new WebSocket(URL);
    });
    ws1.addEventListener('error', () => {
      console.log('error');
    });

    const action = {
      type: 'GET_STATE'
    };
    ws1.send(JSON.stringify(action));
  }, []);
  return (
    <TodosContainerDemo
      todos={todos}
      setTodos={newTodos => {
        const action = {
          type: 'UPDATE_STATE',
          payload: newTodos
        };
        ws1.send(JSON.stringify(action));
      }}
    />
  );
};

let ws2 = new WebSocket(URL);

const StatefulTodosContainerDemo2 = () => {
  const [todos, setTodos] = React.useState([]);
  React.useEffect(() => {
    ws2.addEventListener('open', () => {
      // on connecting, do nothing but log it to the console
      console.log('connected');
    });
    ws2.addEventListener('message', event => {
      console.log('received message');
      const newTodos = JSON.parse(event.data);
      setTodos(newTodos);
    });
    ws2.addEventListener('close', () => {
      console.log('disconnected');
      // automatically try to reconnect on connection loss
      ws2 = new WebSocket(URL);
    });
    ws2.addEventListener('error', () => {
      console.log('error');
    });

    const action = {
      type: 'GET_STATE'
    };
    ws2.send(JSON.stringify(action));
  }, []);
  return (
    <TodosContainerDemo2
      todos={todos}
      setTodos={newTodos => {
        const action = {
          type: 'UPDATE_STATE',
          payload: newTodos
        };
        ws2.send(JSON.stringify(action));
      }}
    />
  );
};

storiesOf('Components', module).add('TodoScreenDemo', () => (
  <StatefulTodosContainerDemo />
));

storiesOf('Components', module).add('TodoScreenDemo2', () => (
  <StatefulTodosContainerDemo2 />
));
