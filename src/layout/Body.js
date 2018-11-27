import React from "react";
import { Switch, Route } from "react-router-dom";

import TodosScreen from "../components/TodosScreen";
import AboutScreen from "../components/AboutScreen";
import AccountScreen from "../components/AccountScreen";
import TodosContainer, { TodosContext } from "../containers/TodosContainer";
import { AuthContext } from "../containers/AuthContainer";

const Body = () => (
  <main className="body">
    <Switch>
      <Route exact path="/" component={TodosScreenAdapter} />
      <Route exact path="/about" component={AboutScreen} />
      <Route exact path="/account" component={AccountScreenAdapter} />
    </Switch>
  </main>
);

export default Body;

const TodosScreenAdapter = () => (
  <AuthContext.Consumer>
    {authContext =>
      authContext.isAwaitingTodos ? (
        <h1>"Loading Todos"</h1>
      ) : (
        <TodosContainer {...authContext}>
          <TodosContext.Consumer>
            {todosContext => <TodosScreen {...todosContext} />}
          </TodosContext.Consumer>
        </TodosContainer>
      )
    }
  </AuthContext.Consumer>
);

const AccountScreenAdapter = () => (
  <AuthContext.Consumer>
    {authContext => <AccountScreen {...authContext} />}
  </AuthContext.Consumer>
);
