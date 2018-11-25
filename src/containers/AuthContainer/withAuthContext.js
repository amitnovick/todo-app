import React from "react";

import { AuthContext } from "./index.js";

const withAuthContext = Component => props => (
  <AuthContext.Consumer>
    {context => (
      <Component
        {...props}
        isAuthenticated={context.isAuthenticated}
        isAwaitingAuth={context.isAwaitingAuth}
        signOut={context.signOut}
      />
    )}
  </AuthContext.Consumer>
);

export default withAuthContext;
