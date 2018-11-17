import React from "react";

import Header from "../routing/Header.js";
import Main from "../routing/Main.js";

const App = ({ isAuthenticated }) => (
  <div>
    <Header isAuthenticated={isAuthenticated} />
    <Main isAuthenticated={isAuthenticated} />
  </div>
);

export default App;
