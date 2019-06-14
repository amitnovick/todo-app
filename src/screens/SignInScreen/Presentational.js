import React from 'react';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { buttonStyle } from './style';

const SignInScreen = ({ hasFailedLogin, attemptToLogin }) => (
  <div>
    <h1>Sign-in</h1>
    <button className={buttonStyle} onClick={attemptToLogin}>
      {`Sign in with GitHub `}
      <FontAwesomeIcon icon={faGithub} style={{ marginRight: 4 }} />
    </button>
    {hasFailedLogin ? <p style={{ color: 'red' }}>Failed to login</p> : null}
  </div>
);

export default SignInScreen;
