import React from "react";
import { Switch, Route } from "react-router-dom";

import TodosScreen from "../components/TodosScreen";
import AboutScreen from "../components/AboutScreen";
import AccountSettings from "../components/AccountScreen";
import TodosContainer from "../containers/TodosContainer";
import withAuthContext from "../containers/AuthContainer/withAuthContext";

const Body = ({ isAwaitingTodos }) => (
  <main className="body">
    <Switch>
      <Route exact path="/" component={TodosRouteAdapterWithAuthContext} />
      <Route exact path="/about" component={AboutScreen} />
      <Route exact path="/account" component={AccountSettings} />
    </Switch>
  </main>
);

export default Body;

const TodosRouteAdapter = context =>
  context.isAwaitingTodos ? (
    <h1>"Loading Todos"</h1>
  ) : (
    <TodosContainer>
      <TodosScreen />
    </TodosContainer>
  );

const TodosRouteAdapterWithAuthContext = withAuthContext(TodosRouteAdapter);
