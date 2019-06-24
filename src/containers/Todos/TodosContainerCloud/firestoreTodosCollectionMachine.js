//@ts-check
import { Machine, assign } from 'xstate';

const firestoreTodosCollectionMachine = Machine({
  id: 'firestore-todos-collection',
  initial: 'loading',
  context: {
    unsubscribe: () => {}, // default value
    todosCollection: '' // default value
  },
  states: {
    loading: {
      invoke: {
        src: 'subscribeToFirestore',
        onDone: {
          target: 'connected',
          actions: assign({ unsubscribe: (_, event) => event.data })
        },
        onError: {
          target: 'disconnected'
        }
      }
    },
    connected: {},
    disconnected: {}
  },
  on: {
    UNSUBSCRIBE: {
      target: 'disconnected',
      actions: ({ unsubscribe }) => unsubscribe()
    }
  }
});

export default firestoreTodosCollectionMachine;
