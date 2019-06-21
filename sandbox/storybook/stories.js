//@ts-check
import React from 'react';
import uuid from 'uuid/v4';
import { Machine, assign, interpret } from 'xstate';
import { useMachine } from '@xstate/react';

import { storiesOf } from '@storybook/react';

// import TodoWidgetsWrapper from '../../src/components/TodoWidgetsWrapper/TodoWidgetsWrapper';
import TodoWidgetsWrapper2 from '../components/TodoWidgetsWrapper/TodoWidgetsWrapper';
import todosMachine from '../components/TodoWidgetsWrapper/todosMachine';
/* 
storiesOf('Category', module).add('Subcategory', () => <Jumbotron />)
// */
const machineService = interpret(todosMachine).start();

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
  console.log('editTodo: existing todos:', todos, 'payload:', payload);
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
    id: 1,
    title: 'LOCAL MOCK',
    completed: true,
    createdAt: new Date().toISOString()
  }
];

const URL = 'ws://localhost:3030';

const formatAction = newTodos => {
  const action = {
    type: 'UPDATE_STATE',
    payload: newTodos
  };
  return action;
};

const websocketMachine = Machine({
  id: 'websocket',
  initial: 'loading',
  context: {
    ws: null,
    todos: initialTodos
  },
  states: {
    loading: {
      on: {
        OPEN: {
          target: 'ready',
          actions: [
            assign({ ws: (_, event) => event.ws }),
            (_, event) => {
              const { ws } = event;
              const action = {
                type: 'GET_STATE'
              };
              ws.send(JSON.stringify(action));
            }
          ]
        },
        ERROR: 'failure',
        CLOSE: 'failure'
      }
    },
    ready: {
      on: {
        ERROR: {
          target: 'failure',
          actions: (context, _) => context.ws.close()
        },
        CLOSE: {
          target: 'failure',
          actions: (context, _) => context.ws.close()
        },
        WS_RECEIVE_TODOS: {
          actions: assign({ todos: (_, event) => event.todos })
        },
        WS_SEND_ACTION: {
          actions: (context, event) => {
            const { ws, todos } = context;
            const { transformationType, payload } = event;
            switch (transformationType) {
              case 'CREATE': {
                console.log('WS_SEND_ACTION: CREATE: todos', todos);
                const newTodos = createTodo(todos, payload);
                console.log('WS_SEND_ACTION: CREATE: newTodos', newTodos);
                const action = formatAction(newTodos);
                ws.send(JSON.stringify(action));
                return;
              }
              case 'EDIT': {
                const newTodos = editTodo(todos, payload);
                const action = formatAction(newTodos);
                ws.send(JSON.stringify(action));
                return;
              }
              case 'TOGGLE': {
                const newTodos = toggleTodo(todos, payload);
                const action = formatAction(newTodos);
                ws.send(JSON.stringify(action));
                return;
              }
              case 'DELETE': {
                const newTodos = deleteTodo(todos, payload);
                const action = formatAction(newTodos);
                ws.send(JSON.stringify(action));
                return;
              }
              default:
                return;
            }
          }
        }
      }
    },
    failure: {}
  }
});

const withWebSocket = Component => {
  const WithWebSocket = props => {
    const [current, send] = useMachine(websocketMachine, { devTools: true });
    React.useEffect(() => {
      const ws = new WebSocket(URL);
      ws.addEventListener('open', () => {
        // on connecting, do nothing but log it to the console
        console.log('WS connected');
        send('OPEN', { ws });
      });
      ws.addEventListener('message', event => {
        console.log('WS received message');
        const newTodos = JSON.parse(event.data);
        send('WS_RECEIVE_TODOS', { todos: newTodos });
      });
      ws.addEventListener('close', () => {
        console.log('WS disconnected');
        send('CLOSE');
        // // automatically try to reconnect on connection loss
        // const newWs = new WebSocket(URL);
      });
      ws.addEventListener('error', () => {
        console.log('WS error');
        send('ERROR');
      });
    }, [send]);

    // const sendAction = newTodos => {
    //   const action = {
    //     type: 'UPDATE_STATE',
    //     payload: newTodos
    //   };
    //   send('WS_SEND_ACTION', { wsAction: action });
    // };

    // const sendTransformationAsAction = (payload, transformationType) => {
    //   const { todos } = current.context;
    //   console.log('sendTransformationAsAction: current', current);
    //   switch (transformationType) {
    //     case 'CREATE': {
    //       const newTodos = createTodo(todos, payload);
    //       sendAction(newTodos);
    //       return;
    //     }
    //     case 'EDIT': {
    //       const newTodos = editTodo(todos, payload);
    //       sendAction(newTodos);
    //       return;
    //     }
    //     case 'TOGGLE': {
    //       const newTodos = toggleTodo(todos, payload);
    //       sendAction(newTodos);
    //       return;
    //     }
    //     case 'DELETE': {
    //       const newTodos = deleteTodo(todos, payload);
    //       sendAction(newTodos);
    //       return;
    //     }
    //     default:
    //       return;
    //   }
    // };

    switch (current.value) {
      case 'loading':
        return <h2>WS: Loading...</h2>;
      case 'ready': {
        const { todos } = current.context;
        return (
          <Component
            {...props}
            machineService={machineService}
            todos={todos}
            createTodo={args =>
              send('WS_SEND_ACTION', {
                transformationType: 'CREATE',
                payload: args
              })
            }
            editTodo={args =>
              send('WS_SEND_ACTION', {
                transformationType: 'EDIT',
                payload: args
              })
            }
            toggleTodo={args =>
              send('WS_SEND_ACTION', {
                transformationType: 'TOGGLE',
                payload: args
              })
            }
            deleteTodo={args =>
              send('WS_SEND_ACTION', {
                transformationType: 'DELETE',
                payload: args
              })
            }
          />
        );
      }
      case 'failure':
        return <h2>WS: Failure</h2>;
      default:
        return <h2>WS: Unknown state</h2>;
    }
  };
  return WithWebSocket;
};

// const TodoWidgetsWrapperContainer = ({ todos, sendAction }) => {
//   return (
//     <TodoWidgetsWrapper
//       todos={todos}
//       createTodo={args => sendAction(createTodo(todos, args))}
//       editTodo={args => sendAction(editTodo(todos, args))}
//       toggleTodo={args => sendAction(toggleTodo(todos, args))}
//       deleteTodo={args => sendAction(deleteTodo(todos, args))}
//     />
//   );
// };

const TodoWidgetsWrapperContainer2 = ({
  todos,
  createTodo,
  editTodo,
  toggleTodo,
  deleteTodo
}) => {
  return (
    <TodoWidgetsWrapper2
      todos={todos}
      createTodo={args => createTodo(args)}
      editTodo={args => editTodo(args)}
      toggleTodo={args => toggleTodo(args)}
      deleteTodo={args => deleteTodo(args)}
    />
  );
};

// const TodoWithWebSocket = withWebSocket(TodoWidgetsWrapperContainer);

const TodoWithWebSocket2 = withWebSocket(TodoWidgetsWrapperContainer2);

// storiesOf('Components', module).add('Todo', () => <TodoWithWebSocket />);

storiesOf('Components', module).add('Todo2', () => <TodoWithWebSocket2 />);

/* Wrapper impl */
// const TodoWidgetsWrapperContainer2 = ({ todos, sendAction }) => {
//   return (
//     <TodoWidgetsWrapper2
//       todos={todos}
//       createTodo={args => sendAction(createTodo(todos, args))}
//       editTodo={args => sendAction(editTodo(todos, args))}
//       toggleTodo={args => sendAction(toggleTodo(todos, args))}
//       deleteTodo={args => sendAction(deleteTodo(todos, args))}
//     />
//   );
// };

/* withWebSocket impl */

// /* Work In Progress */
// const withWebSocket = Component => {
//   const WithWebSocket = props => {
//     const [todos, setTodos] = React.useState(initialTodos);
//     const [current,send] = useMachine(websocketMachine);
//     console.log('todos:', todos);
//     const [ws, setWs] = React.useState(null);
//     React.useEffect(() => {
//       const initialWs = new WebSocket(URL);
//       setWs(initialWs);
//     }, []);

//     React.useEffect(() => {
//       console.log('useEffect, adding listeners: ws !== null?', ws !== null);
//       if (ws !== null) {
//         ws.addEventListener('open', () => {
//           // on connecting, do nothing but log it to the console
//           console.log('WS connected');
//           const action = {
//             type: 'GET_STATE'
//           };
//           ws.send(JSON.stringify(action));
//         });
//         ws.addEventListener('message', event => {
//           console.log('WS received message');
//           const newTodos = JSON.parse(event.data);
//           setTodos(newTodos);
//         });
//         ws.addEventListener('close', () => {
//           console.log('WS disconnected');
//           // automatically try to reconnect on connection loss
//           const newWs = new WebSocket(URL);
//           setWs(newWs);
//         });
//         ws.addEventListener('error', () => {
//           console.log('WS error');
//         });

//         return () => ws.close();
//       }
//     }, [ws]);

//     const sendAction = newTodos => {
//       console.log('sendAction got:', newTodos);
//       if (ws !== null) {
//         console.log('sendAction ws !== null');

//         const action = {
//           type: 'UPDATE_STATE',
//           payload: newTodos
//         };
//         ws.send(JSON.stringify(action));
//       }
//     };

//     return <Component {...props} todos={todos} sendAction={sendAction} />;
//   };
//   return WithWebSocket;
// };

/* localStorage impl */

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
