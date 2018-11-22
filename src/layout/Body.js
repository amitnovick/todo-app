import React from "react";
import { Switch, Route } from "react-router-dom";

import TodosContainer from "../pages/todos/index.js";
import About from "../pages/about/index.js";
import AccountSettings from "../pages/account/index.js";

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
