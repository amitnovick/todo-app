import React from 'react';
import { Machine } from 'xstate';
import { useMachine } from '@xstate/react';

import { signInWithPopup } from '../firebase/auth';
import authenticationService from '../state/authenticationService';

const signInScreenMachine = Machine({
  id: 'sign-in-screen',
  initial: 'idle',
  states: {
    idle: {
      on: {
        AUTHENTICATION_FAILED: 'loginFailed'
      }
    },
    loginFailed: {}
  }
});

const SignInScreenTemplate = ({ hasFailedLogin, onFailLogin }) => (
  <div>
    <h1>Sign-in</h1>
    <button
      onClick={async () => {
        try {
          const { user } = await signInWithPopup();
          authenticationService.send('AUTHENTICATED_SUCCESSFULLY', { user });
        } catch (error) {
          if (
            error &&
            [
              'auth/popup-closed-by-user',
              'auth/cancelled-popup-request'
            ].includes(error.code) === false
          ) {
            console.log(error);
            onFailLogin();
          }
        }
      }}
      style={{
        backgroundColor: 'black',
        color: 'white',
        margin: '8px'
      }}
    >
      Sign in with GitHub
    </button>
    {hasFailedLogin ? <p style={{ color: 'red' }}>Failed to login</p> : null}
  </div>
);

const SignInScreen = () => {
  const [current, send] = useMachine(signInScreenMachine);
  const uiState = current.value;
  switch (uiState) {
    case 'idle':
      return (
        <SignInScreenTemplate
          hasFailedLogin={false}
          onFailLogin={() => send('AUTHENTICATION_FAILED')}
        />
      );
    case 'loginFailed':
      return (
        <SignInScreenTemplate
          hasFailedLogin={true}
          onFailLogin={() => send('AUTHENTICATION_FAILED')}
        />
      );
    default:
      return <div>Unknown state, please report.</div>;
  }
};

export default SignInScreen;
