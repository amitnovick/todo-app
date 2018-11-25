import React from "react";
import { Switch, Route } from "react-router-dom";

import Todos from "../components/TodosApp";
import About from "../pages/about";
import AccountSettings from "../pages/account";
import withTodosContext from "../containers/TodosContainer/withTodosContext";
import TodosContainer from "../containers/TodosContainer";

const Body = ({ isAwaitingTodos }) => (
  <main className="body">
    <Switch>
      <Route exact path="/" component={TodosRouteAdapter} />
      <Route exact path="/about" component={About} />
      <Route exact path="/account" component={AccountSettings} />
    </Switch>
  </main>
);

export default Body;

const TodosRouteAdapter = () => (
  <TodosContainer>
    <TodosBodyWithTodosContext />
  </TodosContainer>
);

const TodosBody = props =>
  props.isAwaitingTodos ? <h1>"Loading Todos"</h1> : <Todos {...props} />;

const TodosBodyWithTodosContext = withTodosContext(TodosBody);
