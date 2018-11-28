import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import TodosScreen from "../components/TodosScreen";
import AboutScreen from "../components/AboutScreen";
import AccountScreen from "../components/AccountScreen";
import TodosContainerDemo from "../containers/TodosContainerDemo";
import TodosContainerCloud from "../containers/TodosContainerCloud";
import TodosContext from "../containers/TodosContext";
import { AuthContext } from "../containers/AuthContainer";

const Body = () => (
  <main className="body">
    <Switch>
      <Route exact path="/" component={HomeScreenCloudAdapter} />
      <Route exact path="/about" component={AboutScreen} />
      <Route exact path="/account" component={AccountScreenAdapter} />
      <Route exact path="/demo" component={TodosScreenDemoAdapter} />
      <Route render={() => <h1>Not found</h1>} />
    </Switch>
  </main>
);

export default Body;

const HomeScreenCloudAdapter = () => (
  <AuthContext.Consumer>
    {authContext =>
      authContext.isAwaitingAuth ? (
        <h1>Loading Todos</h1>
      ) : authContext.isAuthenticated ? (
        <TodosContainerCloud {...authContext}>
          <TodosContext.Consumer>
            {todosContext => <TodosScreen {...todosContext} />}
          </TodosContext.Consumer>
        </TodosContainerCloud>
      ) : (
        <h1>Welcome</h1>
      )
    }
  </AuthContext.Consumer>
);

const TodosScreenDemoAdapter = () => (
  <TodosContainerDemo>
    <TodosContext.Consumer>
      {todosContext => <TodosScreen {...todosContext} />}
    </TodosContext.Consumer>
  </TodosContainerDemo>
);

const AccountScreenAdapter = () => (
  <AuthContext.Consumer>
    {authContext =>
      authContext.isAuthenticated ? (
        <AccountScreen {...authContext} />
      ) : (
        <Redirect to="/" />
      )
    }
  </AuthContext.Consumer>
);
