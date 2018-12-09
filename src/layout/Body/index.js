import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import TodosScreen from "../../components/TodosScreen/index.js";
import AboutScreen from "../../components/AboutScreen.js";
import AccountScreen from "../../components/AccountScreen.js";
import TodosContainerDemo from "../../containers/TodosContainerDemo.js";
import TodosContainerCloud from "../../containers/TodosContainerCloud.js";
import TodosContext from "../../containers/TodosContext.js";
import AuthContext from "../../containers/AuthContext.js";
import { StyledMain, StyledTransitionGroup, StyledSection } from "./style.js";
import "./style.css";

const Body = () => (
  <StyledMain>
    <Route
      render={({ location }) => (
        <StyledTransitionGroup>
          <CSSTransition
            key={location.key}
            timeout={{ enter: 300, exit: 300 }}
            classNames="fade"
          >
            <StyledSection>
              <Switch location={location}>
                <Route exact path="/" render={() => <h1>Welcome</h1>} />
                <Route exact path="/features" component={AboutScreen} />
                <Route exact path="/account" component={AccountScreenAdapter} />
                <Route exact path="/demo" component={TodosScreenDemoAdapter} />
                <Route exact path="/app" component={TodosScreenCloudAdapter} />
                <Route render={() => <h1>Not found</h1>} />
              </Switch>
            </StyledSection>
          </CSSTransition>
        </StyledTransitionGroup>
      )}
    />
  </StyledMain>
);

export default Body;

const TodosScreenCloudAdapter = () => (
  <AuthContext.Consumer>
    {authContext =>
      authContext.isAwaitingAuth ? (
        <h1>Loading Todos</h1>
      ) : authContext.isAuthenticated ? (
        <TodosContainerCloud userId={authContext.userId}>
          <TodosContext.Consumer>
            {todosContext => <TodosScreen {...todosContext} />}
          </TodosContext.Consumer>
        </TodosContainerCloud>
      ) : (
        <h1>Not authenticated yet...</h1>
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
        <AccountScreen />
      ) : (
        <Redirect from="/account" to="/" />
      )
    // authContext.isAuthenticated ? (
    //   <AccountScreen />
    // ) : (
    //   <h1>Unauthoried Access</h1>
    // )
    }
  </AuthContext.Consumer>
);
