import React from 'react';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SignInScreen = ({ hasFailedLogin, attemptToLogin }) => (
  <div>
    <h1>Sign-in</h1>
    <button
      onClick={attemptToLogin}
      style={{
        backgroundColor: 'black',
        color: 'white',
        margin: '8px',
        fontSize: 26,
        borderRadius: 6,
        border: '1px solid',
        padding: 12
      }}
    >
      {`Sign in with GitHub `}
      <FontAwesomeIcon icon={faGithub} style={{ marginRight: 4 }} />
    </button>
    {hasFailedLogin ? <p style={{ color: 'red' }}>Failed to login</p> : null}
  </div>
);

export default SignInScreen;
