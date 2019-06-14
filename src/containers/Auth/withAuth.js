import React from 'react';

import AuthContext from './AuthContext';

const withAuth = Component => {
  const WithAuth = props => {
    return (
      <AuthContext.Consumer>
        {authContext => <Component {...props} {...authContext} />}
      </AuthContext.Consumer>
    );
  };
  return WithAuth;
};

export default withAuth;
