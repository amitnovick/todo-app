import React from "react";

import Header from "./Header";
import Body from "./Body";
import withAuthContext from "../containers/AuthContainer/withAuthContext";

/*
 `isAwaitingAuth` is for Header component
 `isAwaitingTodos` is for Body component
 */
const Layout = props =>
  props.isAwaitingAuth || props.isAwaitingTodos ? (
    <h1>Loading Page</h1>
  ) : (
    <div>
      <Header />
      <Body />
    </div>
  );

export default withAuthContext(Layout);
