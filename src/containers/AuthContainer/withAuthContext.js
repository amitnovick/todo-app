import React from "react";

import { AuthContext } from "./index.js";

const withAuthContext = Component => props => (
  <AuthContext.Consumer>
    {context => <Component {...props} {...context} />}
  </AuthContext.Consumer>
);

export default withAuthContext;
