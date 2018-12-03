import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styled from "styled-components";

import "./style.css";

import TodosScreen from "../../components/TodosScreen";
import AboutScreen from "../../components/AboutScreen";
import AccountScreen from "../../components/AccountScreen";
import TodosContainerDemo from "../../containers/TodosContainerDemo";
import TodosContainerCloud from "../../containers/TodosContainerCloud";
import TodosContext from "../../containers/TodosContext";
import { AuthContext } from "../../containers/AuthContainer";

const StyledMain = styled.main`
  min-width: 230px;
  max-width: 550px;
  margin: 0 auto;
  padding: 0;
`;

const Body = () => (
  <StyledMain>
    <Route
      render={({ location }) => (
        <TransitionGroup className="transition-group">
          <CSSTransition
            key={location.key}
            timeout={{ enter: 300, exit: 300 }}
            classNames="fade"
          >
            <section className="route-section">
              <Switch location={location}>
                <Route exact path="/" component={HomeScreenCloudAdapter} />
                <Route exact path="/about" component={AboutScreen} />
                <Route exact path="/account" component={AccountScreenAdapter} />
                <Route exact path="/demo" component={TodosScreenDemoAdapter} />
                <Route render={() => <h1>Not found</h1>} />
              </Switch>
            </section>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  </StyledMain>
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
