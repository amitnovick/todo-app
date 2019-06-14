import React from 'react';
import PropTypes from 'prop-types';
import { Atom, useAtom, swap } from '@dbeining/react-atom';
import { Machine, interpret } from 'xstate';
import 'firebase/auth'; // required for the `firebase.auth` method

import AuthContext from './AuthContext';
import firebaseApp from '../../firebase/firebaseApp';
import { useService } from '@xstate/react';

function updateAuthState(user) {
  if (user != null) {
    swap(userOAuthAtom, _ => user);
    authenticationService.send(
      'AUTHENTICATED_SUCCESSFULLY_DURING_INITIAL_PAGE_LOAD'
    );
  } else {
    authenticationService.send(
      'AUTHENTICATION_FAILED_DURING_INITIAL_PAGE_LOAD'
    );
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
        AUTHENTICATED_SUCCESSFULLY_DURING_INITIAL_PAGE_LOAD: 'authenticated',
        AUTHENTICATION_FAILED_DURING_INITIAL_PAGE_LOAD: 'unauthenticated'
      }
    },
    authenticated: {
      on: {
        UNAUTHENTICATED_SUCCESSFULLY_FROM_ACCOUNT_SCREEN: 'unauthenticated'
      }
    },
    unauthenticated: {
      on: {
        AUTHENTICATED_SUCCESSFULLY_FROM_SIGNIN_SCREEN: 'authenticated',
        actions: [(_, event) => swap(userOAuthAtom, _ => event.user)]
      }
    }
  }
});

const authenticationService = interpret(machine).start();

const userOAuthAtom = Atom.of(null);

const AuthenticationContainer = ({ children }) => {
  const userOAuth = useAtom(userOAuthAtom);
  const [current, send] = useService(authenticationService);
  const authenticationState = current.value;
  return (
    <AuthContext.Provider
      value={{
        userOAuth,
        send,
        authenticationState
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthenticationContainer.propTypes = {
  children: PropTypes.element.isRequired
};

export default AuthenticationContainer;
