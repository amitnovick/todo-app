import React from 'react';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledButton } from './style';

const SignInScreen = ({ hasFailedLogin, attemptToLogin }) => (
  <div>
    <h1>Sign-in</h1>
    <StyledButton onClick={attemptToLogin}>
      {`Sign in with GitHub `}
      <FontAwesomeIcon icon={faGithub} style={{ marginRight: 4 }} />
    </StyledButton>
    {hasFailedLogin ? <p style={{ color: 'red' }}>Failed to login</p> : null}
  </div>
);

export default SignInScreen;
