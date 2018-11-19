import React from "react";

import Header from "./Header.js";
import Body from "./Body.js";
import withAuthContext from "../containers/withAuthContext";

const Layout = props =>
  props.isAwaitingResponse ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <Header />
      <Body />
    </div>
  );

export default withAuthContext(Layout);
