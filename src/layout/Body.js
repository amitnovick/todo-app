import React from "react";
import { Switch, Route } from "react-router-dom";

import TodosContainer from "../containers/TodosContainer.js";
import About from "../components/about/index.js";
import AccountSettings from "../components/account-settings/index.js";
import { AuthContext } from "../containers/AuthContainer.js";

const Body = () => (
  <main>
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <AuthContext.Consumer>
            {context => (
              <TodosContainer isAuthenticated={context.isAuthenticated} />
            )}
          </AuthContext.Consumer>
        )}
      />
      <Route path="/about" component={About} />
      <Route
        path="/account"
        render={() => (
          <AuthContext.Consumer>
            {context => <AccountSettings signOut={context.signOut} />}
          </AuthContext.Consumer>
        )}
      />
    </Switch>
  </main>
);

export default Body;
