//@ts-check
import { Machine } from 'xstate';

const firestoreTodosCollectionMachine = Machine({
  id: 'firestore-todos-collection',
  initial: 'uninitialized',
  states: {
    uninitialized: {
      on: {
        INITIALIZE: 'loading'
      }
    },
    loading: {
      invoke: {
        src: 'subscribeToFirestore',
        onDone: {
          target: 'connected',
          actions: 'storeUnsubscribeFunction'
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
      actions: 'callUnsubscribeFunction'
    }
  }
});

export default firestoreTodosCollectionMachine;
