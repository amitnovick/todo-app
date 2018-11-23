import React from "react";

import Header from "./Header";
import Body from "./Body";
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
