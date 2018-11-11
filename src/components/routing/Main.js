import React from "react";
import { Switch, Route } from "react-router-dom";

import FirebaseContainer from "../../containers/firestore-container.js";
import OfflineContainer from "../../containers/offline-container.js";
import About from "../about/index.js";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={FirebaseContainer} />
      <Route path="/demo" component={OfflineContainer} />
      <Route path="/about" component={About} />
    </Switch>
  </main>
);

export default Main;
