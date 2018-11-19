import React from "react";

import { AuthContext } from "./AuthContainer.js";

const withAuthContext = Component => props => (
  <AuthContext.Consumer>
    {context => (
      <Component
        {...props}
        isAuthenticated={context.isAuthenticated}
        isAwaitingResponse={context.isAwaitingResponse}
        signOut={context.signOut}
      />
    )}
  </AuthContext.Consumer>
);

export default withAuthContext;
