import React from 'react';
import 'firebase/auth'; // required for the `firebase.auth` method
import { Machine, interpret } from 'xstate';
import { useService } from '@xstate/react';
import { Atom, useAtom, swap, deref } from '@dbeining/react-atom';

import firebaseApp from '../../firebase/firebaseApp.js';
// import globalContext from "./AuthContext";

const userOAuthAtom = Atom.of(null);

const updateAuthState = user => {
  if (user == null) {
    swap(userOAuthAtom, _ => user);
    machineService.send('AUTHENTICATED_SUCCESSFULLY');
  } else {
    machineService.send('AUTHENTICATION_FAILED');
  }
};

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
    authenticated: {},
    unauthenticated: {}
  }
});

const machineService = interpret(machine)
  .onTransition(state => console.log(state.value))
  .start();

const AuthContainer = () => {
  const [current] = useService(machineService);
  const authenticationState = current.value;
  switch (authenticationState) {
    case 'loading':
      return (
        <div
          style={{ height: 10, width: '100%', backgroundColor: 'hotpink' }}
        />
      );
    case 'authenticated':
      return (
        <div>
          <h2>authenticated</h2>
        </div>
      );
    case 'unauthenticated':
      return (
        <div>
          <h2>Unauthenticated</h2>
        </div>
      );
    default:
      return (
        <div>
          <h2>Unknown state, please contact.</h2>
        </div>
      );
  }
};

export default AuthContainer;
