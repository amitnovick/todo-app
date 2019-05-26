import React from 'react';

const SignInScreen = ({ hasFailedLogin, attemptToLogin }) => (
  <div>
    <h1>Sign-in</h1>
    <button
      onClick={attemptToLogin}
      style={{
        backgroundColor: 'black',
        color: 'white',
        margin: '8px',
        fontSize: 26
      }}
    >
      Sign in with GitHub
    </button>
    {hasFailedLogin ? <p style={{ color: 'red' }}>Failed to login</p> : null}
  </div>
);

export default SignInScreen;
