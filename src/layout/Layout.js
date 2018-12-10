import React from "react";

import Header from "./Header.js";
import Body from "./Body/index.js";
import AuthContext from "../containers/Auth/AuthContext.js";

const Layout = () => (
  <AuthContext.Consumer>
    {authContext =>
      authContext.isAwaitingAuth ? (
        <h1>Loading Page</h1>
      ) : (
        <div>
          <Header />
          <Body />
        </div>
      )
    }
  </AuthContext.Consumer>
);

export default Layout;
