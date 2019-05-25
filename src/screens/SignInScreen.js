import React from 'react';
import { Machine } from 'xstate';
import { useMachine } from '@xstate/react';
import { withRouter } from 'react-router-dom';

import { signInWithPopup } from '../firebase/auth';
import authenticatedRoutes from '../routes/authenticatedRoutes';

const SignInScreen = ({ hasFailedLogin, onFailLogin, onSuccessfulLogin }) => (
  <div>
    <h1>Sign-in</h1>
    <button
      onClick={async () => {
        try {
          const { user } = await signInWithPopup();
          onSuccessfulLogin(user);
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
          onFailLogin={() => send('AUTHENTICATION_FAILED')}
          onSuccessfulLogin={user => {
            sendToAuthenticationService('AUTHENTICATED_SUCCESSFULLY', { user });
            history.push(authenticatedRoutes.APP);
          }}
        />
      );
    case 'loginFailed':
      return (
        <SignInScreen
          hasFailedLogin={true}
          onFailLogin={() => send('AUTHENTICATION_FAILED')}
          onSuccessfulLogin={user =>
            sendToAuthenticationService('AUTHENTICATED_SUCCESSFULLY', { user })
          }
        />
      );
    default:
      return <div>Unknown state, please report.</div>;
  }
};

export default withRouter(SignInScreenContainer);
