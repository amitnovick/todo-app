import React from "react";
import { Switch, Route } from "react-router-dom";

import Container from "../../containers/container.js";
import About from "../about/index.js";
import AccountSettings from "../account-settings/index.js";

const Main = ({ isAuthenticated }) => (
  <main>
    <Switch>
      <Route
        exact
        path="/"
        render={() => <Container isAuthenticated={isAuthenticated} />}
      />
      <Route path="/about" component={About} />
      <Route
        path="/account"
        render={() => <AccountSettings isAuthenticated={isAuthenticated} />}
      />
    </Switch>
  </main>
);

export default Main;
