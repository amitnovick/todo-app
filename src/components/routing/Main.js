import React from "react";
import { Switch, Route } from "react-router-dom";

import Container from "../../containers/container.js";
import About from "../about/index.js";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Container} />
      <Route path="/about" component={About} />
    </Switch>
  </main>
);

export default Main;
