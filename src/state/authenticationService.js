import { swap } from '@dbeining/react-atom';
import { Machine, interpret } from 'xstate';
import firebaseApp from '../firebase/firebaseApp';
import userOAuthAtom from './userOAuthAtom';

function updateAuthState(user) {
  if (user != null) {
    swap(userOAuthAtom, _ => user);
    authenticationService.send('AUTHENTICATED_SUCCESSFULLY');
  } else {
    authenticationService.send('AUTHENTICATION_FAILED');
  }
}

const subscribeToAuthChanges = () =>
  firebaseApp.auth().onAuthStateChanged(updateAuthState);

const machine = Machine({
  id: 'main',
  initial: 'loading',
  states: {
    loading: {
      onEntry: [subscribeToAuthChanges],
      on: {
        AUTHENTICATED_SUCCESSFULLY: 'authenticated',
        AUTHENTICATION_FAILED: 'unauthenticated'
      }
    },
    authenticated: {
      on: {
        UNAUTHENTICATED_SUCCESSFULLY: 'unauthenticated'
      }
    },
    unauthenticated: {
      on: {
        AUTHENTICATED_SUCCESSFULLY: 'authenticated',
        actions: [(_, event) => swap(userOAuthAtom, _ => event.user)]
      }
    }
  }
});

const authenticationService = interpret(machine)
  .onTransition(state => console.log(state.value))
  .start();

export default authenticationService;
