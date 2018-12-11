import React from "react";

import Header from "./Header.js";
import Body from "./Body/index.js";
import AuthContext from "../containers/Auth/AuthContext.js";
import Delay from "../containers/Delay.js";

const Layout = () => (
  <AuthContext.Consumer>
    {authContext => (
      <Delay
        component={ScreenLayout}
        shouldShow={!authContext.isAwaitingAuth}
        timeout={500}
      />
    )}
  </AuthContext.Consumer>
);

const ScreenLayout = () => (
  <div>
    <Header />
    <Body />
  </div>
);

export default Layout;
