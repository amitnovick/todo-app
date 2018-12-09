import React from "react";

import Header from "./Header";
import Body from "./Body";
import AuthContext from "../containers/AuthContext.js";

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
