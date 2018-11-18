import React from "react";

import { AuthContext } from "./AuthContainer.js";

const withAuthContext = Component => props => (
  <AuthContext.Consumer>
    {context => (
      <Component
        {...props}
        isAuthenticated={context.isAuthenticated}
        signOut={context.signOut}
      />
    )}
  </AuthContext.Consumer>
);

export default withAuthContext;
