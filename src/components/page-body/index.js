import React from "react";
import { Switch, Route } from "react-router-dom";

import Container from "../../containers/container.js";
import About from "../about/index.js";
import AccountSettings from "../account-settings/index.js";
import { AuthContext } from "../../containers/AuthContainer.js";

const PageBody = () => (
  <main>
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <AuthContext.Consumer>
            {isAuthenticated => <Container isAuthenticated={isAuthenticated} />}
          </AuthContext.Consumer>
        )}
      />
      <Route path="/about" component={About} />
      <Route path="/account" component={AccountSettings} />
    </Switch>
  </main>
);

export default PageBody;
