import React from "react";
import { Switch, Route } from "react-router-dom";

import TodosContainer from "../pages/todos";
import About from "../pages/about";
import AccountSettings from "../pages/account";

const Body = () => (
  <main className="body">
    <Switch>
      <Route exact path="/" component={TodosContainer} />
      <Route path="/about" component={About} />
      <Route path="/account" component={AccountSettings} />
    </Switch>
  </main>
);

export default Body;
