import React from "react";

import Header from "../routing/Header.js";
import Main from "../routing/Main.js";

const App = ({ isAuthenticated, updateAuthentication }) => (
  <div>
    <Header
      isAuthenticated={isAuthenticated}
      updateAuthentication={updateAuthentication}
    />
    <Main
      isAuthenticated={isAuthenticated}
      updateAuthentication={updateAuthentication}
    />
  </div>
);

export default App;
