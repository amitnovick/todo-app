import React from "react";

import AuthContext from "./AuthContext.js";

const withAuthentication = Component => props => (
  <AuthContext.Consumer>
    {authContext => <Component {...props} {...authContext} />}
  </AuthContext.Consumer>
);

export default withAuthentication;
