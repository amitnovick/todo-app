import React from 'react';
import { Machine } from 'xstate';
import { useMachine } from '@xstate/react';
import { withRouter } from 'react-router-dom';

import { signInWithPopup } from '../firebase/auth';
import authenticatedRoutes from '../routes/authenticatedRoutes';

const SignInScreen = ({ hasFailedLogin, attemptToLogin }) => (
  <div>
    <h1>Sign-in</h1>
    <button
      onClick={attemptToLogin}
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

async function attemptToLogin(history, sendToAuthenticationService, send) {
  try {
    const { user } = await signInWithPopup();
    history.push(authenticatedRoutes.HOME);
    sendToAuthenticationService('AUTHENTICATED_SUCCESSFULLY', {
      user
    });
  } catch (error) {
    if (
      error &&
      ['auth/popup-closed-by-user', 'auth/cancelled-popup-request'].includes(
        error.code
      ) === false
    ) {
      console.log(error);
      send('AUTHENTICATION_FAILED');
    }
  }
}

const SignInScreenContainer = ({
  send: sendToAuthenticationService,
  history
}) => {
  const [current, send] = useMachine(signInScreenMachine);
  const uiState = current.value;
  switch (uiState) {
    case 'idle':
      return (
        <SignInScreen
          hasFailedLogin={false}
          attemptToLogin={() =>
            attemptToLogin(history, sendToAuthenticationService, send)
          }
        />
      );
    case 'loginFailed':
      return (
        <SignInScreen
          hasFailedLogin={true}
          attemptToLogin={() =>
            attemptToLogin(history, sendToAuthenticationService, send)
          }
        />
      );
    default:
      return <div>Unknown state, please report.</div>;
  }
};

export default withRouter(SignInScreenContainer);
