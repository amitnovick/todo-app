import React from "react";
import { Switch, Route } from "react-router-dom";

import TodosContainer from "../containers/TodosContainer.js";
import About from "../components/about/index.js";
import AccountSettings from "../components/account-settings/index.js";

const Body = () => (
  <main>
    <Switch>
      <Route exact path="/" component={TodosContainer} />
      <Route path="/about" component={About} />
      <Route path="/account" component={AccountSettings} />
    </Switch>
  </main>
);

export default Body;
