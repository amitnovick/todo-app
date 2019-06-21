//@ts-check
import React from 'react';
import { Machine, assign, State } from 'xstate';
import { useMachine } from '@xstate/react';

import { storiesOf } from '@storybook/react';

// import TodoWidgetsWrapper from '../../src/components/TodoWidgetsWrapper/TodoWidgetsWrapper';
import TodoWidgetsWrapper2 from '../components/TodoWidgetsWrapper/TodoWidgetsWrapper';
import todosMachine from '../components/TodoWidgetsWrapper/todosMachine';
/* 
storiesOf('Category', module).add('Subcategory', () => <Jumbotron />)
// */

const initialTodos = [
  {
    id: 1,
    title: 'LOCAL MOCK',
    completed: true,
    createdAt: new Date().toISOString()
  }
];

const getNextTodosStateNode = (todosMachineStateNode, action) => {
  console.log(
    'getNextTodosStateNode: current state node:',
    todosMachineStateNode
  );
  console.log('getNextTodosStateNode: received action:', action);
  const nextStateNode = todosMachine.transition(todosMachineStateNode, action);
  console.log('getNextTodosStateNode: next state node:', nextStateNode);
  return nextStateNode;
};

const URL = 'ws://localhost:3030';

const formatWsUpdatedTodosMachineServiceStateAction = newMachineServiceState => {
  const action = {
    type: 'UPDATE_TODOS_MACHINE_STATE_NODE',
    payload: newMachineServiceState
  };
  return action;
};

const websocketMachine = Machine({
  id: 'websocket',
  initial: 'loading',
  context: {
    ws: null,
    todos: initialTodos,
    todosMachineStateNode: todosMachine.initialState
  },
  states: {
    loading: {
      on: {
        OPEN: {
          target: 'ready',
          actions: assign({ ws: (_, event) => event.ws })
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
        SEND_TODOS_MACHINE_STATE_NODE: {
          actions: (context, event) => {
            const { ws } = context;
            const { action } = event;
            console.log(
              'SEND_TODOS_MACHINE_STATE_NODE: received action:',
              action
            );
            ws.send(JSON.stringify(action));
          }
        },
        RECEIVE_TODOS_MACHINE_STATE_NODE: {
          actions: assign({
            todosMachineStateNode: (_, event) => event.todosMachineStateNode
          })
        }
      }
    },
    failure: {}
  }
});

const withWebSocket = Component => {
  const WithWebSocket = props => {
    const [currentWS, sendWS] = useMachine(websocketMachine, {
      devTools: true
    });
    React.useEffect(() => {
      const ws = new WebSocket(URL);
      ws.addEventListener('open', () => {
        // on connecting, do nothing but log it to the console
        console.log('WS connected');
        sendWS('OPEN', { ws });
      });
      ws.addEventListener('message', event => {
        console.log('WS received message');
        const incomingPayload = JSON.parse(event.data);
        console.log('WS message paylaod:', incomingPayload);
        switch (incomingPayload.type) {
          case 'TODOS_MACHINE_STATE_NODE': {
            const { payload: rawTodosMachineStateNodeObject } = incomingPayload;
            const todosMachineStateNode = State.create(
              rawTodosMachineStateNodeObject
            );
            sendWS('RECEIVE_TODOS_MACHINE_STATE_NODE', {
              todosMachineStateNode: todosMachineStateNode
            });
            return;
          }
          default: {
            console.log('WS message received is of unknown type');
            return;
          }
        }
      });
      ws.addEventListener('close', () => {
        console.log('WS disconnected');
        sendWS('CLOSE');
      });
      ws.addEventListener('error', () => {
        console.log('WS error');
        sendWS('ERROR');
      });
    }, [sendWS]);

    switch (currentWS.value) {
      case 'loading':
        return <h2>WS: Loading...</h2>;
      case 'ready': {
        const { todosMachineStateNode } = currentWS.context;
        return (
          <Component
            {...props}
            currentTodosMachineStateNode={todosMachineStateNode}
            send={action =>
              sendWS('SEND_TODOS_MACHINE_STATE_NODE', {
                action: formatWsUpdatedTodosMachineServiceStateAction(
                  getNextTodosStateNode(todosMachineStateNode, action)
                )
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

const TodoWidgetsWrapperContainer2 = ({
  currentTodosMachineStateNode,
  send
}) => {
  return (
    <TodoWidgetsWrapper2
      currentTodosMachineStateNode={currentTodosMachineStateNode}
      send={send}
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
//             type: 'GET_TODOS_INITIAL_EXTENDED_STATE'
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
